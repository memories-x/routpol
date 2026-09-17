import { fail, ok } from "@/lib/api";
import { archiveStaleCases } from "@/lib/cases/store";
import { sendPeriodRenewalReminders } from "@/lib/customer-portal/period-renewal";
import { purgeExpiredData } from "@/lib/data-retention/purge";
import { sendMosReviewReminderMail } from "@/lib/mail/mos-review-mail";
import { sendReconciliationAlertMail } from "@/lib/mail/reconciliation-mail";
import { processOutboxBatch } from "@/lib/outbox";
import { reconcileStripeCaseReceipts } from "@/lib/reconciliation/run-stripe-reconciliation";
import { NextResponse } from "next/server";

/** Protect with CRON_SECRET header. Archives stale + outbox + retention + mutabakat. */
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(fail("NOT_CONFIGURED", "CRON_SECRET missing"), {
      status: 503,
    });
  }
  const header = request.headers.get("x-cron-secret");
  if (header !== secret) {
    return NextResponse.json(fail("UNAUTHORIZED", "Bad secret"), {
      status: 401,
    });
  }

  const archived = await archiveStaleCases();
  const outbox = await processOutboxBatch(50);
  const purge = await purgeExpiredData();
  const renewal = await sendPeriodRenewalReminders();
  const reconciliation = await reconcileStripeCaseReceipts();
  let reconciliationMail: "resend" | "noop" | "skipped" = "skipped";
  let mosReviewMail: "resend" | "noop" | "skipped" = "skipped";
  try {
    reconciliationMail = await sendReconciliationAlertMail(reconciliation);
  } catch (err) {
    console.error("[cron:reconciliation-mail]", err);
  }
  try {
    mosReviewMail = await sendMosReviewReminderMail();
  } catch (err) {
    console.error("[cron:mos-review-mail]", err);
  }
  return NextResponse.json(
    ok({
      archived,
      outbox,
      purge,
      renewal,
      reconciliation,
      reconciliationMail,
      mosReviewMail,
    }),
  );
}
