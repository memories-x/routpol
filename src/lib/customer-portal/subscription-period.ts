import { getPrisma } from "@/lib/db";
import { MEKTUP_SLOT } from "@/lib/cases/document-slots";
import type { CaseRecord } from "@/lib/cases/types";
import { computePeriodWindow, PERIOD_DAYS } from "@/lib/customer-portal/period-planning";

const LIVE_STATUSES = ["active", "queued"] as const;

export type SubscriptionPeriodView = {
  id: string;
  quota: number;
  usedCount: number;
  overageCredits: number;
  remaining: number;
  periodStart: string;
  periodEnd: string;
  status: string;
  anchorCaseId: string | null;
};

type PeriodRow = {
  id: string;
  quota: number;
  usedCount: number;
  overageCredits: number;
  periodStart: Date;
  periodEnd: Date;
  status: string;
  anchorCaseId: string | null;
};

export function periodRemaining(params: {
  quota: number;
  usedCount: number;
  overageCredits: number;
}): number {
  return Math.max(
    0,
    params.quota + params.overageCredits - params.usedCount,
  );
}

function mapPeriod(row: PeriodRow): SubscriptionPeriodView {
  return {
    id: row.id,
    quota: row.quota,
    usedCount: row.usedCount,
    overageCredits: row.overageCredits,
    remaining: periodRemaining(row),
    periodStart: row.periodStart.toISOString(),
    periodEnd: row.periodEnd.toISOString(),
    status: row.status,
    anchorCaseId: row.anchorCaseId,
  };
}

/** En geç bitiş — active + queued unfinished dönemler. */
export async function getLatestUnfinishedPeriodEnd(
  customerId: string,
): Promise<Date | null> {
  const prisma = getPrisma();
  const now = new Date();
  const row = await prisma.subscriptionPeriod.findFirst({
    where: {
      customerId,
      status: { in: [...LIVE_STATUSES] },
      periodEnd: { gt: now },
    },
    orderBy: { periodEnd: "desc" },
    select: { periodEnd: true },
  });
  return row?.periodEnd ?? null;
}

async function restackQueuedPeriods(customerId: string, now: Date): Promise<void> {
  const prisma = getPrisma();
  const live = await prisma.subscriptionPeriod.findFirst({
    where: {
      customerId,
      status: "active",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
  });

  const queued = await prisma.subscriptionPeriod.findMany({
    where: {
      customerId,
      status: "queued",
      periodEnd: { gt: now },
    },
    orderBy: { periodStart: "asc" },
  });

  let chainStart: Date | null = live ? live.periodEnd : null;
  for (const q of queued) {
    if (!chainStart) {
      chainStart = q.periodEnd;
      continue;
    }
    const newStart = new Date(chainStart);
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + PERIOD_DAYS);
    if (
      q.periodStart.getTime() !== newStart.getTime() ||
      q.periodEnd.getTime() !== newEnd.getTime()
    ) {
      await prisma.subscriptionPeriod.update({
        where: { id: q.id },
        data: { periodStart: newStart, periodEnd: newEnd },
      });
    }
    chainStart = newEnd;
  }
}

