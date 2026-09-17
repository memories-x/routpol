import { fail } from "@/lib/api";
import { listCustomerSummaries } from "@/lib/cases/store";
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

  const customers = await listCustomerSummaries();
  const header = [
    "email",
    "fullName",
    "companyName",
    "phone",
    "caseCount",
    "activeCount",
    "packages",
    "lastUpdatedAt",
  ];
  const lines = [header.join(",")];
  for (const c of customers) {
    lines.push(
      [
        c.email,
        c.fullName,
        c.companyName ?? "",
        c.phone,
        String(c.caseCount),
        String(c.activeCount),
        c.packages.join("|"),
        c.lastUpdatedAt,
      ]
        .map((x) => csvEscape(String(x)))
        .join(","),
    );
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pol-turk-customers.csv"',
    },
  });
}
