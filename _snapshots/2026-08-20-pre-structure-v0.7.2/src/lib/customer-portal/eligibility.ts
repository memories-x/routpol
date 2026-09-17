import { getPrisma } from "@/lib/db";

export const PORTAL_ELIGIBLE_STATUSES = ["paid", "in_progress", "closed"] as const;

export type PortalEligibleStatus = (typeof PORTAL_ELIGIBLE_STATUSES)[number];

export function isPortalEligibleStatus(status: string): status is PortalEligibleStatus {
  return (PORTAL_ELIGIBLE_STATUSES as readonly string[]).includes(status);
}

/** En az bir ödenmiş / işlenmiş dosya — magic link için */
export async function customerEligibleForPortal(
  customerId: string,
): Promise<boolean> {
  const prisma = getPrisma();
  const count = await prisma.case.count({
    where: {
      customerId,
      status: { in: [...PORTAL_ELIGIBLE_STATUSES] },
    },
  });
  return count > 0;
}

export async function customerEligibleForPortalByEmail(
  email: string,
): Promise<boolean> {
  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true },
  });
  if (!customer) return false;
  return customerEligibleForPortal(customer.id);
}
