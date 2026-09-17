import { fail, ok } from "@/lib/api";
import { getCase } from "@/lib/cases/store";
import { issueLegalInvoice } from "@/lib/invoices/issue";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

/** Operatör: başarısız / bekleyen yasal faturayı tekrar kes. */
export async function POST(_request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }
  if (record.payment.status !== "paid") {
    return NextResponse.json(fail("NOT_PAID", "Payment not paid"), {
      status: 400,
    });
  }

  const saved = await issueLegalInvoice(record, { force: true });
  const inv = saved.payment.invoice;
  return NextResponse.json(
    ok({
      caseId: saved.id,
      invoice: inv ?? null,
    }),
  );
}
