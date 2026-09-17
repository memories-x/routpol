import { getPrisma } from "@/lib/db";
import { caseArchiveFolderName } from "@/lib/cases/filing";
import type {
  CaseChecklistItem,
  CaseDocument,
  CasePayment,
  CasePricingMeta,
  CaseRecord,
  CaseStatus,
} from "@/lib/cases/types";
import type { PackageSlug } from "@/lib/cases/document-slots";
import type { Prisma } from "@prisma/client";

type DbCase = Prisma.CaseGetPayload<{
  include: { customer: true; documents: true; notes: true };
}>;

function paymentFromRow(row: DbCase): CasePayment {
  const legacy = (row.payment ?? null) as CasePayment | null;
  const status = (row.paymentStatus || legacy?.status || "none") as CasePayment["status"];
  return {
    amountCents: row.paymentAmountCents || legacy?.amountCents || 0,
    currency: row.paymentCurrency || legacy?.currency || "pln",
    status,
    paidAt: row.paymentPaidAt?.toISOString() ?? legacy?.paidAt,
    stripeSessionId: row.stripeSessionId ?? legacy?.stripeSessionId,
    stripeCustomerId: row.stripeCustomerId ?? legacy?.stripeCustomerId,
    stripeSubscriptionId:
      row.stripeSubscriptionId ?? legacy?.stripeSubscriptionId,
    invoice:
      (row.paymentInvoice as CasePayment["invoice"] | null) ??
      legacy?.invoice,
  };
}

function paymentColumns(record: CaseRecord) {
  return {
    paymentStatus: record.payment.status,
    paymentAmountCents: record.payment.amountCents,
    paymentCurrency: record.payment.currency,
    paymentPaidAt: record.payment.paidAt
      ? new Date(record.payment.paidAt)
      : null,
    stripeSessionId: record.payment.stripeSessionId ?? null,
    stripeCustomerId: record.payment.stripeCustomerId ?? null,
    stripeSubscriptionId: record.payment.stripeSubscriptionId ?? null,
    paymentInvoice: (record.payment.invoice ?? null) as Prisma.InputJsonValue,
  };
}

function toRecord(row: DbCase): CaseRecord {
  const payment = paymentFromRow(row);

  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    locale: row.locale,
    packageSlug: row.packageSlug as PackageSlug,
    pricingMeta: (row.pricingMeta as CasePricingMeta | null) ?? undefined,
    status: row.status as CaseStatus,
    customer: {
      fullName: row.customer.fullName,
      email: row.customer.email,
      phone: row.customer.phone,
      companyName: row.customer.companyName ?? undefined,
      nip: row.customer.nip ?? undefined,
      matter: row.matter ?? undefined,
      resultLocale: (row.resultLocale as "tr" | "pl" | "en" | null) ?? undefined,
      notes: row.customerNotes ?? undefined,
    },
    documents: row.documents.map(
      (d): CaseDocument => ({
        id: d.id,
        slotKey: d.slotKey,
        originalName: d.originalName,
        mime: d.mime,
        size: d.size,
        storagePath: d.storagePath,
        uploadedAt: d.uploadedAt.toISOString(),
        pageCount: d.pageCount ?? undefined,
      }),
    ),
    payment,
    accessToken: row.accessToken,
    notifications: (row.notifications as CaseRecord["notifications"]) ?? undefined,
    archiveFolder: row.archiveFolder ?? undefined,
    lawyerPartner: row.lawyerPartner ?? undefined,
    lawyerPartnerId: row.lawyerPartnerId ?? undefined,
    checklist: (row.checklist as CaseChecklistItem[] | null) ?? undefined,
    notes: row.notes.map((n) => ({
      id: n.id,
      body: n.body,
      author: n.author,
      sharedWithCustomer: n.sharedWithCustomer,
      createdAt: n.createdAt.toISOString(),
    })),
  };
}

