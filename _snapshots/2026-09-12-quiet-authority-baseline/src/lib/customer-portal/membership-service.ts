import { getPrisma } from "@/lib/db";
import {
  canUsePasswordReset,
  type NormalizedRegister,
} from "./membership";
import { hashCustomerPassword, verifyCustomerPassword } from "./password";

const GENERIC_AUTH = "Invalid email or password";

export type MembershipResult =
  | { ok: true; customerId: string }
  | { ok: false; message: string };

export async function registerCustomer(
  data: NormalizedRegister,
): Promise<MembershipResult> {
  const prisma = getPrisma();
  const existing = await prisma.customer.findUnique({
    where: { email: data.email },
  });

  const passwordHash = await hashCustomerPassword(data.password);

  if (existing) {
    if (canUsePasswordReset(existing.passwordHash)) {
      return { ok: false, message: GENERIC_AUTH };
    }
    await prisma.customer.update({
      where: { id: existing.id },
      data: {
        passwordHash,
        fullName: data.fullName,
        companyName: data.companyName,
        entityType: data.entityType,
        preferredResultLocale: data.locale,
        ...(data.phone ? { phone: data.phone } : {}),
      },
    });
    return { ok: true, customerId: existing.id };
  }

  const created = await prisma.customer.create({
    data: {
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      companyName: data.companyName,
      entityType: data.entityType,
      preferredResultLocale: data.locale,
      passwordHash,
    },
  });
  return { ok: true, customerId: created.id };
}

export async function loginCustomerPassword(params: {
  email: string;
  password: string;
}): Promise<MembershipResult> {
  const prisma = getPrisma();
  const email = params.email.toLowerCase().trim();
  const customer = await prisma.customer.findUnique({
    where: { email },
  });
  if (!customer?.passwordHash) {
    return { ok: false, message: GENERIC_AUTH };
  }
  const match = await verifyCustomerPassword(
    customer.passwordHash,
    params.password,
  );
  if (!match) {
    return { ok: false, message: GENERIC_AUTH };
  }
  return { ok: true, customerId: customer.id };
}
