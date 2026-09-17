import { fail, ok } from "@/lib/api";
import {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  sessionCookieOptions,
} from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { normalizeRegister } from "@/lib/customer-portal/membership";
import { registerCustomer } from "@/lib/customer-portal/membership-service";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const limited = await checkRateLimitAsync(`cust-register-ip:${ip}`, 8);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many attempts"), {
      status: 429,
      headers: { "Retry-After": String(limited.retryAfterSec) },
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

  const parsed = normalizeRegister(
    json && typeof json === "object" ? (json as Record<string, unknown>) : {},
  );
  if (!parsed.ok) {
    return NextResponse.json(fail("VALIDATION", parsed.message), {
      status: 400,
    });
  }

  try {
    const result = await registerCustomer(parsed.data);
    if (!result.ok) {
      return NextResponse.json(fail("AUTH_FAILED", result.message), {
        status: 401,
      });
    }
    let sessionToken: string;
    try {
      sessionToken = createCustomerSessionToken(result.customerId);
    } catch {
      return NextResponse.json(
        fail("MISCONFIGURED", "CUSTOMER_AUTH_SECRET required"),
        { status: 503 },
      );
    }
    const res = NextResponse.json(
      ok({ loggedIn: true, customerId: result.customerId }),
    );
    res.cookies.set(CUSTOMER_COOKIE_NAME, sessionToken, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[customer/register]", err);
    return NextResponse.json(fail("ERROR", "Could not complete"), {
      status: 500,
    });
  }
}
