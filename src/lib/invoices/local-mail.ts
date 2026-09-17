import type { CaseRecord } from "@/lib/cases/types";
import { invoicePositionSummary } from "@/lib/invoices/line-item";
import { getSmtpFrom, getSmtpTransport } from "@/lib/mail/smtp-transport";

export async function sendLocalInvoiceMail(params: {
  record: CaseRecord;
  number: string;
  pdf: Buffer;
}): Promise<void> {
  const to = params.record.customer.email?.trim();
  if (!to) throw new Error("INVOICE_BUYER_EMAIL_MISSING");

  const transport = getSmtpTransport();
  const from = getSmtpFrom();
  const name = params.record.customer.fullName || "Kliencie";
  const amount = (params.record.payment.amountCents / 100).toFixed(2);
  const currency = (params.record.payment.currency || "pln").toUpperCase();
  const line = invoicePositionSummary(params.record);

  const subject = `Faktura ${params.number} — ROUTEPOL`;
  const text = [
    `Dzien dobry ${name},`,
    "",
    `Dziekujemy za oplacenie zamowienia. W zalaczeniu przesylamy fakture bez VAT nr ${params.number}.`,
    `Kwota: ${amount} ${currency}`,
    `Pozycja: ${line}`,
    `Nr sprawy: ${params.record.id}`,
    "",
    "ROUTEPOL",
  ].join("\n");

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    attachments: [
      {
        filename: `${params.number.replace(/\//g, "-")}.pdf`,
        content: params.pdf,
        contentType: "application/pdf",
      },
    ],
  });
}
