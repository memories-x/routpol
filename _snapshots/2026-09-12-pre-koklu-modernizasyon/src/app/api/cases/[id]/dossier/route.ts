import { fail, ok } from "@/lib/api";
import { authorizeCaseAccess } from "@/lib/cases/authorize-case-access";
import { buildCustomerDossier, getCase } from "@/lib/cases/store";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

/**
 * Müşteri dosya özeti — kısa ömürlü view token veya legacy token.
 */
export async function GET(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  if (!authorizeCaseAccess(record, request)) {
    return NextResponse.json(fail("UNAUTHORIZED", "Invalid token"), {
      status: 401,
    });
  }

  const dossier = buildCustomerDossier(record);
  return NextResponse.json(ok(dossier), {
    headers: {
      "Content-Disposition": `attachment; filename="pol-turk-${record.id}.json"`,
    },
  });
}
