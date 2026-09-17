import { fail, ok } from "@/lib/api";
import { listCases, saveCase } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { lawyerPartnerInputSchema } from "@/lib/partners/schema";
import {
  buildLawyerPartner,
  listLawyerPartners,
  saveLawyerPartner,
} from "@/lib/partners/store";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }
  const partners = await listLawyerPartners();
  return NextResponse.json(ok({ partners, total: partners.length }));
}

export async function POST(request: Request) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const json = await request.json();
  const parsed = lawyerPartnerInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("VALIDATION", "Kart bilgisi eksik"), {
      status: 400,
    });
  }

  const saved = await saveLawyerPartner(buildLawyerPartner(parsed.data));
  const key = saved.name.trim().toLowerCase();
  const cases = await listCases();
  for (const c of Array.isArray(cases) ? cases : []) {
    if (c.status === "draft") continue;
    if (c.lawyerPartnerId) continue;
    if ((c.lawyerPartner ?? "").trim().toLowerCase() !== key) continue;
    c.lawyerPartnerId = saved.id;
    c.lawyerPartner = saved.name;
    await saveCase(c);
  }

  return NextResponse.json(ok(saved), { status: 201 });
}
