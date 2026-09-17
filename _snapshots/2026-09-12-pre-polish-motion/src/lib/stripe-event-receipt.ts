import { getPrisma, isDatabaseConfigured } from "@/lib/db";

/** Stripe webhook event.id — at-least-once teslimat için tek sefer işaretleme. */
export async function claimStripeEvent(
  eventId: string,
  eventType: string,
): Promise<"new" | "duplicate"> {
  if (!isDatabaseConfigured()) {
    return "new";
  }
  const prisma = getPrisma();
  try {
    await prisma.stripeEventReceipt.create({
      data: { eventId, eventType },
    });
    return "new";
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err
        ? (err as { code: string }).code
        : "";
    if (code === "P2002") return "duplicate";
    throw err;
  }
}
