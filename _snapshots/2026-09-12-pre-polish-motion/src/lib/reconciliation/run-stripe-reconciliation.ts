import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { findCheckoutReceiptGaps } from "@/lib/reconciliation/stripe-cases";

export async function reconcileStripeCaseReceipts(): Promise<{
  paidWithoutReceipt: string[];
  receiptWithoutPaidCase: string[];
}> {
  if (!isDatabaseConfigured()) {
    return { paidWithoutReceipt: [], receiptWithoutPaidCase: [] };
  }

  const prisma = getPrisma();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const paidCases = await prisma.case.findMany({
    where: {
      updatedAt: { gte: since },
      status: { in: ["paid", "in_progress", "closed"] },
    },
    select: { id: true, stripeSessionId: true, payment: true },
    take: 500,
  });

  const rows = paidCases.map((c) => ({
    id: c.id,
    stripeSessionId:
      c.stripeSessionId ??
      ((c.payment as { stripeSessionId?: string } | null)?.stripeSessionId ??
        null),
  }));

  const receipts = await prisma.caseCheckoutReceipt.findMany({
    where: { createdAt: { gte: since } },
    select: { sessionId: true },
  });

  return findCheckoutReceiptGaps({
    paidCases: rows,
    receiptSessionIds: new Set(receipts.map((r) => r.sessionId)),
  });
}
