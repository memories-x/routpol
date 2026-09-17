import { fail, ok } from "@/lib/api";
import { filterCustomers, listCustomerSummaries } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const q = new URL(request.url).searchParams.get("q") ?? "";
  const all = await listCustomerSummaries();
  const customers = filterCustomers(all, q);
  return NextResponse.json(ok({ customers, total: customers.length }));
}
