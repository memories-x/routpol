import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export async function writeAuditLog(params: {
  action: string;
  actor?: string;
  caseId?: string;
  docId?: string;
  ip?: string;
  meta?: Record<string, unknown>;
}): Promise<void> {
  if (!isDatabaseConfigured()) return;
  try {
    const prisma = getPrisma();
    await prisma.auditLog.create({
      data: {
        action: params.action,
        actor: params.actor ?? "panel",
        caseId: params.caseId ?? null,
        docId: params.docId ?? null,
        ip: params.ip ?? null,
        meta: (params.meta ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (err) {
    console.error("[audit-log]", err);
  }
}
