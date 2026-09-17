import { getCustomerSessionId } from "@/lib/customer-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { getCustomerById } from "@/lib/customer-portal/login-tokens";
import {
  getBlockingPeriodForCustomer,
  getBlockingPeriodForEmail,
  getQueuedPeriodForCustomer,
} from "@/lib/customer-portal/subscription-period";

export const ACTIVE_PERIOD_CODE = "ACTIVE_PERIOD";

/** Oturum varsa e-posta müşteri kartına kilitlenir — ikinci kimlik açılmaz. */
export async function bindEmailToSession(
  requestedEmail: string,
): Promise<string> {
  const normalized = requestedEmail.toLowerCase().trim();
  if (!isDatabaseConfigured()) return normalized;

  const sessionId = await getCustomerSessionId();
  if (!sessionId) return normalized;

  const customer = await getCustomerById(sessionId);
  if (!customer) return normalized;
  return customer.email.toLowerCase();
}

export async function monthlyPackageBlock(
  email: string,
): Promise<{ code: string; message: string } | null> {
  if (!isDatabaseConfigured()) return null;
  const blocking = await getBlockingPeriodForEmail(email);
  if (!blocking) return null;
  return {
    code: ACTIVE_PERIOD_CODE,
    message:
      blocking.status === "queued"
        ? "A monthly package is already queued for this email"
        : "An active monthly package already exists for this email",
  };
}

export async function portalPurchaseFlags(customerId: string): Promise<{
  canBuyMonthly: boolean;
  queuedPeriod: Awaited<ReturnType<typeof getQueuedPeriodForCustomer>>;
}> {
  const queuedPeriod = await getQueuedPeriodForCustomer(customerId);
  const blocking = await getBlockingPeriodForCustomer(customerId);
  return {
    canBuyMonthly: !blocking,
    queuedPeriod,
  };
}
