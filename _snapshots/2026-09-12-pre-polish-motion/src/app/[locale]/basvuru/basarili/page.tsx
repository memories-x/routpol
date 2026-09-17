import { CustomerCasePanel } from "@/components/cases/CustomerCasePanel";
import { getContent } from "@/content";
import { legacyTokenExpired } from "@/lib/cases/authorize-case-access";
import { createCaseViewToken } from "@/lib/cases/case-view-token";
import { EK_FORM_SLOT, MEKTUP_SLOT, SONUC_SLOT } from "@/lib/cases/document-slots";
import { getCase } from "@/lib/cases/store";
import { isLocale, type Locale } from "@/lib/i18n";
import { secureCompare } from "@/lib/secure-compare";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ case?: string; token?: string }>;
};

export default async function BasvuruBasariliPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getContent(locale);
  const sp = await searchParams;

  if (!sp.case || !sp.token) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 bg-pt-surface-alt min-h-[50vh]">
        <h1 className="font-display text-3xl text-pt-navy-900">
          {locale === "pl"
            ? "Brak linku sprawy"
            : locale === "en"
              ? "Missing case link"
              : "İş linki eksik"}
        </h1>
        <Link
          href={`/${locale}/basvuru`}
          className="mt-8 inline-block text-pt-emerald-600 hover:underline"
        >
          {locale === "pl"
            ? "Nowe zamówienie"
            : locale === "en"
              ? "New order"
              : "Yeni sipariş"}
        </Link>
      </div>
    );
  }

  const record = await getCase(sp.case);
  if (!record || !secureCompare(record.accessToken, sp.token)) {
    notFound();
  }
  if (legacyTokenExpired(record)) {
    notFound();
  }

  const paid =
    record.payment.status === "paid" ||
    record.status === "paid" ||
    record.status === "in_progress" ||
    record.status === "closed";

  const sonuc = record.documents.filter((d) => d.slotKey === SONUC_SLOT);
  const mektup = record.documents.filter(
    (d) => d.slotKey === MEKTUP_SLOT || d.slotKey === EK_FORM_SLOT,
  );
  const dossierViewToken = createCaseViewToken({ caseId: record.id });

  const sharedNotes = (record.notes ?? [])
    .filter((n) => n.sharedWithCustomer)
    .map((n) => ({ body: n.body, createdAt: n.createdAt }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const activityStamps = [
    record.updatedAt,
    record.createdAt,
    ...record.documents.map((d) => d.uploadedAt),
    ...sharedNotes.map((n) => n.createdAt),
  ].filter(Boolean);
  const lastUpdatedAt = activityStamps.sort((a, b) => b.localeCompare(a))[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 bg-pt-surface-alt min-h-[50vh]">
      <CustomerCasePanel
        locale={locale}
        caseId={record.id}
        token={sp.token}
        status={record.status}
        packageSlug={record.packageSlug}
        paid={paid}
        amountCents={record.payment.amountCents}
        currency={record.payment.currency}
        callRequestedAt={record.pricingMeta?.callRequestedAt}
        customerNotes={record.customer.notes}
        dossierViewToken={dossierViewToken}
        lastUpdatedAt={lastUpdatedAt}
        mektup={mektup.map((d) => ({
          id: d.id,
          originalName: d.originalName,
          viewToken: createCaseViewToken({
            caseId: record.id,
            docId: d.id,
          }),
        }))}
        sonuc={sonuc.map((d) => ({
          id: d.id,
          originalName: d.originalName,
          viewToken: createCaseViewToken({
            caseId: record.id,
            docId: d.id,
          }),
        }))}
        sharedNotes={sharedNotes}
        brandName={content.brand.name}
      />
    </div>
  );
}
