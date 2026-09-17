import { saveCase } from "@/lib/cases/store";
import type { CaseInvoice, CaseRecord } from "@/lib/cases/types";
import {
  fakturowniaMissingReason,
  getFakturowniaConfig,
} from "./config";
import {
  createFakturowniaInvoice,
  getFakturowniaInvoice,
  sendFakturowniaInvoiceEmail,
} from "./fakturownia";

function mergeInvoice(
  record: CaseRecord,
  patch: CaseInvoice,
): CaseInvoice {
  return { ...(record.payment.invoice ?? { status: "none" }), ...patch };
}

async function persistInvoice(
  record: CaseRecord,
  patch: CaseInvoice,
): Promise<CaseRecord> {
  record.payment.invoice = mergeInvoice(record, patch);
  return saveCase(record);
}

/**
 * Stripe tahsilatından sonra yasal faturayı keser.
 * Token/oran yoksa pending. Zaten kesildiyse no-op (KSeF numarasını yeniler).
 */
export async function issueLegalInvoice(
  record: CaseRecord,
  opts?: { force?: boolean },
): Promise<CaseRecord> {
  if (record.payment.status !== "paid") return record;

  const existing = record.payment.invoice;
  if (
    !opts?.force &&
    existing?.status === "issued" &&
    existing.providerId &&
    existing.ksefNumber &&
    existing.emailSentAt
  ) {
    return record;
  }

  const cfg = getFakturowniaConfig();
  if (!cfg) {
    return persistInvoice(record, {
      status: "pending",
      lastError: fakturowniaMissingReason(),
    });
  }

  try {
    let providerId = existing?.providerId;
    let number = existing?.number;
    let ksefNumber = existing?.ksefNumber;
    let pdfUrl = existing?.pdfUrl;

    if (providerId) {
      const fresh = await getFakturowniaInvoice(cfg, providerId);
      if (fresh) {
        number = fresh.number ?? number;
        ksefNumber = fresh.ksefNumber ?? ksefNumber;
        pdfUrl = fresh.pdfUrl ?? pdfUrl;
      }
    } else {
      const created = await createFakturowniaInvoice(record, cfg);
      providerId = created.providerId;
      number = created.number;
      ksefNumber = created.ksefNumber;
      pdfUrl = created.pdfUrl;
    }

    const issuedAt = existing?.issuedAt ?? new Date().toISOString();
    let emailSentAt = existing?.emailSentAt;
    let lastError: string | undefined;

    const isCompany = Boolean(
      record.customer.companyName?.trim() || record.customer.nip,
    );
    const canEmail = !isCompany || Boolean(ksefNumber);

    if (providerId && !emailSentAt && canEmail) {
      const mailed = await sendFakturowniaInvoiceEmail(
        cfg,
        providerId,
        record.customer.email,
      );
      if (mailed.ok) {
        emailSentAt = new Date().toISOString();
      } else {
        lastError = mailed.error;
      }
    } else if (isCompany && !ksefNumber) {
      lastError = "KSeF numarası bekleniyor — e-posta sonra";
    }

    return persistInvoice(record, {
      status: "issued",
      providerId,
      number,
      ksefNumber,
      pdfUrl,
      issuedAt,
      emailSentAt,
      lastError,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fatura kesilemedi";
    console.error("[invoice:issue]", message);
    return persistInvoice(record, {
      status: "failed",
      lastError: message.slice(0, 400),
    });
  }
}
