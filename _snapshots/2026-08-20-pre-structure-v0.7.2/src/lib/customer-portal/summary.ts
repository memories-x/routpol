import { SONUC_SLOT } from "@/lib/cases/document-slots";
import { getPrisma } from "@/lib/db";
import { getActivePeriodForCustomer } from "./subscription-period";

export type PortalCaseRow = {
  id: string;
  packageSlug: string;
  status: string;
  matter: string | null;
  updatedAt: string;
  accessToken: string;
  locale: string;
  hasResult: boolean;
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
      accessToken: true,
      locale: true,
      documents: {
        where: { slotKey: SONUC_SLOT },
        select: { id: true },
        take: 1,
      },
    },
  });

  return rows.map((r) => ({
    id: r.id,
    packageSlug: r.packageSlug,
    status: r.status,
    matter: r.matter,
    updatedAt: r.updatedAt.toISOString(),
    accessToken: r.accessToken,
    locale: r.locale,
    hasResult: r.documents.length > 0,
  }));
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