async function upsertCustomer(record: CaseRecord) {
  const prisma = getPrisma();
  const entityType = record.pricingMeta?.entityType ?? null;
  const preferredResultLocale = record.customer.resultLocale ?? null;
  return prisma.customer.upsert({
    where: { email: record.customer.email.toLowerCase() },
    create: {
      email: record.customer.email.toLowerCase(),
      fullName: record.customer.fullName,
      phone: record.customer.phone,
      companyName: record.customer.companyName ?? null,
      nip: record.customer.nip ?? null,
      entityType,
      preferredResultLocale,
    },
    update: {
      fullName: record.customer.fullName,
      phone: record.customer.phone,
      companyName: record.customer.companyName ?? null,
      ...(record.customer.nip ? { nip: record.customer.nip } : {}),
      ...(entityType ? { entityType } : {}),
      ...(preferredResultLocale ? { preferredResultLocale } : {}),
    },
  });
}

async function resolveCustomerForSave(record: CaseRecord) {
  const prisma = getPrisma();
  const existingCase = await prisma.case.findUnique({
    where: { id: record.id },
    select: { customerId: true },
  });
  if (existingCase) {
    return prisma.customer.findUniqueOrThrow({
      where: { id: existingCase.customerId },
    });
  }
  return upsertCustomer(record);
}

export async function saveCaseDb(record: CaseRecord): Promise<CaseRecord> {
  const prisma = getPrisma();
  const customer = await resolveCustomerForSave(record);
  const now = new Date();
  const archiveFolder =
    record.archiveFolder ??
    caseArchiveFolderName({
      paidAt: record.payment.paidAt,
      createdAt: record.createdAt,
      companyName: record.customer.companyName,
      fullName: record.customer.fullName,
      matter: record.customer.matter,
      caseId: record.id,
    });

  await prisma.case.upsert({
    where: { id: record.id },
    create: {
      id: record.id,
      customerId: customer.id,
      locale: record.locale,
      packageSlug: record.packageSlug,
      status: record.status,
      accessToken: record.accessToken,
      matter: record.customer.matter ?? null,
      resultLocale: record.customer.resultLocale ?? null,
      customerNotes: record.customer.notes ?? null,
      archiveFolder,
      lawyerPartner: record.lawyerPartner ?? null,
      lawyerPartnerId: record.lawyerPartnerId ?? null,
      checklist: (record.checklist ?? null) as Prisma.InputJsonValue,
      pricingMeta: (record.pricingMeta ?? null) as Prisma.InputJsonValue,
      payment: record.payment as unknown as Prisma.InputJsonValue,
      ...paymentColumns(record),
      notifications: (record.notifications ??
        null) as Prisma.InputJsonValue,
      createdAt: new Date(record.createdAt),
      updatedAt: now,
    },
    update: {
      customerId: customer.id,
      locale: record.locale,
      packageSlug: record.packageSlug,
      status: record.status,
      accessToken: record.accessToken,
      matter: record.customer.matter ?? null,
      resultLocale: record.customer.resultLocale ?? null,
      customerNotes: record.customer.notes ?? null,
      archiveFolder,
      lawyerPartner: record.lawyerPartner ?? null,
      lawyerPartnerId: record.lawyerPartnerId ?? null,
      checklist: (record.checklist ?? null) as Prisma.InputJsonValue,
      pricingMeta: (record.pricingMeta ?? null) as Prisma.InputJsonValue,
      payment: record.payment as unknown as Prisma.InputJsonValue,
      ...paymentColumns(record),
      notifications: (record.notifications ??
        null) as Prisma.InputJsonValue,
      updatedAt: now,
    },
  });

  // Sync documents: replace set for this case
  await prisma.caseDocument.deleteMany({ where: { caseId: record.id } });
  if (record.documents.length > 0) {
    await prisma.caseDocument.createMany({
      data: record.documents.map((d) => ({
        id: d.id,
        caseId: record.id,
        slotKey: d.slotKey,
        originalName: d.originalName,
        mime: d.mime,
        size: d.size,
        storagePath: d.storagePath,
        pageCount: d.pageCount ?? null,
        uploadedAt: new Date(d.uploadedAt),
      })),
    });
  }

  const full = await prisma.case.findUniqueOrThrow({
    where: { id: record.id },
    include: { customer: true, documents: true, notes: true },
  });
  return toRecord(full);
}

