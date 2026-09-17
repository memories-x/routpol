import { fail } from "@/lib/api";
import { listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

function csvEscape(v: string): string {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export async function GET() {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const cases = (await listCases()).filter((c) => c.status !== "draft");
  const header = [
    "id",
    "status",
    "package",
    "fullName",
    "companyName",
    "email",
    "phone",
    "matter",
    "lawyerPartner",
    "amountCents",
    "currency",
    "updatedAt",
  ];
  const lines = [header.join(",")];
  for (const c of cases) {
    lines.push(
      [
        c.id,
        c.status,
        c.packageSlug,
        c.customer.fullName,
        c.customer.companyName ?? "",
        c.customer.email,
        c.customer.phone,
        c.customer.matter ?? "",
        c.lawyerPartner ?? "",
        String(c.payment.amountCents),
        c.payment.currency,
        c.updatedAt,
      ]
        .map((x) => csvEscape(String(x)))
        .join(","),
    );
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pol-turk-cases.csv"',
    },
  });
}
