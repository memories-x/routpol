import { normalizeNip } from "./nip";
import { buildInvoicePositions } from "./line-item";
import type { FakturowniaConfig } from "./config";
import type { CaseRecord } from "@/lib/cases/types";

export type FakturowniaInvoiceSnapshot = {
  providerId: string;
  number?: string;
  ksefNumber?: string;
  pdfUrl?: string;
  viewUrl?: string;
};

function baseUrl(account: string): string {
  return `https://${account}.fakturownia.pl`;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object") return {};
  const o = value as Record<string, unknown>;
  if (o.invoice && typeof o.invoice === "object") {
    return o.invoice as Record<string, unknown>;
  }
  return o;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function idStr(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return str(value);
}

export function parseFakturowniaInvoice(
  raw: unknown,
  account: string,
): FakturowniaInvoiceSnapshot | null {
  const inv = asRecord(raw);
  const providerId = idStr(inv.id);
  if (!providerId) return null;
  const ksef =
    str(inv.gov_id) || str(inv.ksef_number) || str(inv.ksefNumber);
  const viewUrl = str(inv.view_url) || str(inv.viewUrl);
  return {
    providerId,
    number: str(inv.number),
    ksefNumber: ksef,
    viewUrl,
    pdfUrl: `${baseUrl(account)}/invoices/${providerId}.pdf`,
  };
}

async function fakturowniaFetch(
  cfg: FakturowniaConfig,
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; json: unknown; text: string }> {
  const url = new URL(path, `${baseUrl(cfg.account)}/`);
  url.searchParams.set("api_token", cfg.token);
  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function createFakturowniaInvoice(
  record: CaseRecord,
  cfg: FakturowniaConfig,
): Promise<FakturowniaInvoiceSnapshot> {
  const nip = record.customer.nip
    ? normalizeNip(record.customer.nip)
    : "";
  const isCompany = Boolean(record.customer.companyName?.trim() || nip);
  const buyerName =
    record.customer.companyName?.trim() || record.customer.fullName;
  const gross = (record.payment.amountCents / 100).toFixed(2);
  const date = todayIsoDate();
  const lineItems = buildInvoicePositions(record);
  const positions = lineItems.map((p) => {
    const name = [p.name, ...p.details].join(" — ").slice(0, 256);
    const position: Record<string, unknown> = {
      name,
      quantity: p.quantity,
      total_price_gross: Number((p.grossCents / 100).toFixed(2)),
      tax: cfg.vat,
    };
    if (cfg.vat === "zw" && cfg.exemptTaxKind) {
      position.exempt_tax_kind = cfg.exemptTaxKind;
    }
    return position;
  });

  const invoice: Record<string, unknown> = {
    kind: "vat",
    oid: record.id,
    number: null,
    sell_date: date,
    issue_date: date,
    payment_to: date,
    status: "paid",
    paid: true,
    payment_type: "card",
    currency: (record.payment.currency || "pln").toUpperCase(),
    buyer_name: buyerName,
    buyer_email: record.customer.email,
    buyer_phone: record.customer.phone,
    buyer_company: isCompany,
    buyer_country: "PL",
    positions,
    description: `Case ${record.id} | ${record.packageSlug} | paid ${gross} ${(record.payment.currency || "pln").toUpperCase()}`,
  };

  if (nip) {
    invoice.buyer_tax_no = nip;
  } else {
    invoice.buyer_tax_no_kind = "empty";
  }

  const body: Record<string, unknown> = {
    api_token: cfg.token,
    invoice,
  };
  if (nip) body.gov_save_and_send = true;

  const created = await fakturowniaFetch(cfg, "/invoices.json", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!created.ok) {
    const existing = await findFakturowniaInvoiceByOid(cfg, record.id);
    if (existing) return existing;
    throw new Error(errorMessage(created.json, created.text, created.status));
  }
  const snap = parseFakturowniaInvoice(created.json, cfg.account);
  if (!snap) {
    throw new Error("Fakturownia yanıtında fatura id yok");
  }
  return snap;
}

export async function findFakturowniaInvoiceByOid(
  cfg: FakturowniaConfig,
  oid: string,
): Promise<FakturowniaInvoiceSnapshot | null> {
  const got = await fakturowniaFetch(
    cfg,
    `/invoices.json?oid=${encodeURIComponent(oid)}`,
  );
  if (!got.ok) return null;
  const json = got.json;
  const list = Array.isArray(json)
    ? json
    : json &&
        typeof json === "object" &&
        Array.isArray((json as { invoices?: unknown }).invoices)
      ? (json as { invoices: unknown[] }).invoices
      : [];
  const first = list[0];
  return first ? parseFakturowniaInvoice(first, cfg.account) : null;
}

export async function getFakturowniaInvoice(
  cfg: FakturowniaConfig,
  providerId: string,
): Promise<FakturowniaInvoiceSnapshot | null> {
  const got = await fakturowniaFetch(
    cfg,
    `/invoices/${encodeURIComponent(providerId)}.json`,
  );
  if (!got.ok) return null;
  return parseFakturowniaInvoice(got.json, cfg.account);
}

export async function sendFakturowniaInvoiceEmail(
  cfg: FakturowniaConfig,
  providerId: string,
  emailTo: string,
): Promise<{ ok: boolean; error?: string }> {
  const sent = await fakturowniaFetch(
    cfg,
    `/invoices/${encodeURIComponent(providerId)}/send_by_email.json`,
    {
      method: "POST",
      body: JSON.stringify({
        api_token: cfg.token,
        email_to: emailTo,
      }),
    },
  );
  const payload = asRecord(sent.json);
  if (payload.status === "error") {
    return { ok: false, error: str(payload.message) ?? "e-posta gönderilemedi" };
  }
  if (!sent.ok) {
    return {
      ok: false,
      error: errorMessage(sent.json, sent.text, sent.status),
    };
  }
  return { ok: true };
}

function errorMessage(json: unknown, text: string, status: number): string {
  const rec = asRecord(json);
  const msg =
    str(rec.message) ||
    str(rec.error) ||
    (typeof rec.code === "string" ? rec.code : undefined);
  if (msg) return msg;
  const slice = text.replace(/\s+/g, " ").slice(0, 180);
  return slice || `Fakturownia HTTP ${status}`;
}
