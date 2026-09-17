import { isDatabaseConfigured } from "@/lib/db";

export function isCustomerPortalEnabled(): boolean {
  return isDatabaseConfigured();
}
