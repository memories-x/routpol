import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import type { Prisma } from "@prisma/client";

const MAX_ATTEMPTS = 5;

export async function enqueueOutbox(
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!isDatabaseConfigured()) {
    await processOutboxInline(type, payload);
    return;
  }
  const prisma = getPrisma();
  await prisma.outboxMessage.create({
    data: { type, payload: payload as Prisma.InputJsonValue },
  });
}

async function processOutboxInline(
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    await dispatchOutbox(type, payload);
  } catch (err) {
    console.error("[outbox:inline]", type, err);
  }
}

async function dispatchOutbox(
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  if (type === "case_paid_mail") {
    const caseId = payload.caseId;
    if (typeof caseId !== "string") return;
    const { getCase, saveCase } = await import("@/lib/cases/store");
    const { sendCaseCustomerMail } = await import("@/lib/mail/case-customer-mail");
    const record = await getCase(caseId);
    if (!record) return;
    await sendCaseCustomerMail(record, "paid_link");
    record.notifications = {
      ...record.notifications,
      paidLinkSentAt: new Date().toISOString(),
    };
    await saveCase(record);
    return;
  }
  throw new Error(`Unknown outbox type: ${type}`);
}

export async function processOutboxBatch(limit = 20): Promise<{ processed: number }> {
  if (!isDatabaseConfigured()) return { processed: 0 };
  const prisma = getPrisma();
  const pending = await prisma.outboxMessage.findMany({
    where: { sentAt: null, attempts: { lt: MAX_ATTEMPTS } },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  let processed = 0;
  for (const msg of pending) {
    try {
      await dispatchOutbox(msg.type, msg.payload as Record<string, unknown>);
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: { sentAt: new Date(), lastError: null },
      });
      processed += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await prisma.outboxMessage.update({
        where: { id: msg.id },
        data: {
          attempts: msg.attempts + 1,
          lastError: message.slice(0, 500),
        },
      });
    }
  }
  return { processed };
}

export async function listFailedOutboxMessages(limit = 20) {
  if (!isDatabaseConfigured()) return [];
  const prisma = getPrisma();
  return prisma.outboxMessage.findMany({
    where: { sentAt: null, attempts: { gte: MAX_ATTEMPTS } },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      type: true,
      attempts: true,
      lastError: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
