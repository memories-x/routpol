import { ok } from "@/lib/api";
import { CUSTOMER_COOKIE_NAME, sessionCookieOptions } from "@/lib/customer-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(ok({ loggedOut: true }));
  res.cookies.set(CUSTOMER_COOKIE_NAME, "", {
    ...sessionCookieOptions(),
    maxAge: 0,
  });
  return res;
}
