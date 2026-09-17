import { fail, ok } from "@/lib/api";
import {
  PANEL_COOKIE_NAME,
  createPanelSessionTokenAsync,
} from "@/lib/panel-auth";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import {
  isPanelLoginGloballyLocked,
  recordPanelLoginFailure,
} from "@/lib/rate-limit-shared";
import { writeAuditLog } from "@/lib/audit-log";
import { verifyPanelLoginPassword } from "@/lib/panel-user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const globalLock = await isPanelLoginGloballyLocked();
  if (!globalLock.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Panel login temporarily locked"), {
      status: 429,
      headers: { "Retry-After": String(globalLock.retryAfterSec) },
    });
  }

  const limited = await checkRateLimitAsync(
    `panel-login:${getClientIp(request)}`,
    10,
  );
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
    return NextResponse.json(fail("VALIDATION", "Password required"), {
      status: 400,
    });
  }

  if (!(await verifyPanelLoginPassword(parsed.data.password))) {
    await recordPanelLoginFailure();
    await writeAuditLog({
      action: "panel_login_failed",
      ip: getClientIp(request),
    });
    return NextResponse.json(fail("UNAUTHORIZED", "Wrong password"), {
      status: 401,
    });
  }

  await writeAuditLog({
    action: "panel_login_success",
    ip: getClientIp(request),
  });

  let token: string;
  try {
    token = await createPanelSessionTokenAsync();
  } catch {
    return NextResponse.json(
      fail("MISCONFIGURED", "PANEL_AUTH_SECRET required"),
      { status: 503 },
    );
  }

  const res = NextResponse.json(ok({ loggedIn: true }));
  res.cookies.set(PANEL_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
