import { ok } from "@/lib/api";
import { checkGoliveConfig } from "@/lib/golive";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const golive = checkGoliveConfig();
  let dbOk = false;
  let outboxFailed = 0;

  if (isDatabaseConfigured()) {
    try {
      const prisma = getPrisma();
      await prisma.$queryRaw`SELECT 1`;
      dbOk = true;
      outboxFailed = await prisma.outboxMessage.count({
        where: { sentAt: null, attempts: { gte: 5 } },
      });
    } catch {
      dbOk = false;
    }
  }

  const healthy = golive.ok && (!isDatabaseConfigured() || dbOk);
  return NextResponse.json(
    ok({
      status: healthy ? "ok" : "degraded",
      db: dbOk,
      goliveOk: golive.ok,
      missing: golive.missing,
      outboxFailed,
      version: process.env.npm_package_version ?? "0.1.0",
    }),
    { status: healthy ? 200 : 503 },
  );
}
