import { fail, ok } from "@/lib/api";
import { markChecklistKeysDone } from "@/lib/cases/checklist";
import { addCaseNote, getCase, saveCase } from "@/lib/cases/store";
import { isDatabaseConfigured } from "@/lib/db";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

type Ctx = { params: Promise<{ id: string }> };

const bodySchema = z.object({
  body: z.string().trim().min(2).max(4000),
  sharedWithCustomer: z.boolean().optional(),
});

/** Operatör süreç notu — isteğe bağlı müşteriyle paylaş */
export async function POST(request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const existing = await getCase(id);
  if (!existing) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(fail("INVALID_JSON", "Invalid body"), {
      status: 400,
    });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(fail("VALIDATION_ERROR", "Invalid fields"), {
      status: 400,
    });
  }

  const updated = await addCaseNote({
    caseId: id,
    body: parsed.data.body,
    sharedWithCustomer: parsed.data.sharedWithCustomer,
  });

  if (!updated) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  let mail: "resend" | "noop" | "skipped" | "failed" = "skipped";
  let saved = updated;

  if (parsed.data.sharedWithCustomer) {
    try {
      const { sendCaseCustomerMail } = await import(
        "@/lib/mail/case-customer-mail"
      );
      mail = await sendCaseCustomerMail(saved, "shared_note", {
        noteBody: parsed.data.body,
      });
      saved.checklist = markChecklistKeysDone(
        saved.packageSlug,
        saved.checklist,
        ["customer_notified", "summary_shared"],
      );
      saved = await saveCase(saved);
    } catch (err) {
      console.error("[panel:share-note-mail]", err);
      mail = "failed";
    }
  }

  return NextResponse.json(
    ok({
      caseId: id,
      notes: saved.notes ?? [],
      database: isDatabaseConfigured(),
      mail,
      customerEmail: saved.customer.email,
    }),
  );
}
