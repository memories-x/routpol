/** Legal invoice config — Fakturownia (KSeF) or local PDF + SMTP. */

export type FakturowniaConfig = {
  account: string;
  token: string;
  /** "23" | "zw" | … */
  vat: string;
  exemptTaxKind?: string;
};

export function isFakturowniaConfigured(): boolean {
  return Boolean(
    process.env.FAKTUROWNIA_ACCOUNT?.trim() &&
      process.env.FAKTUROWNIA_API_TOKEN?.trim(),
  );
}

export function defaultExemptTaxKind(): string {
  return (
    process.env.INVOICE_EXEMPT_TAX_KIND?.trim() ||
    "Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o VAT"
  );
}

export function getFakturowniaConfig(): FakturowniaConfig | null {
  const account = process.env.FAKTUROWNIA_ACCOUNT?.trim();
  const token = process.env.FAKTUROWNIA_API_TOKEN?.trim();
  if (!account || !token) return null;
  const vat = process.env.INVOICE_VAT_RATE?.trim() || "23";
  return {
    account,
    token,
    vat,
    exemptTaxKind: vat === "zw" ? defaultExemptTaxKind() : undefined,
  };
}

export function isLocalInvoiceReady(): boolean {
  const hasSeller =
    Boolean(process.env.SELLER_NAME?.trim()) &&
    Boolean(process.env.SELLER_ADDRESS?.trim()) &&
    Boolean(
      process.env.SELLER_NIP?.trim() || process.env.SELLER_PESEL?.trim(),
    );
  const hasSmtp =
    Boolean(process.env.SMTP_HOST?.trim()) &&
    Boolean(
      process.env.SMTP_FROM?.trim() || process.env.CONTACT_EMAIL_FROM?.trim(),
    );
  return hasSeller && hasSmtp;
}

export type InvoiceProviderMode = "local" | "fakturownia" | "off" | "auto";

/**
 * Varsayılan: local — Stripe tahsilat + yerel Faktura bez VAT PDF/SMTP.
 * Fakturownia yalnızca INVOICE_PROVIDER=fakturownia|auto + AUTO_ISSUE.
 */
export function getInvoiceProvider(): InvoiceProviderMode {
  const raw = process.env.INVOICE_PROVIDER?.trim().toLowerCase();
  if (raw === "local" || raw === "fakturownia" || raw === "off" || raw === "auto") {
    return raw;
  }
  return "local";
}

function isTruthyFlag(v: string | undefined): boolean {
  const t = v?.trim();
  return t === "1" || t?.toLowerCase() === "true";
}

/** Fakturownia auto — local/off iken asla. */
export function isFakturowniaAutoIssueEnabled(): boolean {
  const mode = getInvoiceProvider();
  if (mode === "local" || mode === "off") return false;
  return isTruthyFlag(process.env.INVOICE_AUTO_ISSUE) && isFakturowniaConfigured();
}

/**
 * Local PDF+SMTP when provider=local + ready, or auto + no Fakturownia + ready.
 */
export function shouldUseLocalInvoice(): boolean {
  const mode = getInvoiceProvider();
  if (mode === "off" || mode === "fakturownia") return false;
  if (!isLocalInvoiceReady()) return false;
  if (mode === "local") return true;
  return !isFakturowniaConfigured();
}

/**
 * Paid-effects auto-issue: Fakturownia auto OR local ready.
 */
export function isInvoiceAutoIssueEnabled(): boolean {
  if (getInvoiceProvider() === "off") return false;
  if (isFakturowniaAutoIssueEnabled()) return true;
  if (shouldUseLocalInvoice()) return true;
  return false;
}

export function accountantPendingReason(): string {
  return "INVOICE_PENDING_ACCOUNTANT";
}

export function sellerIdentity(): {
  name: string;
  address: string;
  nip?: string;
  pesel?: string;
  city?: string;
  bankAccount?: string;
} {
  return {
    name: process.env.SELLER_NAME?.trim() || "",
    address: process.env.SELLER_ADDRESS?.trim() || "",
    nip: process.env.SELLER_NIP?.trim() || undefined,
    pesel: process.env.SELLER_PESEL?.trim() || undefined,
    city: process.env.SELLER_CITY?.trim() || undefined,
    bankAccount: process.env.SELLER_BANK_ACCOUNT?.trim() || undefined,
  };
}
