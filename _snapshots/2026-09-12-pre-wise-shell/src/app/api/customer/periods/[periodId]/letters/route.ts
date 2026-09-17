import { fail, ok } from "@/lib/api";
import { aylikOverageAmountCents, getPackageCurrency } from "@/lib/cases/pricing";
import { getCustomerSessionId } from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import {
  resolveActivePeriodId,
  submitPeriodLetter,
} from "@/lib/customer-portal/period-letters";
import { getPublicEnv } from "@/lib/env";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ periodId: string }> };

export async function POST(request: Request, ctx: Ctx) {
  if (!isCustomerPortalEnabled()) {
    return NextResponse.json(
      fail("UNAVAILABLE", "Customer portal requires database"),
      { status: 503 },
    );
  }

  const customerId = await getCustomerSessionId();
  if (!customerId) {
    return NextResponse.json(fail("UNAUTHORIZED", "Not signed in"), {
      status: 401,
    });
  }

  const limited = checkRateLimit(`cust-letter:${getClientIp(request)}`, 15);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many uploads"), {
      status: 429,
    });
  }

  const { periodId } = await ctx.params;
  const resolved = await resolveActivePeriodId(customerId, periodId);
  if (!resolved) {
    return NextResponse.json(fail("NO_PERIOD", "No active period"), {
      status: 400,
    });
  }

  const form = await request.formData();
  const file = form.get("file");
  const locale = String(form.get("locale") ?? "tr").slice(0, 5);

  if (!(file instanceof File)) {
    return NextResponse.json(fail("NO_FILE", "File required"), {
      status: 400,
    });
  }

  const result = await submitPeriodLetter({
    customerId,
    periodId: resolved,
    file,
    locale,
  });

  if (!result.ok) {
    if (result.code === "OVERAGE_REQUIRED" && "periodId" in result) {
      return NextResponse.json(
        fail("OVERAGE_REQUIRED", "Quota exceeded — pay for extra letter", {
          periodId: result.periodId,
        }),
        { status: 402 },
      );
    }
    return NextResponse.json(
      fail(result.code, "message" in result ? result.message : "Error"),
      { status: 400 },
    );
  }

  return NextResponse.json(
    ok({
      caseId: result.caseId,
      accessToken: result.accessToken,
      remaining: result.remaining,
    }),
  );
}
