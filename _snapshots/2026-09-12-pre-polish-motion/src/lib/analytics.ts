import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export async function trackEvent(
  name: string,
  meta?: Record<string, unknown>,
  locale?: string,
): Promise<void> {
  if (!isDatabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", name, meta ?? {});
    }
    return;
  }
  try {
    const prisma = getPrisma();
    await prisma.analyticsEvent.create({
      data: {
        name,
        locale: locale ?? null,
        meta: (meta ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (err) {
    console.error("[analytics]", err);
  }
}
