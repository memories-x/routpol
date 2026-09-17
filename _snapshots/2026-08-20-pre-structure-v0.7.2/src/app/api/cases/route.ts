import { fail, ok } from "@/lib/api";
import {
  isCheckoutablePackage,
  isLetterPackage,
} from "@/lib/cases/document-slots";
import {
  getAmountCentsForMeta,
  getPackageCurrency,
  normalizePricingMeta,
} from "@/lib/cases/pricing";
import { saveCase } from "@/lib/cases/store";
import {
  createId,
  type CasePricingMeta,
  type CaseRecord,
} from "@/lib/cases/types";
import { assertProductionReady, isProductionRuntime } from "@/lib/golive";
import {
  companyRequiresNip,
  isValidPlNip,
  normalizeNip,
} from "@/lib/invoices/nip";
import {
  bindEmailToSession,
  monthlyPackageBlock,
} from "@/lib/customer-portal/purchase-guard";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z
  .object({
    packageSlug: z.string(),
    locale: z.string().min(2).max(5),
    fullName: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(120),
    phone: z.string().trim().min(6).max(30),
    companyName: z.string().trim().max(120).optional(),
    nip: z.string().trim().max(20).optional(),
    matter: z.string().trim().min(2).max(160),
    resultLocale: z.enum(["tr", "pl", "en"]).optional(),
    notes: z.string().trim().max(2000).optional(),
    pageCount: z.number().int().optional(),
    fileQuota: z.number().int().optional(),
    entityType: z.enum(["sahis", "sirket"]).optional(),
  })
  .superRefine((data, ctx) => {
    const nip = data.nip ? normalizeNip(data.nip) : "";
    const needNip = companyRequiresNip({
      companyName: data.companyName,
      entityType: data.entityType,
    });
    if (needNip && !nip) {
      ctx.addIssue({
        code: "custom",
        path: ["nip"],
        message: "Company NIP required",
      });
      return;
    }
    if (nip && !isValidPlNip(nip)) {
      ctx.addIssue({
        code: "custom",
        path: ["nip"],
        message: "Invalid NIP",
      });
    }
  });

export async function POST(request: Request) {
  try {
    if (isProductionRuntime()) assertProductionReady("cases-create");
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      fail("PRODUCTION_MISCONFIGURED", "Service temporarily unavailable"),
      { status: 503 },
    );
  }

  const limited = checkRateLimit(`cases:${getClientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json(fail("RATE_LIMITED", "Too many requests"), {
      status: 429,
    });
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
    return NextResponse.json(
      fail("VALIDATION_ERROR", "Invalid fields", parsed.error.flatten()),
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (!isLetterPackage(data.packageSlug) || !isCheckoutablePackage(data.packageSlug)) {
    return NextResponse.json(fail("BAD_PACKAGE", "Unknown package"), {
      status: 400,
    });
  }

  const email = await bindEmailToSession(data.email);
  if (data.packageSlug === "aylik-paket") {
    const { isDatabaseConfigured } = await import("@/lib/db");
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        fail(
          "UNAVAILABLE",
          "Monthly package requires DATABASE_URL (portal + quota)",
        ),
        { status: 503 },
      );
    }
    const blocked = await monthlyPackageBlock(email);
    if (blocked) {
      return NextResponse.json(fail(blocked.code, blocked.message), {
        status: 409,
      });
    }
  }

  const metaRaw: Partial<CasePricingMeta> = {
    pageCount: data.packageSlug === "tek-yazi" ? undefined : data.pageCount,
    fileQuota: data.fileQuota,
    entityType: data.entityType,
  };
  const metaOrErr = normalizePricingMeta(data.packageSlug, metaRaw);
  if ("error" in metaOrErr) {
    return NextResponse.json(fail("BAD_PRICING", metaOrErr.error), {
      status: 400,
    });
  }
  const pricingMeta = metaOrErr;
  const amountCents = getAmountCentsForMeta(data.packageSlug, pricingMeta);

  const localeShort = data.locale.slice(0, 2);
  const resultLocale =
    data.resultLocale ??
    (localeShort === "pl" || localeShort === "en" || localeShort === "tr"
      ? localeShort
      : "tr");

  const now = new Date().toISOString();
  const record: CaseRecord = {
    id: createId("case"),
    createdAt: now,
    updatedAt: now,
    locale: data.locale,
    packageSlug: data.packageSlug,
    pricingMeta,
    status: "draft",
    customer: {
      fullName: data.fullName,
      email,
      phone: data.phone,
      companyName: data.companyName || undefined,
      nip: data.nip ? normalizeNip(data.nip) : undefined,
      matter: data.matter,
      resultLocale,
      notes: data.notes,
    },
    documents: [],
    payment: {
      amountCents,
      currency: getPackageCurrency(),
      status: "none",
    },
    accessToken: createId("tok"),
  };

  await saveCase(record);

  void import("@/lib/analytics").then(({ trackEvent }) =>
    trackEvent("case_created", { packageSlug: record.packageSlug }, record.locale),
  );

  return NextResponse.json(
    ok({
      id: record.id,
      accessToken: record.accessToken,
      packageSlug: record.packageSlug,
      pricingMeta: record.pricingMeta,
      amountCents: record.payment.amountCents,
      currency: record.payment.currency,
      payable: true,
    }),
  );
}