export async function getCaseDb(id: string): Promise<CaseRecord | null> {
  const prisma = getPrisma();
  const row = await prisma.case.findUnique({
    where: { id },
    include: { customer: true, documents: true, notes: true },
  });
  return row ? toRecord(row) : null;
}

export async function getCaseByAccessTokenDb(
  token: string,
): Promise<CaseRecord | null> {
  const prisma = getPrisma();
  const row = await prisma.case.findUnique({
    where: { accessToken: token },
    include: { customer: true, documents: true, notes: true },
  });
  return row ? toRecord(row) : null;
}

export async function getCaseByStripeSessionDb(
  sessionId: string,
): Promise<CaseRecord | null> {
  const prisma = getPrisma();
  const row = await prisma.case.findFirst({
    where: { stripeSessionId: sessionId },
    include: { customer: true, documents: true, notes: true },
  });
  if (row) return toRecord(row);

  const legacy = await prisma.case.findFirst({
    where: {
      payment: {
        path: ["stripeSessionId"],
        equals: sessionId,
      },
    },
    include: { customer: true, documents: true, notes: true },
  });
  return legacy ? toRecord(legacy) : null;
}

export async function listCasesDb(): Promise<CaseRecord[]> {
  const prisma = getPrisma();
  const rows = await prisma.case.findMany({
    include: { customer: true, documents: true, notes: true },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(toRecord);
}

export async function getCaseBySubscriptionIdDb(
  subscriptionId: string,
): Promise<CaseRecord | null> {
  const prisma = getPrisma();
  const byColumn = await prisma.case.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
    include: { customer: true, documents: true, notes: true },
  });
  if (byColumn) return toRecord(byColumn);

  const rows = await prisma.case.findMany({
    include: { customer: true, documents: true, notes: true },
    take: 200,
    orderBy: { updatedAt: "desc" },
  });
  for (const row of rows) {
    const payment = paymentFromRow(row);
    if (payment.stripeSubscriptionId === subscriptionId) return toRecord(row);
  }
  return null;
}

export async function listCustomerSummariesDb(): Promise<
  import("./customers").CustomerSummary[]
> {
  const prisma = getPrisma();
  const customers = await prisma.customer.findMany({
    include: {
      cases: {
        where: { status: { not: "draft" } },
        select: {
          status: true,
          packageSlug: true,
          updatedAt: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const inactive = new Set(["closed", "unpaid_archived"]);

  return customers
    .filter((c) => c.cases.length > 0)
    .map((c) => {
      const newest = c.cases.reduce((a, b) =>
        a.updatedAt >= b.updatedAt ? a : b,
      );
      return {
        key: c.email,
        email: c.email,
        fullName: c.fullName,
        phone: c.phone,
        companyName: c.companyName ?? undefined,
        caseCount: c.cases.length,
        activeCount: c.cases.filter((x) => !inactive.has(x.status)).length,
        lastUpdatedAt: newest.updatedAt.toISOString(),
        packages: [...new Set(c.cases.map((x) => x.packageSlug))],
      };
    });
}

export async function addCaseNoteDb(params: {
  caseId: string;
  body: string;
  sharedWithCustomer?: boolean;
}): Promise<CaseRecord | null> {
  const prisma = getPrisma();
  await prisma.caseNote.create({
    data: {
      caseId: params.caseId,
      body: params.body.trim(),
      sharedWithCustomer: Boolean(params.sharedWithCustomer),
    },
  });
  return getCaseDb(params.caseId);
}
