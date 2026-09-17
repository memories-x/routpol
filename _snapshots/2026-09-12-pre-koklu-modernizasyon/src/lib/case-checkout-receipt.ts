import { getPrisma, isDatabaseConfigured } from "@/lib/db";

export async function claimCaseCheckout(
  sessionId: string,
  caseId: string,
): Promise<"new" | "duplicate"> {
  if (!isDatabaseConfigured()) return "new";
  const prisma = getPrisma();
  try {
    await prisma.caseCheckoutReceipt.create({
      data: { sessionId, caseId },
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