/** Bitmiş dönemleri ended; kuyruktakini zamanı gelince active. */
export async function reconcileCustomerPeriods(
  customerId: string,
): Promise<void> {
  const prisma = getPrisma();
  const now = new Date();

  await prisma.subscriptionPeriod.updateMany({
    where: {
      customerId,
      status: { in: [...LIVE_STATUSES] },
      periodEnd: { lte: now },
    },
    data: { status: "ended", pendingOverageSessionId: null },
  });

  const queued = await prisma.subscriptionPeriod.findMany({
    where: {
      customerId,
      status: "queued",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
    orderBy: { periodStart: "asc" },
  });

  const live = await prisma.subscriptionPeriod.findFirst({
    where: {
      customerId,
      status: "active",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
  });

  if (!live && queued[0]) {
    await prisma.subscriptionPeriod.update({
      where: { id: queued[0].id },
      data: { status: "active" },
    });
  }

  const overlapping = await prisma.subscriptionPeriod.findMany({
    where: {
      customerId,
      status: "active",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
    orderBy: { periodEnd: "desc" },
  });
  if (overlapping.length > 1) {
    const [keep, ...rest] = overlapping;
    let stackedStart = keep.periodEnd;
    for (const p of rest) {
      const stackedEnd = new Date(stackedStart);
      stackedEnd.setDate(stackedEnd.getDate() + PERIOD_DAYS);
      await prisma.subscriptionPeriod.update({
        where: { id: p.id },
        data: {
          status: "queued",
          periodStart: stackedStart,
          periodEnd: stackedEnd,
        },
      });
      stackedStart = stackedEnd;
    }
  }

  await restackQueuedPeriods(customerId, now);
}

export async function getActivePeriodForCustomer(
  customerId: string,
): Promise<SubscriptionPeriodView | null> {
  await reconcileCustomerPeriods(customerId);
  const prisma = getPrisma();
  const now = new Date();
  const row = await prisma.subscriptionPeriod.findFirst({
    where: {
      customerId,
      status: "active",
      periodStart: { lte: now },
      periodEnd: { gt: now },
    },
    orderBy: { periodEnd: "desc" },
  });
  return row ? mapPeriod(row) : null;
}

export async function getQueuedPeriodForCustomer(
  customerId: string,
): Promise<SubscriptionPeriodView | null> {
  await reconcileCustomerPeriods(customerId);
  const prisma = getPrisma();
  const now = new Date();
  const row = await prisma.subscriptionPeriod.findFirst({
    where: {
      customerId,
      status: "queued",
      periodEnd: { gt: now },
    },
    orderBy: { periodStart: "asc" },
  });
  return row ? mapPeriod(row) : null;
}

/** Satın almayı kilitleyen dönem: canlı veya kuyrukta (bitmemiş). */
export async function getBlockingPeriodForCustomer(
  customerId: string,
): Promise<SubscriptionPeriodView | null> {
  await reconcileCustomerPeriods(customerId);
  const live = await getActivePeriodForCustomer(customerId);
  if (live) return live;
  return getQueuedPeriodForCustomer(customerId);
}

export async function getBlockingPeriodForEmail(
  email: string,
): Promise<SubscriptionPeriodView | null> {
  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true },
  });
  if (!customer) return null;
  return getBlockingPeriodForCustomer(customer.id);
}

export async function getPeriodByIdForCustomer(
  periodId: string,
  customerId: string,
): Promise<SubscriptionPeriodView | null> {
  await reconcileCustomerPeriods(customerId);
  const prisma = getPrisma();
  const row = await prisma.subscriptionPeriod.findFirst({
    where: { id: periodId, customerId },
  });
  return row ? mapPeriod(row) : null;
}

export function periodIsLive(period: SubscriptionPeriodView, now = new Date()): boolean {
  return (
    period.status === "active" &&
    new Date(period.periodStart) <= now &&
    new Date(period.periodEnd) > now
  );
}

export async function createPeriodFromPaidCase(
  record: CaseRecord,
): Promise<SubscriptionPeriodView | null> {
  if (record.packageSlug !== "aylik-paket") return null;

  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { email: record.customer.email.toLowerCase() },
  });
  if (!customer) return null;

  const existing = await prisma.subscriptionPeriod.findFirst({
    where: { anchorCaseId: record.id },
  });
  if (existing) {
    return mapPeriod(existing);
  }

  await reconcileCustomerPeriods(customer.id);

  const quota = record.pricingMeta?.fileQuota ?? 4;
  const paidAt = new Date(record.payment.paidAt ?? record.updatedAt);
  const latestEnd = await getLatestUnfinishedPeriodEnd(customer.id);

  const window = computePeriodWindow({
    paidAt,
    latestUnfinishedEnd: latestEnd,
  });
  const start = window.start;
  const end = window.end;
  const status = window.status;

  const initialUsed = record.documents.filter(
    (d) => d.slotKey === MEKTUP_SLOT,
  ).length;

  try {
    const period = await prisma.subscriptionPeriod.create({
      data: {
        customerId: customer.id,
        packageSlug: "aylik-paket",
        quota,
        usedCount: Math.max(1, initialUsed),
        periodStart: start,
        periodEnd: end,
        status,
        anchorCaseId: record.id,
        stripeSubscriptionId: record.payment.stripeSubscriptionId ?? null,
      },
    });

    await prisma.case.update({
      where: { id: record.id },
      data: { subscriptionPeriodId: period.id },
    });

    return mapPeriod(period);
  } catch (err) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    if (code === "P2002") {
      const again = await prisma.subscriptionPeriod.findFirst({
        where: { anchorCaseId: record.id },
      });
      return again ? mapPeriod(again) : null;
    }
    throw err;
  }
}

