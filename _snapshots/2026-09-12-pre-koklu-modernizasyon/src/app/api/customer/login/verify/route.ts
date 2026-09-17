import { fail, ok } from "@/lib/api";
import {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  sessionCookieOptions,
} from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { consumePortalLoginToken } from "@/lib/customer-portal/login-tokens";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(16).max(128),
});

export async function POST(request: Request) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const limited = checkRateLimit(
    `cust-verify:${getClientIp(request)}`,
    20,
    15 * 60 * 1000,
  );
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many attempts"), {
      status: 429,
    });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(fail("INVALID_JSON", "Invalid body"), {
      status: 400,
    });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("VALIDATION", "Invalid token"), {
      status: 400,
    });
  }

  const consumed = await consumePortalLoginToken(parsed.data.token);
  if (!consumed) {
    return NextResponse.json(fail("INVALID_TOKEN", "Link expired or used"), {
      status: 401,
    });
  }

  let sessionToken: string;
  try {
    sessionToken = createCustomerSessionToken(consumed.customerId);
  } catch {
    return NextResponse.json(
      fail("MISCONFIGURED", "CUSTOMER_AUTH_SECRET required"),
      { status: 503 },
    );
  }

  const res = NextResponse.json(
    ok({ loggedIn: true, customerId: consumed.customerId }),
  );
  res.cookies.set(CUSTOMER_COOKIE_NAME, sessionToken, sessionCookieOptions());
  return res;
}
