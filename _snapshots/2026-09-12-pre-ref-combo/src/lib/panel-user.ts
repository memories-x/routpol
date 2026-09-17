import { hash, verify } from "@node-rs/argon2";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { expectedPanelPassword } from "@/lib/panel-auth-token";
import { secureCompare } from "@/lib/secure-compare";

const PRIMARY_USERNAME = "operator";

export async function getPrimaryPanelUser() {
  if (!isDatabaseConfigured()) return null;
  const prisma = getPrisma();
  return prisma.panelUser.findFirst({
    where: { username: PRIMARY_USERNAME, active: true },
  });
}

/** İlk girişte env parolasından hash üretir (tek operatör). */
export async function ensurePrimaryPanelUser() {
  if (!isDatabaseConfigured()) return null;
  const prisma = getPrisma();
  const existing = await getPrimaryPanelUser();
  if (existing) return existing;

  const plain = expectedPanelPassword();
  const passwordHash = await hash(plain, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  return prisma.panelUser.create({
    data: {
      username: PRIMARY_USERNAME,
      passwordHash,
      passwordVersion: 1,
    },
  });
}

export async function getPanelPasswordVersion(): Promise<string> {
  const user = await getPrimaryPanelUser();
  if (user) return String(user.passwordVersion);
  return "env";
}

export async function verifyPanelLoginPassword(plain: string): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return secureCompare(plain, expectedPanelPassword());
  }

  const user = (await getPrimaryPanelUser()) ?? (await ensurePrimaryPanelUser());
  if (!user) {
    return secureCompare(plain, expectedPanelPassword());
  }

  try {
    return await verify(user.passwordHash, plain);
  } catch {
    return false;
  }
}
