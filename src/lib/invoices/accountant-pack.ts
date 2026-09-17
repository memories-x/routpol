import { packageLabelTr } from "@/lib/cases/package-labels";
import type { CaseRecord } from "@/lib/cases/types";
import { isRevenueSale } from "@/lib/invoices/invoiceable";
import { buildZip, type ZipEntry } from "./zip-store";

export function warsawYearMonth(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .slice(0, 7);
}

export function currentWarsawYearMonth(): string {
  return warsawYearMonth(new Date().toISOString());
}

export function isBuyerCompany(record: CaseRecord): boolean {
  return Boolean(
    record.customer.companyName?.trim() || record.customer.nip?.trim(),
  );
}

export function paidMonths(cases: CaseRecord[]): string[] {
  const set = new Set<string>();
  for (const c of Array.isArray(cases) ? cases : []) {
    if (c.payment.status !== "paid" || !c.payment.paidAt) continue;
    const m = warsawYearMonth(c.payment.paidAt);
    if (m) set.add(m);
  }
  const now = currentWarsawYearMonth();
  if (now) set.add(now);
  return [...set].sort().reverse();
}

function csvEscape(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function toCsv(rows: string[][]): string {
  const bom = "\uFEFF";
  return bom + rows.map((r) => r.map(csvEscape).join(";")).join("\r\n");
}

const HEADER = [
  "paidAt",
  "caseId",
  "fullName",
  "companyName",
  "nip",
  "email",
  "phone",
  "package",
  "amountZl",
  "currency",
  "stripeSessionId",
  "invoiceNumber",
  "ksefNumber",
  "note",
];

function rowFor(c: CaseRecord): string[] {
  const amount =
    typeof c.payment.amountCents === "number"
      ? (c.payment.amountCents / 100).toFixed(2).replace(".", ",")
      : "";
  return [
    c.payment.paidAt ?? "",
    c.id,
    c.customer.fullName,
    c.customer.companyName ?? "",
    c.customer.nip ?? "",
    c.customer.email,
    c.customer.phone,
    packageLabelTr(c.packageSlug),
    amount,
    (c.payment.currency || "pln").toUpperCase(),
    c.payment.stripeSessionId ?? "",
    c.payment.invoice?.number ?? "",
    c.payment.invoice?.ksefNumber ?? "",
    "Stripe = tahsilat. Yasal fatura muhasebeci (KSeF). Stripe faturasi gonderilmez.",
  ];
}

function casesInMonth(cases: CaseRecord[], month: string): CaseRecord[] {
  return (Array.isArray(cases) ? cases : []).filter((c) => {
    if (!isRevenueSale(c) || !c.payment.paidAt) return false;
    return warsawYearMonth(c.payment.paidAt) === month;
  });
}

export function buildAccountantPackZip(
  cases: CaseRecord[],
  month: string,
): { filename: string; bytes: Uint8Array } {
  const paid = casesInMonth(cases, month);
  const firms = paid.filter(isBuyerCompany);
  const people = paid.filter((c) => !isBuyerCompany(c));

  const firmaCsv = toCsv([HEADER, ...firms.map(rowFor)]);
  const sahisCsv = toCsv([HEADER, ...people.map(rowFor)]);
  const readme = [
    `ROUTEPOL muhasebe teslim paketi — ${month}`,
    "",
    "Siz (ROUTEPOL): Stripe ile tahsilat. Bu ZIP = kim odedi listesi.",
    "Muhasebeci: yasal faktura VAT / KSeF keser, musterıye gonderir.",
    "Stripe Dashboard faturasi / makbuzu yasal fatura DEGILDIR; musteriye gondermeyin.",
    "",
    "excel/firma.csv  — NIP veya unvan dolu (B2B, KSeF)",
    "excel/sahis.csv  — bireysel (B2C)",
    "pdf/             — yasal PDF'ler muhasebecinin kestigi belgelerdir.",
    "                   Bu klasorde kopya yoksa muhasebeci kendi yazilimindan ekler.",
    "",
    `Kayit: firma ${firms.length}, sahis ${people.length}.`,
    "Para kaniti: Stripe Dashboard → Payments / Payouts (aylik cekim).",
    "Ay: Europe/Warsaw.",
  ].join("\n");

  const pdfNote = [
    "Bu klasor, muhasebecinin KSeF / Fakturownia uzerinden kestigi PDF'ler icindir.",
    "ROUTEPOL Stripe makbuzu buraya konmaz.",
  ].join("\n");

  const enc = new TextEncoder();
  const entries: ZipEntry[] = [
    { name: "OKU.txt", bytes: enc.encode(readme) },
    { name: "excel/firma.csv", bytes: enc.encode(firmaCsv) },
    { name: "excel/sahis.csv", bytes: enc.encode(sahisCsv) },
    { name: "pdf/OKU.txt", bytes: enc.encode(pdfNote) },
  ];

  return {
    filename: `pol-turk-muhasebe-${month}.zip`,
    bytes: buildZip(entries),
  };
}

export function isValidYearMonth(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}
