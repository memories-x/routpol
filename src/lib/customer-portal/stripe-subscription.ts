import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import {
  createPeriodFromSubscriptionRenewal,
} from "@/lib/customer-portal/subscription-period";
import type Stripe from "stripe";

export const RECURRING_PACKAGE_SLUGS = [
  "aylik-paket",
  "surec-yonetimi",
] as const;

export type RecurringPackageSlug = (typeof RECURRING_PACKAGE_SLUGS)[number];

export function isRecurringCheckoutPackage(
  value: string,
): value is RecurringPackageSlug {
  return (RECURRING_PACKAGE_SLUGS as readonly string[]).includes(value);
}

/** Kart kesintisi devam ederken yeni aynı paket satışı yok. */
export const LIVE_SUBSCRIPTION_STATUSES = [
  "active",
  "trialing",
  "past_due",
  "unpaid",
  "incomplete",
] as const;

export function isLiveSubscriptionStatus(status: string | null | undefined): boolean {
  if (!status) return false;
  return (LIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(status);
}

export async function claimStripeInvoice(params: {
  invoiceId: string;
  kind: string;
  customerId?: string | null;
  periodId?: string | null;
}): Promise<"new" | "duplicate"> {
  if (!isDatabaseConfigured()) return "new";
  const prisma = getPrisma();
  try {
    await prisma.stripeInvoiceReceipt.create({
      data: {
        invoiceId: params.invoiceId,
        kind: params.kind,
        customerId: params.customerId ?? null,
        periodId: params.periodId ?? null,
      },
    });
    return "new";
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err
        ? (err as { code: string }).code
        : "";
    if (code === "P2002") return "duplicate";
    throw err;
  }
}

export async function syncCustomerStripeSubscription(params: {
  email: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  packageSlug?: string | null;
  status?: string | null;
}): Promise<void> {
  if (!isDatabaseConfigured()) return;
  const email = params.email.toLowerCase().trim();
  if (!email) return;

  const prisma = getPrisma();
  const data: {
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    stripeSubscriptionStatus?: string | null;
    stripeSubscriptionPackage?: string | null;
  } = {};

  if (params.stripeCustomerId !== undefined) {
    data.stripeCustomerId = params.stripeCustomerId;
  }
  if (params.stripeSubscriptionId !== undefined) {
    data.stripeSubscriptionId = params.stripeSubscriptionId;
  }
  if (params.status !== undefined) {
    data.stripeSubscriptionStatus = params.status;
  }
  if (params.packageSlug !== undefined) {
    data.stripeSubscriptionPackage = params.packageSlug;
  }

  if (Object.keys(data).length === 0) return;

  await prisma.customer.updateMany({
    where: { email },
    data,
  });
}

export async function getActiveStripeSubscriptionBlock(
  email: string,
  packageSlug: string,
): Promise<{ code: string; message: string } | null> {
  if (!isDatabaseConfigured()) return null;
  if (!isRecurringCheckoutPackage(packageSlug)) return null;

  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: {
      stripeSubscriptionId: true,
      stripeSubscriptionStatus: true,
      stripeSubscriptionPackage: true,
    },
  });
  if (!customer?.stripeSubscriptionId) return null;
  if (!isLiveSubscriptionStatus(customer.stripeSubscriptionStatus)) return null;
  if (
    customer.stripeSubscriptionPackage &&
    customer.stripeSubscriptionPackage !== packageSlug
  ) {
    return null;
  }

  return {
    code: "ACTIVE_SUBSCRIPTION",
    message:
      "An active Stripe subscription already exists for this email and package",
  };
}

