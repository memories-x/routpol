import type { CaseRecord } from "@/lib/cases/types";

/** Ödeme sonrası yan etkiler — store'dan ayrı, test edilebilir. */
export async function runCasePaidEffects(
  saved: CaseRecord,
  alreadyPaid: boolean,
): Promise<CaseRecord> {
  let current = saved;

  if (!alreadyPaid && saved.packageSlug === "aylik-paket") {
    try {
      const { isDatabaseConfigured } = await import("@/lib/db");
      if (isDatabaseConfigured()) {
        const { createPeriodFromPaidCase } = await import(
          "@/lib/customer-portal/subscription-period"
        );
        await createPeriodFromPaidCase(saved);
      }
    } catch (err) {
      console.error("[case-paid-effects:period]", err);
    }
  }

  if (
    !alreadyPaid &&
    (saved.packageSlug === "aylik-paket" ||
      saved.packageSlug === "surec-yonetimi") &&
    saved.payment.stripeSubscriptionId
  ) {
    try {
      const { syncCustomerStripeSubscription } = await import(
        "@/lib/customer-portal/stripe-subscription"
      );
      await syncCustomerStripeSubscription({
        email: saved.customer.email,
        stripeCustomerId: saved.payment.stripeCustomerId,
        stripeSubscriptionId: saved.payment.stripeSubscriptionId,
        packageSlug: saved.packageSlug,
        status: "active",
      });
    } catch (err) {
      console.error("[case-paid-effects:stripe-sub]", err);
    }
  }

  if (!alreadyPaid && !current.notifications?.paidLinkSentAt) {
    try {
      const { enqueueOutbox, processOutboxBatch } = await import("@/lib/outbox");
      await enqueueOutbox("case_paid_mail", { caseId: current.id });
      await processOutboxBatch(1);
      const { getCase } = await import("@/lib/cases/store");
      current = (await getCase(current.id)) ?? current;
    } catch (err) {
      console.error("[case-paid-effects:mail]", err);
    }
  }

  try {
    const { issueLegalInvoice } = await import("@/lib/invoices/issue");
    const { isInvoiceAutoIssueEnabled, accountantPendingReason } = await import(
      "@/lib/invoices/config"
    );
    if (isInvoiceAutoIssueEnabled()) {
      current = await issueLegalInvoice(current);
    } else if (
      !current.payment.invoice ||
      current.payment.invoice.status === "none"
    ) {
      current.payment.invoice = {
        status: "pending",
        lastError: accountantPendingReason(),
      };
      const { saveCase } = await import("@/lib/cases/store");
      current = await saveCase(current);
    }
  } catch (err) {
    console.error("[case-paid-effects:invoice]", err);
  }

  return current;
}
