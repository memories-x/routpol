import {
  ALLOWED_MIME,
  MAX_FILE_BYTES,
  MEKTUP_SLOT,
} from "@/lib/cases/document-slots";
import { countPagesInBytes, normalizeMime } from "@/lib/cases/count-pages";
import { getPackageCurrency } from "@/lib/cases/pricing";
import { saveCase } from "@/lib/cases/store";
import { storeUpload } from "@/lib/cases/storage";
import { createId, type CaseRecord } from "@/lib/cases/types";
import { getPrisma } from "@/lib/db";
import {
  getActivePeriodForCustomer,
  getPeriodByIdForCustomer,
  periodIsLive,
  periodRemaining,
  releasePeriodLetterSlot,
  tryClaimPeriodLetterSlot,
} from "@/lib/customer-portal/subscription-period";

async function rollbackFailedLetter(params: {
  periodId: string;
  caseId?: string;
}): Promise<void> {
  await releasePeriodLetterSlot(params.periodId);
  if (!params.caseId) return;
  const prisma = getPrisma();
  await prisma.letterSubmission.deleteMany({ where: { caseId: params.caseId } });
  await prisma.caseDocument.deleteMany({ where: { caseId: params.caseId } });
  await prisma.case.deleteMany({ where: { id: params.caseId } });
}

export async function submitPeriodLetter(params: {
  customerId: string;
  periodId: string;
  file: File;
  locale: string;
}): Promise<
  | { ok: true; caseId: string; accessToken: string; remaining: number }
  | { ok: false; code: "OVERAGE_REQUIRED"; periodId: string }
  | { ok: false; code: string; message: string }
> {
  const period = await getPeriodByIdForCustomer(
    params.periodId,
    params.customerId,
  );
  if (!period || !periodIsLive(period)) {
    return { ok: false, code: "NO_PERIOD", message: "No active period" };
  }

  if (periodRemaining(period) <= 0) {
    return { ok: false, code: "OVERAGE_REQUIRED", periodId: period.id };
  }

  if (params.file.size <= 0 || params.file.size > MAX_FILE_BYTES) {
    return { ok: false, code: "BAD_FILE", message: "Invalid file size" };
  }

  const mime = normalizeMime(params.file.type || "", params.file.name);
  if (!(ALLOWED_MIME as readonly string[]).includes(mime)) {
    return { ok: false, code: "BAD_TYPE", message: "PDF/JPG/PNG only" };
  }

  const claimed = await tryClaimPeriodLetterSlot({
    periodId: period.id,
    customerId: params.customerId,
  });
  if (!claimed) {
    const latest = await getPeriodByIdForCustomer(
      period.id,
      params.customerId,
    );
    if (latest && periodRemaining(latest) <= 0) {
      return { ok: false, code: "OVERAGE_REQUIRED", periodId: period.id };
    }
    return { ok: false, code: "NO_PERIOD", message: "No active period" };
  }

  const prisma = getPrisma();
  const customer = await prisma.customer.findUnique({
    where: { id: params.customerId },
  });
  if (!customer) {
    await releasePeriodLetterSlot(period.id);
    return { ok: false, code: "NOT_FOUND", message: "Customer not found" };
  }

  const bytes = Buffer.from(await params.file.arrayBuffer());
  let pageCount = 1;
  try {
    pageCount = await countPagesInBytes(bytes, mime, params.file.name);
  } catch {
    await releasePeriodLetterSlot(period.id);
    return { ok: false, code: "PAGE_COUNT_FAILED", message: "Unreadable file" };
  }

  const now = new Date().toISOString();
  const caseId = createId("case");
  const accessToken = createId("tok");
  const resultLocale =
    (customer.preferredResultLocale as "tr" | "pl" | "en" | null) ??
    (params.locale === "pl" || params.locale === "en" ? params.locale : "tr");

  try {
    const stored = await storeUpload({
      caseId,
      slotKey: MEKTUP_SLOT,
      originalName: params.file.name,
      mime,
      bytes,
    });

    const record: CaseRecord = {
      id: caseId,
      createdAt: now,
      updatedAt: now,
      locale: params.locale,
      packageSlug: "aylik-paket",
      pricingMeta: { fileQuota: period.quota },
      status: "paid",
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        companyName: customer.companyName ?? undefined,
        nip: customer.nip ?? undefined,
        matter: `Aylık paket — ${params.file.name}`,
        resultLocale,
      },
      documents: [
        {
          id: stored.id || createId("doc"),
          slotKey: MEKTUP_SLOT,
          originalName: params.file.name,
          mime,
          size: params.file.size,
          storagePath: stored.storagePath,
          uploadedAt: now,
          pageCount,
        },
      ],
      payment: {
        amountCents: 0,
        currency: getPackageCurrency(),
        status: "paid",
        paidAt: now,
        billingKind: "quota_letter",
      },
      accessToken,
    };

    await saveCase(record);

    await prisma.case.update({
      where: { id: caseId },
      data: { subscriptionPeriodId: period.id },
    });

    await prisma.letterSubmission.create({
      data: {
        id: createId("ltr"),
        periodId: period.id,
        caseId,
        originalName: params.file.name,
        mime,
        size: params.file.size,
        storagePath: stored.storagePath,
        pageCount,
      },
    });
  } catch (err) {
    await rollbackFailedLetter({ periodId: period.id, caseId });
    throw err;
  }

  const updated = await getPeriodByIdForCustomer(period.id, params.customerId);
  return {
    ok: true,
    caseId,
    accessToken,
    remaining: updated ? periodRemaining(updated) : 0,
  };
}

export async function resolveActivePeriodId(
  customerId: string,
  periodId?: string | null,
): Promise<string | null> {
  if (periodId) {
    const p = await getPeriodByIdForCustomer(periodId, customerId);
    return p && periodIsLive(p) ? p.id : null;
  }
  const active = await getActivePeriodForCustomer(customerId);
  return active?.id ?? null;
}
