import { fail, ok } from "@/lib/api";
import { listCases, saveCase } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { lawyerPartnerInputSchema } from "@/lib/partners/schema";
import {
  buildLawyerPartner,
  getLawyerPartner,
  saveLawyerPartner,
} from "@/lib/partners/store";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }
  const { id } = await ctx.params;
  const partner = await getLawyerPartner(id);
  if (!partner) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }
  return NextResponse.json(ok(partner));
}

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const existing = await getLawyerPartner(id);
  if (!existing) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  const json = await request.json();
  const parsed = lawyerPartnerInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("VALIDATION", "Kart bilgisi eksik"), {
      status: 400,
    });
  }

  const saved = await saveLawyerPartner(
    buildLawyerPartner(parsed.data, existing),
  );

  if (saved.name !== existing.name) {
    const cases = await listCases();
    for (const c of Array.isArray(cases) ? cases : []) {
      if (c.lawyerPartnerId === saved.id && c.lawyerPartner !== saved.name) {
        c.lawyerPartner = saved.name;
        await saveCase(c);
      }
    }
  }

  return NextResponse.json(ok(saved));
}
