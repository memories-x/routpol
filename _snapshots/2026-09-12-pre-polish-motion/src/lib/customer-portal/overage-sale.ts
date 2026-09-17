import { aylikOverageAmountCents, getPackageCurrency } from "@/lib/cases/pricing";
import { saveCase } from "@/lib/cases/store";
import { createId, type CaseRecord } from "@/lib/cases/types";
import { getPrisma } from "@/lib/db";

/** Aşım tahsilatı muhasebe ZIP’ine girsin (kota yazısı 0 zł değil). */
export async function recordOverageSale(params: {
  periodId: string;
  stripeSessionId: string;
}): Promise<boolean> {
  const prisma = getPrisma();
  const existing = await prisma.case.findFirst({
    where: {
      payment: {
        path: ["stripeSessionId"],
        equals: params.stripeSessionId,
      },
    },
    select: { id: true },
  });
  if (existing) return false;

  const period = await prisma.subscriptionPeriod.findUnique({
    where: { id: params.periodId },
    include: { customer: true },
  });
  if (!period) return false;

  const now = new Date().toISOString();
  const c = period.customer;
  const locale =
    c.preferredResultLocale === "pl" || c.preferredResultLocale === "en"
      ? c.preferredResultLocale
      : "tr";

  const record: CaseRecord = {
    id: createId("case"),
    createdAt: now,
    updatedAt: now,
    locale,
    packageSlug: "aylik-paket",
    pricingMeta: { fileQuota: period.quota },
    status: "closed",
    customer: {
      fullName: c.fullName,
      email: c.email,
      phone: c.phone,
      companyName: c.companyName ?? undefined,
      nip: c.nip ?? undefined,
      matter: "Aylık paket — ek yazı (aşım 40 zł)",
      resultLocale: locale,
    },
    documents: [],
    payment: {
      amountCents: aylikOverageAmountCents(),
      currency: getPackageCurrency(),
      status: "paid",
      paidAt: now,
      stripeSessionId: params.stripeSessionId,
      billingKind: "overage",
    },
    accessToken: createId("tok"),
  };

  await saveCase(record);
  await prisma.case.update({
    where: { id: record.id },
    data: { subscriptionPeriodId: period.id },
  });
  return true;
}

/** Webhook retry — kredi uygulandı ama satış kaydı eksikse tamir. */
export async function reconcileOverageSale(params: {
  periodId: string;
  stripeSessionId: string;
}): Promise<void> {
  await recordOverageSale(params);
}