function metaString(
  meta: Stripe.Metadata | null | undefined,
  key: string,
): string | undefined {
  const v = meta?.[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const parent = invoice.parent;
  const details = parent?.subscription_details;
  if (!details?.subscription) return null;
  return typeof details.subscription === "string"
    ? details.subscription
    : details.subscription.id;
}

/**
 * Abonelik yenileme faturası.
 * subscription_create → checkout.session.completed + case dönemi (atla).
 * subscription_cycle → yeni aylık dönem (aylik-paket).
 */
export async function handleSubscriptionInvoicePaid(
  invoice: Stripe.Invoice,
  stripe: Stripe,
): Promise<"skipped" | "renewed" | "duplicate" | "surec_noted" | "error"> {
  const reason = invoice.billing_reason;
  if (reason === "subscription_create") {
    return "skipped";
  }
  if (reason !== "subscription_cycle" && reason !== "subscription_update") {
    return "skipped";
  }

  const subscriptionId = invoiceSubscriptionId(invoice);
  if (!subscriptionId || !invoice.id) return "skipped";

  const claim = await claimStripeInvoice({
    invoiceId: invoice.id,
    kind: "subscription_renewal",
  });
  if (claim === "duplicate") return "duplicate";

  let subscription: Stripe.Subscription;
  try {
    subscription = await stripe.subscriptions.retrieve(subscriptionId);
  } catch (err) {
    console.error("[stripe-sub:retrieve]", subscriptionId, err);
    return "error";
  }

  const packageSlug =
    metaString(subscription.metadata, "packageSlug") ??
    metaString(invoice.metadata, "packageSlug") ??
    metaString(invoice.parent?.subscription_details?.metadata, "packageSlug") ??
    "aylik-paket";

  const email =
    metaString(subscription.metadata, "customerEmail") ??
    invoice.customer_email ??
    undefined;

  const stripeCustomerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer && typeof invoice.customer === "object"
        ? invoice.customer.id
        : typeof subscription.customer === "string"
          ? subscription.customer
          : undefined;

  if (email) {
    await syncCustomerStripeSubscription({
      email,
      stripeCustomerId,
      stripeSubscriptionId: subscriptionId,
      packageSlug,
      status: subscription.status,
    });
  }

  if (packageSlug === "surec-yonetimi") {
    console.info("[stripe-sub:surec-renewal]", {
      invoiceId: invoice.id,
      subscriptionId,
      email,
    });
    return "surec_noted";
  }

  if (packageSlug !== "aylik-paket") {
    return "skipped";
  }

  const quotaRaw = Number(
    metaString(subscription.metadata, "fileQuota") ??
      metaString(invoice.metadata, "fileQuota") ??
      metaString(invoice.parent?.subscription_details?.metadata, "fileQuota") ??
      4,
  );
  const quota =
    Number.isFinite(quotaRaw) && quotaRaw >= 4 && quotaRaw <= 24
      ? Math.floor(quotaRaw)
      : 4;

  if (!email) {
    console.error("[stripe-sub:renewal-no-email]", invoice.id);
    return "error";
  }

  const period = await createPeriodFromSubscriptionRenewal({
    email,
    quota,
    stripeInvoiceId: invoice.id,
    stripeSubscriptionId: subscriptionId,
    paidAt: new Date(
      (invoice.status_transitions?.paid_at ?? Math.floor(Date.now() / 1000)) *
        1000,
    ),
  });

  if (!period) return "error";

  if (isDatabaseConfigured()) {
    await getPrisma()
      .stripeInvoiceReceipt.update({
        where: { invoiceId: invoice.id },
        data: { periodId: period.id },
      })
      .catch(() => undefined);
  }

  return "renewed";
}

export async function handleSubscriptionLifecycle(
  subscription: Stripe.Subscription,
): Promise<void> {
  const email = metaString(subscription.metadata, "customerEmail");
  const packageSlug = metaString(subscription.metadata, "packageSlug");
  const stripeCustomerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!email) {
    if (!isDatabaseConfigured()) return;
    const prisma = getPrisma();
    await prisma.customer.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripeSubscriptionStatus: subscription.status,
        ...(subscription.status === "canceled"
          ? { stripeSubscriptionId: subscription.id }
          : {}),
      },
    });
    return;
  }

  await syncCustomerStripeSubscription({
    email,
    stripeCustomerId,
    stripeSubscriptionId: subscription.id,
    packageSlug: packageSlug ?? null,
    status: subscription.status,
  });
}
