import { promises as fs } from "fs";
import path from "path";
import type { CaseRecord } from "@/lib/cases/types";
import { saveCase } from "@/lib/cases/store";
import {
  accountantPendingReason,
  getFakturowniaConfig,
  getInvoiceProvider,
  isFakturowniaAutoIssueEnabled,
  isLocalInvoiceReady,
  shouldUseLocalInvoice,
  type FakturowniaConfig,
} from "@/lib/invoices/config";
import {
  createFakturowniaInvoice,
  sendFakturowniaInvoiceEmail,
} from "@/lib/invoices/fakturownia";
import { isRevenueSale } from "@/lib/invoices/invoiceable";

export type IssueLegalInvoiceOptions = {
  /** Panel retry — auto flag yok sayılır; mevcut issued üzerine yeniden kes. */
  force?: boolean;
};

function invoicesRoot(): string {
  const custom = process.env.STORAGE_ROOT?.trim();
  const root = custom
    ? path.resolve(custom)
    : path.join(process.cwd(), "data");
  return path.join(root, "invoices");
}

async function storeLocalInvoicePdf(
  caseId: string,
  number: string,
  pdf: Buffer,
): Promise<string> {
  const safeName = number.replace(/\//g, "-");
  const dir = path.join(invoicesRoot(), caseId);
  await fs.mkdir(dir, { recursive: true });
  const absolute = path.join(dir, `${safeName}.pdf`);
  await fs.writeFile(absolute, pdf);
  return path.join("invoices", caseId, `${safeName}.pdf`).replace(/\\/g, "/");
}

async function issueViaFakturownia(
  record: CaseRecord,
  cfg: FakturowniaConfig,
): Promise<CaseRecord> {
  const snap = await createFakturowniaInvoice(record, cfg);
  let emailSentAt: string | undefined;
  if (record.customer.email) {
    const sent = await sendFakturowniaInvoiceEmail(
      cfg,
      snap.providerId,
      record.customer.email,
    );
    if (sent.ok) emailSentAt = new Date().toISOString();
  }

  record.payment.invoice = {
    status: "issued",
    number: snap.number,
    ksefNumber: snap.ksefNumber,
    pdfUrl: snap.pdfUrl || snap.viewUrl,
    issuedAt: new Date().toISOString(),
    providerId: snap.providerId,
    emailSentAt,
  };
  return saveCase(record);
}

async function issueViaLocal(record: CaseRecord): Promise<CaseRecord> {
  const { nextInvoiceNumber } = await import("@/lib/invoices/sequence");
  const { buildLocalInvoicePdf } = await import("@/lib/invoices/local-pdf");
  const { sendLocalInvoiceMail } = await import("@/lib/invoices/local-mail");

  const number = await nextInvoiceNumber();
  const issuedAt = new Date();
  const pdf = await buildLocalInvoicePdf({ record, number, issuedAt });
  const pdfUrl = await storeLocalInvoicePdf(record.id, number, pdf);

  let emailSentAt: string | undefined;
  try {
    await sendLocalInvoiceMail({ record, number, pdf });
    emailSentAt = new Date().toISOString();
  } catch (err) {
    console.error("[invoice:local-mail]", err);
  }

  record.payment.invoice = {
    status: "issued",
    number,
    pdfUrl,
    issuedAt: issuedAt.toISOString(),
    providerId: "local",
    emailSentAt,
    lastError: emailSentAt ? undefined : "INVOICE_PDF_OK_EMAIL_FAILED",
  };
  return saveCase(record);
}

function preferFakturownia(force: boolean): FakturowniaConfig | null {
  const cfg = getFakturowniaConfig();
  if (!cfg) return null;
  const mode = getInvoiceProvider();
  if (mode === "off" || mode === "local") return null;
  if (isFakturowniaAutoIssueEnabled()) return cfg;
  if (force) return cfg;
  return null;
}

function preferLocal(force: boolean): boolean {
  if (shouldUseLocalInvoice()) return true;
  if (!force) return false;
  if (getInvoiceProvider() === "off") return false;
  return isLocalInvoiceReady();
}

/**
 * Yasal fatura: Fakturownia (AUTO/force öncelik) veya yerel PDF+SMTP.
 * Stripe Checkout makbuzu ayrı kalır.
 */
export async function issueLegalInvoice(
  record: CaseRecord,
  opts?: IssueLegalInvoiceOptions,
): Promise<CaseRecord> {
  if (!isRevenueSale(record)) return record;
  const force = Boolean(opts?.force);
  if (record.payment.invoice?.status === "issued" && !force) return record;

  const fakturowniaCfg = preferFakturownia(force);
  if (fakturowniaCfg) {
    try {
      return await issueViaFakturownia(record, fakturowniaCfg);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      record.payment.invoice = {
        status: "failed",
        lastError: msg.slice(0, 500),
      };
      return saveCase(record);
    }
  }

  if (preferLocal(force)) {
    try {
      return await issueViaLocal(record);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      record.payment.invoice = {
        status: "failed",
        lastError: msg.slice(0, 500),
      };
      return saveCase(record);
    }
  }

  record.payment.invoice = {
    status: "pending",
    lastError: accountantPendingReason(),
  };
  return saveCase(record);
}
