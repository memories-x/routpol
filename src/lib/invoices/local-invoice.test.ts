import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  formatInvoiceNumber,
  nextInvoiceNumber,
} from "@/lib/invoices/sequence";
import { buildLocalInvoicePdf } from "@/lib/invoices/local-pdf";
import {
  getInvoiceProvider,
  isLocalInvoiceReady,
  shouldUseLocalInvoice,
  isFakturowniaAutoIssueEnabled,
} from "@/lib/invoices/config";
import type { CaseRecord } from "@/lib/cases/types";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

describe("formatInvoiceNumber", () => {
  it("formats FV/YYYY/MM/XXX", () => {
    expect(formatInvoiceNumber(2026, 9, 1)).toBe("FV/2026/09/001");
    expect(formatInvoiceNumber(2026, 12, 42)).toBe("FV/2026/12/042");
  });
});

describe("config local provider", () => {
  const envKeys = [
    "INVOICE_PROVIDER",
    "INVOICE_AUTO_ISSUE",
    "FAKTUROWNIA_ACCOUNT",
    "FAKTUROWNIA_API_TOKEN",
    "SMTP_HOST",
    "SMTP_FROM",
    "SELLER_NAME",
    "SELLER_ADDRESS",
    "SELLER_NIP",
    "SELLER_PESEL",
  ] as const;

  const prev: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of envKeys) {
      prev[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of envKeys) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
  });

  it("detects local ready", () => {
    expect(isLocalInvoiceReady()).toBe(false);
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_FROM = "f@example.com";
    process.env.SELLER_NAME = "Firma";
    process.env.SELLER_ADDRESS = "ul. Test 1";
    process.env.SELLER_NIP = "123";
    expect(isLocalInvoiceReady()).toBe(true);
  });

  it("defaults provider to local", () => {
    expect(getInvoiceProvider()).toBe("local");
  });

  it("uses local when provider=local", () => {
    process.env.INVOICE_PROVIDER = "local";
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_FROM = "f@example.com";
    process.env.SELLER_NAME = "Firma";
    process.env.SELLER_ADDRESS = "ul. Test 1";
    process.env.SELLER_NIP = "123";
    expect(getInvoiceProvider()).toBe("local");
    expect(shouldUseLocalInvoice()).toBe(true);
  });

  it("local provider blocks Fakturownia auto", () => {
    process.env.INVOICE_AUTO_ISSUE = "1";
    process.env.FAKTUROWNIA_ACCOUNT = "acc";
    process.env.FAKTUROWNIA_API_TOKEN = "tok";
    process.env.INVOICE_PROVIDER = "local";
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_FROM = "f@example.com";
    process.env.SELLER_NAME = "Firma";
    process.env.SELLER_ADDRESS = "ul. Test 1";
    process.env.SELLER_NIP = "123";
    expect(isFakturowniaAutoIssueEnabled()).toBe(false);
    expect(shouldUseLocalInvoice()).toBe(true);
  });
});

describe("nextInvoiceNumber fs", () => {
  let tmp: string;
  const prevRoot = process.env.STORAGE_ROOT;
  const prevDb = process.env.DATABASE_URL;

  beforeEach(async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), "inv-seq-"));
    process.env.STORAGE_ROOT = tmp;
    delete process.env.DATABASE_URL;
  });

  afterEach(async () => {
    if (prevRoot === undefined) delete process.env.STORAGE_ROOT;
    else process.env.STORAGE_ROOT = prevRoot;
    if (prevDb === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = prevDb;
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it("increments atomically on disk", async () => {
    const fixed = new Date(Date.UTC(2026, 8, 15));
    const a = await nextInvoiceNumber(fixed);
    const b = await nextInvoiceNumber(fixed);
    expect(a).toBe("FV/2026/09/001");
    expect(b).toBe("FV/2026/09/002");
  });
});

function sampleCase(): CaseRecord {
  return {
    id: "case_test_inv",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    locale: "pl",
    packageSlug: "tek-yazi",
    status: "paid",
    customer: {
      fullName: "Jan Kowalski",
      email: "jan@example.com",
      phone: "+48111111111",
      companyName: "Test Sp. z o.o.",
      nip: "5250000000",
    },
    documents: [],
    payment: {
      amountCents: 19900,
      currency: "pln",
      status: "paid",
      paidAt: new Date().toISOString(),
    },
    accessToken: "tok",
  };
}

describe("amountInWordsPln", () => {
  it("formats typical PLN amounts", async () => {
    const { amountInWordsPln } = await import("@/lib/invoices/amount-words-pl");
    expect(amountInWordsPln(19900)).toContain("zlot");
    expect(amountInWordsPln(100000)).toMatch(/tysiac/);
    expect(amountInWordsPln(0)).toMatch(/zero/);
  });
});

describe("buildLocalInvoicePdf", () => {
  const envKeys = [
    "SELLER_NAME",
    "SELLER_ADDRESS",
    "SELLER_NIP",
    "INVOICE_EXEMPT_TAX_KIND",
  ] as const;
  const prev: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of envKeys) {
      prev[k] = process.env[k];
    }
    process.env.SELLER_NAME = "ROUTEPOL Test";
    process.env.SELLER_ADDRESS = "ul. Przyklad 1\n00-001 Warszawa";
    process.env.SELLER_NIP = "5252445767";
  });

  afterEach(() => {
    for (const k of envKeys) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
  });

  it("returns a non-trivial PDF buffer", async () => {
    const pdf = await buildLocalInvoicePdf({
      record: sampleCase(),
      number: "FV/2026/09/001",
    });
    expect(Buffer.isBuffer(pdf)).toBe(true);
    expect(pdf.byteLength).toBeGreaterThan(500);
    expect(pdf.subarray(0, 4).toString("ascii")).toBe("%PDF");
  });
});

describe("sendLocalInvoiceMail", () => {
  it("sends via nodemailer transport", async () => {
    const smtp = await import("@/lib/mail/smtp-transport");
    const sendMail = vi.fn().mockResolvedValue({ messageId: "x" });
    const spy = vi
      .spyOn(smtp, "getSmtpTransport")
      .mockReturnValue({ sendMail } as never);
    const fromSpy = vi
      .spyOn(smtp, "getSmtpFrom")
      .mockReturnValue("from@example.com");

    const { sendLocalInvoiceMail } = await import("@/lib/invoices/local-mail");
    await sendLocalInvoiceMail({
      record: sampleCase(),
      number: "FV/2026/09/001",
      pdf: Buffer.from("%PDF-1.4"),
    });
    expect(sendMail).toHaveBeenCalledOnce();
    const arg = sendMail.mock.calls[0]![0] as {
      to: string;
      attachments: { filename: string }[];
    };
    expect(arg.to).toBe("jan@example.com");
    expect(arg.attachments[0]!.filename).toBe("FV-2026-09-001.pdf");
    spy.mockRestore();
    fromSpy.mockRestore();
  });
});
