import { fail, ok } from "@/lib/api";
import { PANEL_COOKIE_NAME } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(ok({ loggedOut: true }));
  res.cookies.set(PANEL_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function GET() {
  return NextResponse.json(fail("METHOD", "Use POST"), { status: 405 });
}
