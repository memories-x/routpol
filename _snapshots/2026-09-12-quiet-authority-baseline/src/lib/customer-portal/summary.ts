import { EK_FORM_SLOT, MEKTUP_SLOT, SONUC_SLOT } from "@/lib/cases/document-slots";
import { getPrisma } from "@/lib/db";
import { getActivePeriodForCustomer } from "./subscription-period";

export type PortalCaseRow = {
  id: string;
  packageSlug: string;
  status: string;
  matter: string | null;
  updatedAt: string;
  createdAt: string;
  accessToken: string;
  locale: string;
  hasResult: boolean;
  hasLetter: boolean;
  amountCents: number;
  currency: string;
  callRequestedAt?: string | null;
};

export type PortalSummary = {
  inProgress: number;
  ready: number;
  total: number;
  periodRemaining: number | null;
};

export async function listAllCustomerCasesForPortal(
  customerId: string,
): Promise<PortalCaseRow[]> {
  const prisma = getPrisma();
  const rows = await prisma.case.findMany({
    where: {
      customerId,
      status: { notIn: ["draft", "unpaid_archived"] },
    },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      packageSlug: true,
      status: true,
      matter: true,
      updatedAt: true,
      createdAt: true,
      accessToken: true,
      locale: true,
      paymentAmountCents: true,
      paymentCurrency: true,
      pricingMeta: true,
      documents: {
        where: {
          slotKey: { in: [SONUC_SLOT, MEKTUP_SLOT, EK_FORM_SLOT] },
        },
        select: { id: true, slotKey: true },
      },
    },
  });

  return rows.map((r) => {
    const meta = (r.pricingMeta ?? null) as {
      callRequestedAt?: string;
    } | null;
    return {
      id: r.id,
      packageSlug: r.packageSlug,
      status: r.status,
      matter: r.matter,
      updatedAt: r.updatedAt.toISOString(),
      createdAt: r.createdAt.toISOString(),
      accessToken: r.accessToken,
      locale: r.locale,
      hasResult: r.documents.some((d) => d.slotKey === SONUC_SLOT),
      hasLetter: r.documents.some(
        (d) => d.slotKey === MEKTUP_SLOT || d.slotKey === EK_FORM_SLOT,
      ),
      amountCents: r.paymentAmountCents,
      currency: r.paymentCurrency,
      callRequestedAt: meta?.callRequestedAt ?? null,
    };
  });
}

export async function getCustomerPortalSummary(
  customerId: string,
): Promise<PortalSummary> {
  const cases = await listAllCustomerCasesForPortal(customerId);
  let inProgress = 0;
  let ready = 0;

  for (const c of cases) {
    if (c.hasResult) {
      ready += 1;
    } else if (c.status === "paid" || c.status === "in_progress") {
      inProgress += 1;
    }
  }

  const period = await getActivePeriodForCustomer(customerId);

  return {
    inProgress,
    ready,
    total: cases.length,
    periodRemaining: period?.remaining ?? null,
  };
}
