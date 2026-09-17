import type { RateLimitResult } from "@/lib/rate-limit";
import {
  checkRateLimitMemory,
  peekRateLimitMemory,
} from "@/lib/rate-limit-memory";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const CLEANUP_EVERY_MS = 60 * 60 * 1000;
let lastCleanupAt = 0;

async function purgeStaleRateLimitBuckets(): Promise<void> {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_EVERY_MS) return;
  lastCleanupAt = now;
  try {
    const { getPrisma } = await import("@/lib/db");
    const prisma = getPrisma();
    await prisma.rateLimitBucket.deleteMany({
      where: {
        resetAt: { lt: new Date(now - 7 * 24 * 60 * 60 * 1000) },
      },
    });
  } catch (err) {
    console.error("[rate-limit:cleanup]", err);
  }
}

/** Atomik kota — tryClaimPeriodLetterSlot ile aynı koşullu UPDATE deseni. */
async function checkDb(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const { getPrisma } = await import("@/lib/db");
  const prisma = getPrisma();
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);

  void purgeStaleRateLimitBuckets();

  const incremented = await prisma.$executeRaw`
    UPDATE "RateLimitBucket"
    SET "count" = "count" + 1, "updatedAt" = ${now}
    WHERE "key" = ${key}
      AND "resetAt" > ${now}
      AND "count" < ${maxRequests}
  `;

  if (incremented === 1) {
    return { ok: true };
  }

  const row = await prisma.rateLimitBucket.findUnique({ where: { key } });
  if (row && row.resetAt > now && row.count >= maxRequests) {
    return {
      ok: false,
      retryAfterSec: Math.max(
        1,
        Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000),
      ),
    };
  }

  await prisma.rateLimitBucket.upsert({
    where: { key },
    create: { key, count: 1, resetAt, updatedAt: now },
    update: { count: 1, resetAt, updatedAt: now },
  });
  return { ok: true };
}

export async function checkRateLimitShared(
  key: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS,
): Promise<RateLimitResult> {
  const { isDatabaseConfigured } = await import("@/lib/db");
  if (isDatabaseConfigured()) {
    try {
      return await checkDb(key, maxRequests, windowMs);
    } catch (err) {
      console.error("[rate-limit:db]", err);
    }
  }
  return checkRateLimitMemory(key, maxRequests, windowMs);
}

/** Başarısız panel girişi — global kilit (IP bypass'a karşı). */
export async function recordPanelLoginFailure(): Promise<RateLimitResult> {
  return checkRateLimitShared("panel-login-global-fail", 20, 15 * 60 * 1000);
}

export async function isPanelLoginGloballyLocked(): Promise<RateLimitResult> {
  const { isDatabaseConfigured } = await import("@/lib/db");
  if (!isDatabaseConfigured()) {
    return peekRateLimitMemory("panel-login-global-fail", 20);
  }
  try {
    const { getPrisma } = await import("@/lib/db");
    const prisma = getPrisma();
    const now = new Date();
    const row = await prisma.rateLimitBucket.findUnique({
      where: { key: "panel-login-global-fail" },
    });
    if (row && row.resetAt > now && row.count >= 20) {
      return {
        ok: false,
        retryAfterSec: Math.max(
          1,
          Math.ceil((row.resetAt.getTime() - now.getTime()) / 1000),
        ),
      };
    }
    return { ok: true };
  } catch {
    return { ok: true };
  }
}
