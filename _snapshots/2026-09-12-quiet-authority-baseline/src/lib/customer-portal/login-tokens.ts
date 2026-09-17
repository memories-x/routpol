import { createHash, randomBytes } from "crypto";
import { getPrisma } from "@/lib/db";
import { loginTokenTtlMs } from "@/lib/customer-auth-token";

export function generateLoginToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashLoginToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export async function createPortalLoginToken(params: {
  customerId: string;
  requestIp?: string;
}): Promise<string> {
  const prisma = getPrisma();
  const raw = generateLoginToken();
  const tokenHash = hashLoginToken(raw);
  const expiresAt = new Date(Date.now() + loginTokenTtlMs());

  await prisma.customerPortalLogin.create({
    data: {
      customerId: params.customerId,
      tokenHash,
      expiresAt,
      requestIp: params.requestIp ?? null,
    },
  });

  return raw;
}

export async function consumePortalLoginToken(
  raw: string,
): Promise<{ customerId: string } | null> {
  const prisma = getPrisma();
  const tokenHash = hashLoginToken(raw);
  const now = new Date();

  const updated = await prisma.customerPortalLogin.updateMany({
    where: { tokenHash, usedAt: null, expiresAt: { gt: now } },
    data: { usedAt: now },
  });
  if (updated.count !== 1) {
    return null;
  }

  const row = await prisma.customerPortalLogin.findUnique({
    where: { tokenHash },
  });
  if (!row) return null;
  return { customerId: row.customerId };
}

export async function findCustomerByEmail(email: string) {
  const prisma = getPrisma();
  return prisma.customer.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}

export async function getCustomerById(id: string) {
  const prisma = getPrisma();
  return prisma.customer.findUnique({ where: { id } });
}

export async function syncCustomerProfileFromCase(params: {
  email: string;
  fullName: string;
  phone: string;
  companyName?: string;
  nip?: string;
  entityType?: string;
  preferredResultLocale?: string;
}) {
  const prisma = getPrisma();
  const email = params.email.toLowerCase().trim();
  return prisma.customer.upsert({
    where: { email },
    create: {
      email,
      fullName: params.fullName,
      phone: params.phone,
      companyName: params.companyName ?? null,
      nip: params.nip ?? null,
      entityType: params.entityType ?? null,
      preferredResultLocale: params.preferredResultLocale ?? null,
    },
    update: {
      fullName: params.fullName,
      phone: params.phone,
      companyName: params.companyName ?? null,
      ...(params.nip ? { nip: params.nip } : {}),
      ...(params.entityType ? { entityType: params.entityType } : {}),
      ...(params.preferredResultLocale
        ? { preferredResultLocale: params.preferredResultLocale }
        : {}),
    },
  });
}
