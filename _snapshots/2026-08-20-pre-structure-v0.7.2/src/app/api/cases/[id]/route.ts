import { fail, ok } from "@/lib/api";
import { MEKTUP_SLOT, SONUC_SLOT } from "@/lib/cases/document-slots";
import { getCase } from "@/lib/cases/store";
import { secureCompare } from "@/lib/secure-compare";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Case not found"), {
      status: 404,
    });
  }

  const token = request.headers.get("x-case-token");
  if (!token || !secureCompare(token, record.accessToken)) {
    return NextResponse.json(fail("UNAUTHORIZED", "Invalid token"), {
      status: 401,
    });
  }

  const paid =
    record.payment.status === "paid" ||
    record.status === "paid" ||
    record.status === "in_progress" ||
    record.status === "closed";

  const results = paid
    ? record.documents.filter((d) => d.slotKey === SONUC_SLOT)
    : [];
  const letters = record.documents.filter((d) => d.slotKey === MEKTUP_SLOT);

  return NextResponse.json(
    ok({
      id: record.id,
      status: record.status,
      packageSlug: record.packageSlug,
      pricingMeta: record.pricingMeta ?? null,
      documents: {
        mektup: letters.map((d) => ({
          id: d.id,
          originalName: d.originalName,
          uploadedAt: d.uploadedAt,
        })),
        sonuc: results.map((d) => ({
          id: d.id,
          originalName: d.originalName,
          uploadedAt: d.uploadedAt,
        })),
      },
      payment: {
        status: record.payment.status,
        amountCents: record.payment.amountCents,
        currency: record.payment.currency,
        paidAt: record.payment.paidAt ?? null,
      },
      customer: {
        fullName: record.customer.fullName,
        email: record.customer.email,
      },
    }),
  );
}
