import { getPrisma } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/db";
import { periodRemaining } from "./subscription-period";

export type PanelActivePeriod = {
  id: string;
  customerName: string;
  customerEmail: string;
  quota: number;
  usedCount: number;
  overageCredits: number;
  remaining: number;
  periodEnd: string;
};

export async function listActivePeriodsForPanel(): Promise<PanelActivePeriod[]> {
  if (!isDatabaseConfigured()) return [];

  const prisma = getPrisma();
  const now = new Date();
  const rows = await prisma.subscriptionPeriod.findMany({
    where: {
      status: "active",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
    include: {
      customer: { select: { fullName: true, email: true } },
    },
    orderBy: { periodEnd: "asc" },
    take: 20,
  });

  return rows.map((r) => ({
    id: r.id,
    customerName: r.customer.fullName,
    customerEmail: r.customer.email,
    quota: r.quota,
    usedCount: r.usedCount,
    overageCredits: r.overageCredits,
    remaining: periodRemaining(r),
    periodEnd: r.periodEnd.toISOString(),
  }));
}
