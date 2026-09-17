import { fail, ok } from "@/lib/api";
import { markChecklistKeysDone } from "@/lib/cases/checklist";
import {
  ALLOWED_MIME,
  MAX_FILE_BYTES,
  SONUC_SLOT,
  operatorSlotsFor,
} from "@/lib/cases/document-slots";
import { getCase, saveCase } from "@/lib/cases/store";
import { storeUpload } from "@/lib/cases/storage";
import { createId } from "@/lib/cases/types";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

/** Operator uploads deliverable (sonuc) */
export async function POST(request: Request, ctx: Ctx) {
  if (!(await isPanelAuthenticated())) {
    return NextResponse.json(fail("UNAUTHORIZED", "Login required"), {
      status: 401,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Not found"), { status: 404 });
  }

  const form = await request.formData();
  const slotKey = String(form.get("slotKey") ?? SONUC_SLOT);
  const file = form.get("file");

  const slots = operatorSlotsFor(record.packageSlug);
  const slot = slots.find((s) => s.key === slotKey);
  if (!slot) {
    return NextResponse.json(fail("BAD_SLOT", "Unknown slot"), { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json(fail("NO_FILE", "File required"), { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(fail("TOO_LARGE", "Max 10MB"), { status: 400 });
  }

  if (
    file.type &&
    !(ALLOWED_MIME as readonly string[]).includes(file.type)
  ) {
    return NextResponse.json(fail("BAD_TYPE", "PDF/JPG/PNG only"), {
      status: 400,
    });
  }

  const existing = record.documents.filter((d) => d.slotKey === slotKey);
  if (existing.length >= slot.maxFiles) {
    return NextResponse.json(
      fail("SLOT_FULL", `Max ${slot.maxFiles} file(s)`),
      { status: 400 },
    );
  }

  let bytes = Buffer.from(await file.arrayBuffer());
  let mime = file.type || "application/pdf";
  let originalName = file.name;
  let branded = false;

  if (slotKey === SONUC_SLOT) {
    const { isBrandLang } = await import("@/lib/pdf/brand");
    const {
      brandedFileName,
      parseThinFlag,
      shouldStampDeliverable,
      stampBrandedPdf,
    } = await import("@/lib/pdf/stamp-branded");
    const brandFlag = form.get("brandStamp");
    const brandRaw =
      brandFlag === null || brandFlag === undefined
        ? null
        : String(brandFlag);
    if (shouldStampDeliverable(mime, brandRaw)) {
      const langParam = String(form.get("brandLang") ?? "tr");
      const lang = isBrandLang(langParam) ? langParam : "tr";
      try {
        const stamped = await stampBrandedPdf(bytes, {
          lang,
          thin: parseThinFlag(
            form.get("brandThin") == null
              ? null
              : String(form.get("brandThin")),
          ),
        });
        bytes = Buffer.from(stamped);
        originalName = brandedFileName(file.name);
        branded = true;
        mime = "application/pdf";
      } catch (err) {
        console.error("[panel:brand-stamp]", err);
        return NextResponse.json(
          fail("BRAND_STAMP_FAILED", "PDF brand stamp failed"),
          { status: 400 },
        );
      }
    }
  }

  if (bytes.length > MAX_FILE_BYTES) {
    return NextResponse.json(fail("TOO_LARGE", "Max 10MB after brand"), {
      status: 400,
    });
  }

  const stored = await storeUpload({
    caseId: record.id,
    slotKey,
    originalName,
    mime,
    bytes,
  });

  record.documents.push({
    id: stored.id || createId("doc"),
    slotKey,
    originalName,
    mime,
    size: bytes.length,
    storagePath: stored.storagePath,
    uploadedAt: new Date().toISOString(),
  });

  if (record.status === "paid") {
    record.status = "in_progress";
  }
  if (slotKey === SONUC_SLOT) {
    record.checklist = markChecklistKeysDone(
      record.packageSlug,
      record.checklist,
      ["result_uploaded"],
    );
  }
  await saveCase(record);

  if (
    slotKey === SONUC_SLOT &&
    !record.notifications?.readyLinkSentAt
  ) {
    try {
      const { sendCaseCustomerMail } = await import(
        "@/lib/mail/case-customer-mail"
      );
      await sendCaseCustomerMail(record, "ready_link");
      record.notifications = {
        ...record.notifications,
        readyLinkSentAt: new Date().toISOString(),
      };
      record.checklist = markChecklistKeysDone(
        record.packageSlug,
        record.checklist,
        ["customer_notified", "summary_shared"],
      );
      await saveCase(record);
    } catch (err) {
      console.error("[panel:sonuc-mail]", err);
    }
  }

  return NextResponse.json(
    ok({
      documentId: stored.id,
      slotKey,
      status: record.status,
      branded,
      originalName,
    }),
  );
}
