export type InvoiceVatRate = 0 | 5 | 8 | 23 | "zw";

export type FakturowniaConfig = {
  account: string;
  token: string;
  vat: InvoiceVatRate;
  exemptTaxKind?: string;
};

export function isFakturowniaConfigured(): boolean {
  return getFakturowniaConfig() !== null;
}

export function fakturowniaMissingReason(): string {
  const missing: string[] = [];
  if (!process.env.FAKTUROWNIA_ACCOUNT?.trim()) {
    missing.push("FAKTUROWNIA_ACCOUNT");
  }
  if (!process.env.FAKTUROWNIA_API_TOKEN?.trim()) {
    missing.push("FAKTUROWNIA_API_TOKEN");
  }
  if (!parseVatRate(process.env.INVOICE_VAT_RATE)) {
    missing.push("INVOICE_VAT_RATE");
  }
  return missing.length
    ? `Fatura aracı yok: ${missing.join(", ")}`
    : "Fatura aracı yapılandırılmadı";
}

export function getFakturowniaConfig(): FakturowniaConfig | null {
  const account = process.env.FAKTUROWNIA_ACCOUNT?.trim() ?? "";
  const token = process.env.FAKTUROWNIA_API_TOKEN?.trim() ?? "";
  const vat = parseVatRate(process.env.INVOICE_VAT_RATE);
  if (!account || !token || !vat) return null;
  const exempt = process.env.INVOICE_EXEMPT_TAX_KIND?.trim();
  return {
    account,
    token,
    vat,
    exemptTaxKind: exempt || undefined,
  };
}

/** Varsayılan kapalı: muhasebeci keser. 1/true ile Fakturownia otomatik kesim. */
export function isInvoiceAutoIssueEnabled(): boolean {
  const v = process.env.INVOICE_AUTO_ISSUE?.trim().toLowerCase();
  return (v === "1" || v === "true") && getFakturowniaConfig() !== null;
}

export function accountantPendingReason(): string {
  return "Muhasebeci keser (KSeF). Ay paketi: Faturalar.";
}

function parseVatRate(raw: string | undefined): InvoiceVatRate | null {
  if (!raw) return null;
  const t = raw.trim().toLowerCase();
  if (t === "zw") return "zw";
  const n = Number(t);
  if (n === 0 || n === 5 || n === 8 || n === 23) return n;
  return null;
}
