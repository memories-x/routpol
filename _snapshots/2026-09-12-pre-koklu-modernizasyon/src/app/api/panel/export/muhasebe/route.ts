import { fail } from "@/lib/api";
import { listCases } from "@/lib/cases/store";
import {
  buildAccountantPackZip,
  currentWarsawYearMonth,
  isValidYearMonth,
} from "@/lib/invoices/accountant-pack";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const url = new URL(request.url);
  const raw = url.searchParams.get("ay")?.trim() || currentWarsawYearMonth();
  if (!isValidYearMonth(raw)) {
    return NextResponse.json(fail("BAD_MONTH", "Use YYYY-MM"), { status: 400 });
  }

  const pack = buildAccountantPackZip(await listCases(), raw);
  return new NextResponse(Buffer.from(pack.bytes), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${pack.filename}"`,
    },
  });
}
