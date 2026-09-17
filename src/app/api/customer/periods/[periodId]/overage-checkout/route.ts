import { fail, ok } from "@/lib/api";
import {
  aylikOverageAmountCents,
  getPackageCurrency,
} from "@/lib/cases/pricing";
import { getCustomerSessionId } from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { getCustomerById } from "@/lib/customer-portal/login-tokens";
import {
  getPeriodByIdForCustomer,
  getPendingOverageSessionId,
  periodIsLive,
  periodRemaining,
  setPendingOverageSession,
} from "@/lib/customer-portal/subscription-period";
import { getPublicEnv } from "@/lib/env";
import { assertProductionReady, isProductionRuntime } from "@/lib/golive";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ periodId: string }> };

export async function POST(request: Request, ctx: Ctx) {
  try {
    if (isProductionRuntime()) assertProductionReady("checkout");
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      fail("PRODUCTION_MISCONFIGURED", "Service temporarily unavailable"),
      { status: 503 },
    );
  }

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

  const limited = await checkRateLimitAsync(`cust-overage:${getClientIp(request)}`, 10);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many attempts"), {
      status: 429,
    });
  }

  const { periodId } = await ctx.params;
  const period = await getPeriodByIdForCustomer(periodId, customerId);
  if (!period || !periodIsLive(period)) {
    return NextResponse.json(fail("NO_PERIOD", "No active period"), {
      status: 400,
    });
  }

  if (periodRemaining(period) > 0) {
    return NextResponse.json(fail("QUOTA_AVAILABLE", "Quota still available"), {
      status: 400,
    });
  }

  const customer = await getCustomerById(customerId);
  if (!customer) {
    return NextResponse.json(fail("NOT_FOUND", "Customer not found"), {
      status: 404,
    });
  }

  const amount = aylikOverageAmountCents();
  const currency = getPackageCurrency();
  const site = getPublicEnv().siteUrl.replace(/\/$/, "");
  const locale =
    customer.preferredResultLocale === "pl" ||
    customer.preferredResultLocale === "en"
      ? customer.preferredResultLocale
      : "tr";

  if (!isStripeConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(fail("STRIPE_OFF", "Payments unavailable"), {
        status: 503,
      });
    }
    const { addOverageCredit } = await import(
      "@/lib/customer-portal/subscription-period"
    );
    await addOverageCredit(periodId);
    return NextResponse.json(
      ok({ devPaid: true, periodId, amountCents: amount }),
    );
  }

  const stripe = getStripe();

  const pendingId = await getPendingOverageSessionId(periodId);
  if (pendingId) {
    try {
      const existingSession = await stripe.checkout.sessions.retrieve(pendingId);
      if (existingSession.status === "open" && existingSession.url) {
        return NextResponse.json(
          ok({
            checkoutUrl: existingSession.url,
            sessionId: existingSession.id,
            reused: true,
          }),
        );
      }
      const { clearPendingOverageSession } = await import(
        "@/lib/customer-portal/subscription-period"
      );
      await clearPendingOverageSession(periodId);
    } catch (err) {
      console.error("[overage-checkout:reuse]", err);
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customer.email,
    line_items: [
      {
        price_data: {
          currency,
          unit_amount: amount,
          product_data: {
            name:
              locale === "pl"
                ? "ROUTEPOL — dodatkowe pismo (pakiet miesięczny)"
                : locale === "en"
                  ? "ROUTEPOL — extra letter (monthly package)"
                  : "ROUTEPOL — ek yazı (aylık paket)",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${site}/${locale}/hesabim?overage=ok`,
    cancel_url: `${site}/${locale}/hesabim?overage=cancel`,
    metadata: {
      billing: "overage",
      periodId,
      customerId,
    },
  });

  await setPendingOverageSession(periodId, session.id);

  return NextResponse.json(
    ok({ checkoutUrl: session.url, sessionId: session.id }),
  );
}
