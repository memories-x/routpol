import { fail, ok } from "@/lib/api";
import { getCase, markCasePaid } from "@/lib/cases/store";
import { monthlyPackageBlock } from "@/lib/customer-portal/purchase-guard";
import { isStripeConfigured } from "@/lib/stripe";
import { secureCompare } from "@/lib/secure-compare";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

/** Local-only payment simulation when Stripe keys are absent. */
export async function POST(request: Request, ctx: Ctx) {
  if (process.env.NODE_ENV === "production" && isStripeConfigured()) {
    return NextResponse.json(fail("FORBIDDEN", "Not available"), {
      status: 403,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Case not found"), {
      status: 404,
    });
  }

  const token = request.headers.get("x-case-token");
  if (!token || !secureCompare(token, record.accessToken)) {
    return NextResponse.json(fail("UNAUTHORIZED", "Invalid token"), {
      status: 401,
    });
  }

  if (record.packageSlug === "aylik-paket") {
    const blocked = await monthlyPackageBlock(record.customer.email);
    if (blocked) {
      return NextResponse.json(fail(blocked.code, blocked.message), {
        status: 409,
      });
    }
  }

  const paid = await markCasePaid(id);
  return NextResponse.json(ok({ id: paid?.id, status: paid?.status }));
}
