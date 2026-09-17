import { fail, ok } from "@/lib/api";
import { listPanelCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const cases = await listPanelCases();
  return NextResponse.json(
    ok(
      cases.map((c) => ({
        id: c.id,
        status: c.status,
        packageSlug: c.packageSlug,
        fullName: c.customer.fullName,
        companyName: c.customer.companyName ?? null,
        matter: c.customer.matter ?? null,
        email: c.customer.email,
        updatedAt: c.updatedAt,
        paidAt: c.payment.paidAt ?? null,
        documentCount: c.documents.length,
      })),
    ),
  );
}
