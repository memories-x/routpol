/**
 * Demo PDF — hardcoded sample seller (no .env).
 * Run: npx tsx scripts/demo-local-invoice.mts
 */
import { promises as fs } from "fs";
import path from "path";
import { buildLocalInvoicePdf } from "../src/lib/invoices/local-pdf";
import type { CaseRecord } from "../src/lib/cases/types";

process.env.SELLER_NAME = "Jan Nowak";
process.env.SELLER_ADDRESS = "ul. Przyklad 12\n50-001 Wroclaw";
process.env.SELLER_CITY = "Wroclaw";
process.env.SELLER_NIP = "5285168215";
process.env.SELLER_BANK_ACCOUNT = "93 1240 1369 0854 0216 3230 2133";

const record = {
  id: "case_demo_tek5",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  locale: "tr",
  packageSlug: "tek-yazi",
  pricingMeta: { pageCount: 5, pagesFromUpload: true },
  status: "paid",
  customer: {
    fullName: "Anna Kowalska",
    email: "anna@example.com",
    phone: "+48111222333",
    companyName: "Nowoczesna Firma sp. z o.o.",
    nip: "5232423452",
    shippingAddress: "ul. Nowa 1\n00-001 Warszawa",
    matter: "US — PIT-37 korekta",
    resultLocale: "pl",
  },
  documents: [],
  payment: {
    amountCents: 12500,
    currency: "pln",
    status: "paid",
    paidAt: new Date().toISOString(),
    billingKind: "sale",
  },
  accessToken: "tok",
} as CaseRecord;


const outDir = path.join(process.cwd(), "data", "demos");
const outPdf = path.join(outDir, "ornek-faktura-bez-vat.pdf");

await fs.mkdir(outDir, { recursive: true });
const pdf = await buildLocalInvoicePdf({
  record,
  number: "FV/2026/09/001",
  issuedAt: new Date("2026-09-16T12:00:00Z"),
});
await fs.writeFile(outPdf, pdf);
console.log(outPdf, pdf.byteLength);
