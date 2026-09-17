import { fail, ok } from "@/lib/api";
import { getCustomerBundle } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ key: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { key } = await ctx.params;
  const bundle = await getCustomerBundle(key);
  if (!bundle) {
    return NextResponse.json(fail("NOT_FOUND", "Customer not found"), {
      status: 404,
    });
  }

  return NextResponse.json(ok(bundle));
}
