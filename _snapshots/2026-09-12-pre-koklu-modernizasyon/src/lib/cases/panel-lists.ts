import type { CaseRecord } from "./types";
import { isRevenueSale } from "@/lib/invoices/invoiceable";
import {
  summarizeCustomers,
  type CustomerSummary,
} from "./customers";

export type PaymentRow = {
  caseId: string;
  fullName: string;
  companyName?: string;
  email: string;
  packageSlug: string;
  amountCents: number;
  currency: string;
  paidAt?: string;
  status: string;
  lawyerPartner?: string;
};

export type PartnerGroup = {
  name: string;
  caseCount: number;
  cases: Array<{
    id: string;
    fullName: string;
    companyName?: string;
    matter?: string;
    packageSlug: string;
    status: string;
    updatedAt: string;
    paidAt?: string;
    documentCount: number;
    amountCents: number;
    currency: string;
    checklist?: CaseRecord["checklist"];
  }>;
};

export function listCompanies(cases: CaseRecord[]): CustomerSummary[] {
  return summarizeCustomers(cases).filter((c) =>
    Boolean(c.companyName?.trim()),
  );
}

export function listIndividuals(cases: CaseRecord[]): CustomerSummary[] {
  return summarizeCustomers(cases).filter((c) => !c.companyName?.trim());
}

export type InvoiceRow = {
  caseId: string;
  fullName: string;
  companyName?: string;
  email: string;
  packageSlug: string;
  amountCents: number;
  currency: string;
  paidAt?: string;
  invoiceStatus: string;
  invoiceNumber?: string;
  ksefNumber?: string;
  pdfUrl?: string;
  lastError?: string;
};

export function listInvoices(cases: CaseRecord[]): InvoiceRow[] {
  return cases
    .filter((c) => isRevenueSale(c))
    .map((c) => ({
      caseId: c.id,
      fullName: c.customer.fullName,
      companyName: c.customer.companyName,
      email: c.customer.email,
      packageSlug: c.packageSlug,
      amountCents: c.payment.amountCents,
      currency: c.payment.currency,
      paidAt: c.payment.paidAt,
      invoiceStatus: c.payment.invoice?.status ?? "pending",
      invoiceNumber: c.payment.invoice?.number,
      ksefNumber: c.payment.invoice?.ksefNumber,
      pdfUrl: c.payment.invoice?.pdfUrl,
      lastError: c.payment.invoice?.lastError,
    }))
    .sort((a, b) => (b.paidAt ?? "").localeCompare(a.paidAt ?? ""));
}

export function listPayments(cases: CaseRecord[]): PaymentRow[] {
  return cases
    .filter((c) => isRevenueSale(c))
    .map((c) => ({
      caseId: c.id,
      fullName: c.customer.fullName,
      companyName: c.customer.companyName,
      email: c.customer.email,
      packageSlug: c.packageSlug,
      amountCents: c.payment.amountCents,
      currency: c.payment.currency,
      paidAt: c.payment.paidAt,
      status: c.status,
      lawyerPartner: c.lawyerPartner,
    }))
    .sort((a, b) => (b.paidAt ?? "").localeCompare(a.paidAt ?? ""));
}

export function listPaidCases(cases: CaseRecord[]): CaseRecord[] {
  return cases
    .filter((c) => isRevenueSale(c))
    .sort((a, b) =>
      (b.payment.paidAt ?? "").localeCompare(a.payment.paidAt ?? ""),
    );
}

export function listQueue(cases: CaseRecord[]): CaseRecord[] {
  return cases
    .filter((c) => c.status === "paid" || c.status === "in_progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function listPartners(cases: CaseRecord[]): PartnerGroup[] {
  const map = new Map<string, PartnerGroup>();
  for (const c of cases) {
    if (c.status === "draft") continue;
    const name = c.lawyerPartner?.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    let g = map.get(key);
    if (!g) {
      g = { name, caseCount: 0, cases: [] };
      map.set(key, g);
    }
    g.caseCount += 1;
    g.cases.push({
      id: c.id,
      fullName: c.customer.fullName,
      companyName: c.customer.companyName,
      matter: c.customer.matter,
      packageSlug: c.packageSlug,
      status: c.status,
      updatedAt: c.updatedAt,
      paidAt: c.payment.paidAt,
      documentCount: Array.isArray(c.documents) ? c.documents.length : 0,
      amountCents: c.payment.amountCents,
      currency: c.payment.currency,
      checklist: c.checklist,
    });
  }
  for (const g of map.values()) {
    g.cases.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  return [...map.values()].sort((a, b) => b.caseCount - a.caseCount);
}
