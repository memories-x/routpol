import { fail, ok } from "@/lib/api";
import { getCustomerSessionId } from "@/lib/customer-auth";
import { isCustomerPortalEnabled } from "@/lib/customer-portal/enabled";
import { getCustomerById } from "@/lib/customer-portal/login-tokens";
import {
  getActivePeriodForCustomer,
} from "@/lib/customer-portal/subscription-period";
import {
  getCustomerPortalSummary,
  listAllCustomerCasesForPortal,
} from "@/lib/customer-portal/summary";
import { portalPurchaseFlags } from "@/lib/customer-portal/purchase-guard";
import { NextResponse } from "next/server";

export async function GET() {
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

  const customer = await getCustomerById(customerId);
  if (!customer) {
    return NextResponse.json(fail("NOT_FOUND", "Customer not found"), {
      status: 404,
    });
  }

  const [activePeriod, cases, summary, flags] = await Promise.all([
    getActivePeriodForCustomer(customerId),
    listAllCustomerCasesForPortal(customerId),
    getCustomerPortalSummary(customerId),
    portalPurchaseFlags(customerId),
  ]);

  return NextResponse.json(
    ok({
      profile: {
        email: customer.email,
        fullName: customer.fullName,
        phone: customer.phone,
        companyName: customer.companyName,
        nip: customer.nip,
        entityType: customer.entityType,
        preferredResultLocale: customer.preferredResultLocale,
      },
      activePeriod,
      queuedPeriod: flags.queuedPeriod,
      canBuyMonthly: flags.canBuyMonthly,
      summary,
      cases,
    }),
  );
}
