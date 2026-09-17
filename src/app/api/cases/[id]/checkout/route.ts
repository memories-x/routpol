import { fail, ok } from "@/lib/api";
import {
  isCheckoutablePackage,
  isSubscriptionPackage,
  packageRequiresDocumentUploads,
} from "@/lib/cases/document-slots";
import {
  getAmountCentsForMeta,
  getPackageCurrency,
  productNameFor,
} from "@/lib/cases/pricing";
import { resolveTekYaziPriceFromCase } from "@/lib/cases/tek-yazi-price";
import { getCase, saveCase } from "@/lib/cases/store";
import { missingRequiredSlots } from "@/lib/cases/validate-slots";
import { getPublicEnv } from "@/lib/env";
import { recurringPackageBlock } from "@/lib/customer-portal/purchase-guard";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { secureCompare } from "@/lib/secure-compare";
import { assertProductionReady, isProductionRuntime } from "@/lib/golive";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: Request, ctx: Ctx) {
  try {
    if (isProductionRuntime()) assertProductionReady("checkout");
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      fail("PRODUCTION_MISCONFIGURED", "Service temporarily unavailable"),
      { status: 503 },
    );
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Case not found"), {
      status: 404,
    });
  }

  const token = request.headers.get("x-case-token");
  if (!token || !secureCompare(token, record.accessToken)) {
    return NextResponse.json(fail("UNAUTHORIZED", "Invalid token"), {
      status: 401,
    });
  }

  if (!isCheckoutablePackage(record.packageSlug)) {
    return NextResponse.json(fail("NOT_PAYABLE", "Unknown package"), {
      status: 400,
    });
  }

  if (
    record.status === "paid" ||
    record.status === "in_progress" ||
    record.status === "closed"
  ) {
    return NextResponse.json(fail("ALREADY_PAID", "Already paid"), {
      status: 400,
    });
  }

  const recurring = isSubscriptionPackage(record.packageSlug);
  if (recurring) {
    const blocked = await recurringPackageBlock(
      record.customer.email,
      record.packageSlug,
    );
    if (blocked) {
      return NextResponse.json(fail(blocked.code, blocked.message), {
        status: 409,
      });
    }
  }

  if (packageRequiresDocumentUploads(record.packageSlug)) {
    const missing = missingRequiredSlots(
      record.packageSlug,
      record.documents,
    );
    if (missing.length > 0) {
      return NextResponse.json(
        fail("MISSING_DOCS", "Required documents missing", { missing }),
        { status: 400 },
      );
    }
  }

  let meta = record.pricingMeta ?? {};
  let amount = getAmountCentsForMeta(record.packageSlug, meta);

  if (record.packageSlug === "tek-yazi") {
    const priced = resolveTekYaziPriceFromCase(record);
    if (!priced.ok) {
      return NextResponse.json(fail(priced.code, priced.message), {
        status: 400,
      });
    }
    meta = {
      ...meta,
      pageCount: priced.pageCount,
      pagesFromUpload: true,
    };
    amount = priced.amountCents;
    record.pricingMeta = meta;
  }

  record.payment.amountCents = amount;
  record.payment.currency = getPackageCurrency();
  const currency = record.payment.currency;
  const site = getPublicEnv().siteUrl.replace(/\/$/, "");
  const successUrl = `${site}/${record.locale}/basvuru/basarili?case=${record.id}&token=${record.accessToken}`;
  const cancelUrl = `${site}/${record.locale}/basvuru?case=${record.id}&token=${record.accessToken}&cancelled=1`;

  if (!isStripeConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        fail("STRIPE_REQUIRED", "Payment provider not configured"),
        { status: 503 },
      );
    }
    record.status = "awaiting_payment";
    record.payment.status = "pending";
    record.payment.amountCents = amount;
    record.payment.currency = currency;
    await saveCase(record);
    return NextResponse.json(
      ok({
        mode: "dev",
        checkoutUrl: null,
        subscription: recurring,
        message:
          "Stripe not configured. Use POST /api/cases/[id]/dev-pay in development.",
        amountCents: amount,
        currency,
        pageCount: meta.pageCount ?? null,
      }),
    );
  }

  const stripe = getStripe();

  if (
    record.status === "awaiting_payment" &&
    record.payment.stripeSessionId
  ) {
    try {
      const existingSession = await stripe.checkout.sessions.retrieve(
        record.payment.stripeSessionId,
      );
      const modeOk =
        (recurring && existingSession.mode === "subscription") ||
        (!recurring && existingSession.mode === "payment");
      if (
        modeOk &&
        existingSession.status === "open" &&
        existingSession.url
      ) {
        return NextResponse.json(
          ok({
            mode: "stripe",
            checkoutUrl: existingSession.url,
            sessionId: existingSession.id,
            subscription: recurring,
            amountCents: amount,
            currency,
            pageCount: meta.pageCount ?? null,
            reused: true,
          }),
        );
      }
    } catch (err) {
      console.error("[checkout:reuse-session]", err);
    }
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency,
        unit_amount: amount,
        ...(recurring
          ? { recurring: { interval: "month" as const } }
          : {}),
        product_data: {
          name: productNameFor(record.packageSlug, meta, record.locale),
          description: `Case ${record.id}`,
        },
      },
    },
  ];

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: recurring ? "subscription" : "payment",
    customer_email: record.customer.email,
    client_reference_id: record.id,
    // Yasal fatura Fakturownia/KSeF. Stripe invoice_creation AÇILMAZ.
    metadata: {
      caseId: record.id,
      packageSlug: record.packageSlug,
      billing: recurring ? "subscription" : "one_time",
      pageCount: String(meta.pageCount ?? ""),
      callRequestedAt: String(meta.callRequestedAt ?? ""),
      entityType: String(meta.entityType ?? ""),
      fileQuota: String(meta.fileQuota ?? ""),
    },
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
  };

  if (recurring) {
    sessionParams.subscription_data = {
      metadata: {
        caseId: record.id,
        packageSlug: record.packageSlug,
        fileQuota: String(meta.fileQuota ?? 4),
        entityType: String(meta.entityType ?? ""),
        customerEmail: record.customer.email,
        locale: record.locale,
      },
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  record.status = "awaiting_payment";
  record.payment.status = "pending";
  record.payment.amountCents = amount;
  record.payment.currency = currency;
  record.payment.stripeSessionId = session.id;
  await saveCase(record);

  return NextResponse.json(
    ok({
      mode: "stripe",
      checkoutUrl: session.url,
      sessionId: session.id,
      subscription: recurring,
      amountCents: amount,
      currency,
      pageCount: meta.pageCount ?? null,
    }),
  );
}
