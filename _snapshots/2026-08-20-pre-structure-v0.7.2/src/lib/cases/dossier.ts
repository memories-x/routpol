import type { CaseRecord } from "./types";

/** Müşteriye verilecek dosya özeti (paylaşılan notlar + meta + evrak listesi) */
export function buildCustomerDossier(record: CaseRecord) {
  return {
    exportedAt: new Date().toISOString(),
    caseId: record.id,
    status: record.status,
    packageSlug: record.packageSlug,
    archiveFolder: record.archiveFolder ?? null,
    customer: {
      fullName: record.customer.fullName,
      email: record.customer.email,
      phone: record.customer.phone,
      companyName: record.customer.companyName ?? null,
      matter: record.customer.matter ?? null,
      resultLocale: record.customer.resultLocale ?? null,
    },
    payment: {
      status: record.payment.status,
      amountCents: record.payment.amountCents,
      currency: record.payment.currency,
      paidAt: record.payment.paidAt ?? null,
    },
    documents: record.documents.map((d) => ({
      id: d.id,
      slotKey: d.slotKey,
      originalName: d.originalName,
      mime: d.mime,
      size: d.size,
      pageCount: d.pageCount ?? null,
      uploadedAt: d.uploadedAt,
    })),
    sharedNotes: (record.notes ?? [])
      .filter((n) => n.sharedWithCustomer)
      .map((n) => ({
        body: n.body,
        createdAt: n.createdAt,
      })),
  };
}