/** Stripe abonelik yenilemesi — yeni Case yok; invoice id ile tek sefer. */
export async function createPeriodFromSubscriptionRenewal(params: {
  email: string;
  quota: number;
  stripeInvoiceId: string;
  stripeSubscriptionId: string;
  paidAt: Date;
}): Promise<SubscriptionPeriodView | null> {
  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { email: params.email.toLowerCase().trim() },
  });
  if (!customer) return null;

  const existing = await prisma.subscriptionPeriod.findFirst({
    where: { stripeInvoiceId: params.stripeInvoiceId },
  });
  if (existing) return mapPeriod(existing);

  await reconcileCustomerPeriods(customer.id);

  const quota = Math.max(4, Math.min(24, Math.floor(params.quota)));
  const latestEnd = await getLatestUnfinishedPeriodEnd(customer.id);
  const window = computePeriodWindow({
    paidAt: params.paidAt,
    latestUnfinishedEnd: latestEnd,
  });

  try {
    const period = await prisma.subscriptionPeriod.create({
      data: {
        customerId: customer.id,
        packageSlug: "aylik-paket",
        quota,
        usedCount: 0,
        periodStart: window.start,
        periodEnd: window.end,
        status: window.status,
        stripeInvoiceId: params.stripeInvoiceId,
        stripeSubscriptionId: params.stripeSubscriptionId,
      },
    });
    return mapPeriod(period);
  } catch (err) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    if (code === "P2002") {
      const again = await prisma.subscriptionPeriod.findFirst({
        where: { stripeInvoiceId: params.stripeInvoiceId },
      });
      return again ? mapPeriod(again) : null;
    }
    throw err;
  }
}

export async function addOverageCredit(periodId: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.subscriptionPeriod.update({
    where: { id: periodId },
    data: { overageCredits: { increment: 1 } },
  });
}

/**
 * Stripe webhook tekrarı: aynı sessionId ikinci kez kredi yazmaz.
 * Dönem bitmişse kredi uygulanmaz (makbuz yine yazılır).
 */
export async function addOverageCreditFromStripe(params: {
  periodId: string;
  stripeSessionId: string;
}): Promise<"applied" | "duplicate" | "period_inactive"> {
  const prisma = getPrisma();
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.stripeCheckoutReceipt.create({
        data: {
          sessionId: params.stripeSessionId,
          kind: "overage",
          periodId: params.periodId,
        },
      });

      const period = await tx.subscriptionPeriod.findUnique({
        where: { id: params.periodId },
      });
      const now = new Date();
      if (
        !period ||
        period.status === "ended" ||
        period.periodEnd <= now
      ) {
        return "period_inactive" as const;
      }

      await tx.subscriptionPeriod.update({
        where: { id: params.periodId },
        data: { overageCredits: { increment: 1 } },
      });
      return "applied" as const;
    });
  } catch (err) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    if (code === "P2002") return "duplicate";
    throw err;
  }
}

/** Kota yarışı: remaining kontrolü + increment tek UPDATE. */
export async function tryClaimPeriodLetterSlot(params: {
  periodId: string;
  customerId: string;
}): Promise<boolean> {
  const prisma = getPrisma();
  const n = await prisma.$executeRaw`
    UPDATE "SubscriptionPeriod"
    SET "usedCount" = "usedCount" + 1, "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = ${params.periodId}
      AND "customerId" = ${params.customerId}
      AND "status" = 'active'
      AND "periodStart" <= CURRENT_TIMESTAMP
      AND "periodEnd" > CURRENT_TIMESTAMP
      AND "usedCount" < "quota" + "overageCredits"
  `;
  return n === 1;
}

export async function releasePeriodLetterSlot(periodId: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.subscriptionPeriod.updateMany({
    where: { id: periodId, usedCount: { gt: 0 } },
    data: { usedCount: { decrement: 1 } },
  });
}

export async function setPendingOverageSession(
  periodId: string,
  sessionId: string,
): Promise<void> {
  const prisma = getPrisma();
  await prisma.subscriptionPeriod.update({
    where: { id: periodId },
    data: { pendingOverageSessionId: sessionId },
  });
}

export async function clearPendingOverageSession(periodId: string): Promise<void> {
  const prisma = getPrisma();
  await prisma.subscriptionPeriod.updateMany({
    where: { id: periodId },
    data: { pendingOverageSessionId: null },
  });
}

export async function getPendingOverageSessionId(
  periodId: string,
): Promise<string | null> {
  const prisma = getPrisma();
  const row = await prisma.subscriptionPeriod.findUnique({
    where: { id: periodId },
    select: { pendingOverageSessionId: true },
  });
  return row?.pendingOverageSessionId ?? null;
}
