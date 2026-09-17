import { fail, ok } from "@/lib/api";
import {
  ALLOWED_MIME,
  MAX_FILE_BYTES,
  MEKTUP_SLOT,
  packageAllowsCustomerUploads,
} from "@/lib/cases/document-slots";
import {
  TEK_YAZI_MAX_PAGES,
  countPagesInBytes,
  normalizeMime,
} from "@/lib/cases/count-pages";
import { resolveTekYaziPriceFromCase } from "@/lib/cases/tek-yazi-price";
import { getCase, saveCase } from "@/lib/cases/store";
import { storeUpload } from "@/lib/cases/storage";
import { createId } from "@/lib/cases/types";
import { resolveCustomerSlots } from "@/lib/cases/validate-slots";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { secureCompare } from "@/lib/secure-compare";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

/** Customer upload (mektup) before / during draft & awaiting_payment */
export async function POST(request: Request, ctx: Ctx) {
  const limited = checkRateLimit(`upload:${getClientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many uploads"), {
      status: 429,
    });
  }

  const { id } = await ctx.params;
  const record = await getCase(id);
  if (!record) {
    return NextResponse.json(fail("NOT_FOUND", "Case not found"), {
      status: 404,
    });
  }

  if (record.status === "closed" || record.status === "unpaid_archived") {
    return NextResponse.json(fail("CLOSED", "Case closed"), { status: 400 });
  }

  const token = request.headers.get("x-case-token");
  if (!token || !secureCompare(token, record.accessToken)) {
    return NextResponse.json(fail("UNAUTHORIZED", "Invalid token"), {
      status: 401,
    });
  }

  if (!packageAllowsCustomerUploads(record.packageSlug)) {
    return NextResponse.json(
      fail("UPLOADS_NOT_ALLOWED", "Uploads not accepted for this package"),
      { status: 400 },
    );
  }

  if (record.status === "paid" || record.status === "in_progress") {
    return NextResponse.json(
      fail("LOCKED", "Case already paid — contact support to add files"),
      { status: 400 },
    );
  }

  const form = await request.formData();
  const slotKey = String(form.get("slotKey") ?? "");
  const file = form.get("file");

  const slots = resolveCustomerSlots(record);
  const slot = slots.find((s) => s.key === slotKey);
  if (!slot) {
    return NextResponse.json(fail("BAD_SLOT", "Unknown slot"), { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json(fail("NO_FILE", "File required"), { status: 400 });
  }

  if (file.size <= 0) {
    return NextResponse.json(fail("EMPTY_FILE", "Empty file"), { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(fail("TOO_LARGE", "Max 10MB"), { status: 400 });
  }

  const mime = normalizeMime(file.type || "", file.name);
  if (!(ALLOWED_MIME as readonly string[]).includes(mime)) {
    return NextResponse.json(fail("BAD_TYPE", "PDF/JPG/PNG only"), {
      status: 400,
    });
  }

  const existing = record.documents.filter((d) => d.slotKey === slotKey);
  const quotaCap =
    record.packageSlug === "aylik-paket" && slotKey === MEKTUP_SLOT
      ? Math.min(
          slot.maxFiles,
          Math.max(1, record.pricingMeta?.fileQuota ?? slot.maxFiles),
        )
      : slot.maxFiles;
  if (existing.length >= quotaCap) {
    return NextResponse.json(
      fail("SLOT_FULL", `Max ${quotaCap} file(s) for this slot`),
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  let pageCount = 1;
  try {
    pageCount = await countPagesInBytes(bytes, mime, file.name);
  } catch (err) {
    const code =
      err instanceof Error && err.message === "EMPTY_FILE"
        ? "EMPTY_FILE"
        : "PAGE_COUNT_FAILED";
    return NextResponse.json(
      fail(
        code,
        code === "EMPTY_FILE"
          ? "Empty file"
          : "Could not read page count from file",
      ),
      { status: 400 },
    );
  }

  if (record.packageSlug === "tek-yazi" && slotKey === MEKTUP_SLOT) {
    const priorPages = existing.reduce(
      (sum, d) => sum + (typeof d.pageCount === "number" ? d.pageCount : 0),
      0,
    );
    if (priorPages + pageCount > TEK_YAZI_MAX_PAGES) {
      return NextResponse.json(
        fail(
          "TOO_MANY_PAGES",
          `Max ${TEK_YAZI_MAX_PAGES} pages for single-letter package`,
          { pageCount, priorPages, max: TEK_YAZI_MAX_PAGES },
        ),
        { status: 400 },
      );
    }
  }

  const stored = await storeUpload({
    caseId: record.id,
    slotKey,
    originalName: file.name,
    mime,
    bytes,
  });

  record.documents.push({
    id: stored.id || createId("doc"),
    slotKey,
    originalName: file.name,
    mime,
    size: file.size,
    storagePath: stored.storagePath,
    uploadedAt: new Date().toISOString(),
    pageCount,
  });

  let pricedPages: number | null = null;
  let amountCents = record.payment.amountCents;

  if (record.packageSlug === "tek-yazi" && slotKey === MEKTUP_SLOT) {
    const priced = resolveTekYaziPriceFromCase(record);
    if (!priced.ok) {
      return NextResponse.json(fail(priced.code, priced.message), {
        status: 400,
      });
    }
    pricedPages = priced.pageCount;
    amountCents = priced.amountCents;
    record.pricingMeta = {
      ...record.pricingMeta,
      pageCount: priced.pageCount,
      pagesFromUpload: true,
    };
    record.payment.amountCents = priced.amountCents;
  }

  await saveCase(record);

  return NextResponse.json(
    ok({
      documentId: stored.id,
      slotKey,
      count: record.documents.filter((d) => d.slotKey === slotKey).length,
      filePageCount: pageCount,
      pageCount: pricedPages ?? record.pricingMeta?.pageCount ?? null,
      amountCents,
      currency: record.payment.currency,
    }),
  );
}
