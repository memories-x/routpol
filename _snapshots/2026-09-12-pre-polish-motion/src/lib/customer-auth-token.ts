import { createHmac, timingSafeEqual } from "crypto";

export const CUSTOMER_COOKIE_NAME = "pt_customer_session";

const LOGIN_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function secret(): string {
  const value = process.env.CUSTOMER_AUTH_SECRET;
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CUSTOMER_AUTH_SECRET is required in production");
    }
    return "dev-customer-secret-change-me";
  }
  return value;
}

export function loginTokenTtlMs(): number {
  return LOGIN_TTL_MS;
}

export function createCustomerSessionToken(customerId: string): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `cid=${customerId}&exp=${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyCustomerSessionToken(
  token: string | undefined,
): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  const cidMatch = payload.match(/^cid=([^&]+)&exp=(\d+)$/);
  if (!cidMatch) return null;
  const exp = Number(cidMatch[2]);
  if (!Number.isFinite(exp) || exp <= Date.now()) return null;
  return cidMatch[1] ?? null;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
