import { fail, ok } from "@/lib/api";
import {
  quoteLeadStatuses,
  updateQuoteLeadStatus,
  type QuoteLeadStatus,
} from "@/lib/leads/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Oturum gerekli."), {
      status: 401,
    });
  }

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json(fail("VALIDATION_ERROR", "Geçersiz id."), {
      status: 400,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(fail("INVALID_JSON", "Geçersiz gövde."), {
      status: 400,
    });
  }

  const status =
    body &&
    typeof body === "object" &&
    "status" in body &&
    typeof (body as { status: unknown }).status === "string"
      ? (body as { status: string }).status
      : null;

  if (!status || !(quoteLeadStatuses as readonly string[]).includes(status)) {
    return NextResponse.json(
      fail("VALIDATION_ERROR", "Geçersiz durum."),
      { status: 400 },
    );
  }

  const updated = await updateQuoteLeadStatus(id, status as QuoteLeadStatus);
  if (!updated) {
    return NextResponse.json(fail("NOT_FOUND", "Kayıt bulunamadı."), {
      status: 404,
    });
  }

  return NextResponse.json(ok(updated));
}
