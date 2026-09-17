import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { checkGoliveConfig } from "@/lib/golive";
import { listFailedOutboxMessages } from "@/lib/outbox";

export async function getPanelOpsStats() {
  const golive = checkGoliveConfig();
  if (!isDatabaseConfigured()) {
    return {
      goliveOk: golive.ok,
      missing: golive.missing,
      outboxFailed: 0,
      outboxPending: 0,
      analyticsLast7d: 0,
      failedOutbox: [] as Awaited<ReturnType<typeof listFailedOutboxMessages>>,
    };
  }
  const prisma = getPrisma();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [outboxFailed, outboxPending, analyticsLast7d, failedOutbox] =
    await Promise.all([
    prisma.outboxMessage.count({
      where: { sentAt: null, attempts: { gte: 5 } },
    }),
    prisma.outboxMessage.count({
      where: { sentAt: null, attempts: { lt: 5 } },
    }),
    prisma.analyticsEvent.count({
      where: { createdAt: { gte: since } },
    }),
    listFailedOutboxMessages(10),
  ]);
  return {
    goliveOk: golive.ok,
    missing: golive.missing,
    outboxFailed,
    outboxPending,
    analyticsLast7d,
    failedOutbox,
  };
}
