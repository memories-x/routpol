import { fail, ok } from "@/lib/api";
import {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  sessionCookieOptions,
} from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { loginCustomerPassword } from "@/lib/customer-portal/membership-service";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(120),
  password: z.string().min(1).max(72),
});

export async function POST(request: Request) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const limited = await checkRateLimitAsync(`cust-pw-login-ip:${ip}`, 12);
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

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("AUTH_FAILED", "Invalid email or password"), {
      status: 401,
    });
  }

  const email = parsed.data.email.toLowerCase();
  const limitedEmail = await checkRateLimitAsync(
    `cust-pw-login-email:${email}`,
    8,
    60 * 60 * 1000,
  );
  if (!limitedEmail.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many attempts"), {
      status: 429,
    });
  }

  try {
    const result = await loginCustomerPassword({
      email,
      password: parsed.data.password,
    });
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
    console.error("[customer/login/password]", err);
    return NextResponse.json(fail("AUTH_FAILED", "Invalid email or password"), {
      status: 401,
    });
  }
}
