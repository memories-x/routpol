import { checkRateLimitMemory } from "@/lib/rate-limit-memory";
import { resolveClientIpFromHeaders } from "@/lib/rate-limit-ip";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

/** Sync — process-local only. DB-backed limits: `checkRateLimitAsync`. */
export function checkRateLimit(
  key: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS,
): RateLimitResult {
  return checkRateLimitMemory(key, maxRequests, windowMs);
}

export async function checkRateLimitAsync(
  key: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS,
): Promise<RateLimitResult> {
  const { isDatabaseConfigured } = await import("@/lib/db");
  if (isDatabaseConfigured()) {
    const { checkRateLimitShared } = await import("@/lib/rate-limit-shared");
    return checkRateLimitShared(key, maxRequests, windowMs);
  }
  return checkRateLimitMemory(key, maxRequests, windowMs);
}

export function getClientIp(request: Request): string {
  return resolveClientIpFromHeaders(request.headers);
}
