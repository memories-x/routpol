import { fail, ok } from "@/lib/api";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { handlePortalLoginRequest } from "@/lib/services/portal-login-request";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(120),
  locale: z.string().min(2).max(5).optional(),
});

/** Always returns success — no email enumeration */
export async function POST(request: Request) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const limitedIp = await checkRateLimitAsync(`cust-login-ip:${ip}`, 8);
  if (!limitedIp.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many attempts"), {
      status: 429,
      headers: { "Retry-After": String(limitedIp.retryAfterSec) },
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
    return NextResponse.json(fail("VALIDATION", "Valid email required"), {
      status: 400,
    });
  }

  const email = parsed.data.email.toLowerCase();
  const limitedEmail = await checkRateLimitAsync(
    `cust-login-email:${email}`,
    3,
    60 * 60 * 1000,
  );
  if (!limitedEmail.ok) {
    return NextResponse.json(
      ok({ sent: true, message: "If registered, a link was sent." }),
    );
  }

  try {
    const result = await handlePortalLoginRequest({
      email,
      locale: parsed.data.locale,
      requestIp: ip,
    });
    return NextResponse.json(ok(result));
  } catch (err) {
    console.error("[customer/login/request]", err);
    return NextResponse.json(
      ok({ sent: true, message: "If registered, a link was sent." }),
    );
  }
}
