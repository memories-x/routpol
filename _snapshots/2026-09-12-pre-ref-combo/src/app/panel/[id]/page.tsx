import { ArchiveFolderForm } from "@/components/panel/ArchiveFolderForm";
import { CaseNotesForm } from "@/components/panel/CaseNotesForm";
import { ChecklistForm } from "@/components/panel/ChecklistForm";
import { CopyCustomerLink } from "@/components/panel/CopyCustomerLink";
import { DeliverableUpload } from "@/components/panel/DeliverableUpload";
import { PartnerField } from "@/components/panel/PartnerField";
import { StatusForm } from "@/components/panel/StatusForm";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { StatusBadge } from "@/components/panel/ui/StatusBadge";
import { resolveChecklist, paymentLabelTr } from "@/lib/cases/checklist";
import { customerKeyFromEmail } from "@/lib/cases/customers";
import {
  isLetterPackage,
  slotLabel,
} from "@/lib/cases/document-slots";
import {
  caseArchiveFolderName,
  caseFilingLabel,
} from "@/lib/cases/filing";
import { agingDays, agingLabel, caseAgingIso, needsAttention } from "@/lib/cases/aging";
import { formatPricingLine, formatCallSlotTr, packageLabelTr } from "@/lib/cases/package-labels";
import { getCase } from "@/lib/cases/store";
import { listLawyerPartners } from "@/lib/partners/store";
import { resolveSlotsForRecord } from "@/lib/cases/validate-slots";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PanelCasePage({ params }: PageProps) {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const { id } = await params;
  const record = await getCase(id);
  if (!record) notFound();
  const partners = await listLawyerPartners();
  const leftoverName = (record.lawyerPartner ?? "").trim().toLowerCase();
  const partnerOptions = (Array.isArray(partners) ? partners : [])
    .filter(
      (p) =>
        p.active ||
        p.id === record.lawyerPartnerId ||
        (leftoverName && p.name.trim().toLowerCase() === leftoverName),
    )
    .map((p) => ({
      id: p.id,
      name: p.name,
      officeName: p.officeName,
      city: p.city,
      active: p.active,
    }));

  const letter = isLetterPackage(record.packageSlug);
  const slots = resolveSlotsForRecord(record);
  const showUploads = letter;
  const filingTitle = caseFilingLabel({
    companyName: record.customer.companyName,
    fullName: record.customer.fullName,
    matter: record.customer.matter,
  });
  const archiveFolder =
    record.archiveFolder ??
    caseArchiveFolderName({
      paidAt: record.payment.paidAt,
      createdAt: record.createdAt,
      companyName: record.customer.companyName,
      fullName: record.customer.fullName,
      matter: record.customer.matter,
      caseId: record.id,
    });
  const customerKey = customerKeyFromEmail(record.customer.email);
  const checklist = resolveChecklist(record.packageSlug, record.checklist);
  const timeline = [...(record.notes ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const days = agingDays(
    caseAgingIso({
      status: record.status,
      updatedAt: record.updatedAt,
      paidAt: record.payment.paidAt,
    }),
  );
  const hot = needsAttention(record.status, days);
  const docs = Array.isArray(record.documents) ? record.documents : [];

  return (
    <div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          href="/panel/dosyalar"
          className="text-pt-emerald-600 hover:underline"
        >
          ← Dosyalar
        </Link>
        {customerKey ? (
          <Link
            href={`/panel/musteriler/${encodeURIComponent(customerKey)}`}
            className="text-pt-aws-ink underline"
          >
            Müşteri kartı
          </Link>
        ) : null}
      </div>

      <div className="mt-4">
        <PageHeader
          title={filingTitle}
          description={`${packageLabelTr(record.packageSlug)} · ${record.id}`}
          actions={
            <>
              <StatusBadge status={record.status} />
              <span
                className={
                  hot
                    ? "text-sm font-medium text-pt-danger"
                    : "text-sm text-pt-slate-600"
                }
              >
                {agingLabel(days)}
              </span>
              {record.lawyerPartnerId ? (
                <Link
                  href={`/panel/ortaklar/${record.lawyerPartnerId}`}
                  className="text-sm text-pt-emerald-600 hover:underline"
                >
                  {record.lawyerPartner}
                </Link>
              ) : record.lawyerPartner ? (
                <span className="text-sm text-pt-slate-600">
                  {record.lawyerPartner}
                </span>
              ) : null}
              <CopyCustomerLink
                locale={record.locale}
                caseId={record.id}
                token={record.accessToken}
              />
            </>
          }
        />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <section className="rounded-lg border border-pt-border bg-pt-surface p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            Kimlik
          </h2>
          <dl className="mt-4 space-y-2 text-sm text-pt-slate-600">
            <div>
              <dt className="font-medium text-pt-aws-ink">Kişi</dt>
              <dd>{record.customer.fullName}</dd>
            </div>
            {record.customer.companyName ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">Firma</dt>
                <dd>{record.customer.companyName}</dd>
              </div>
            ) : null}
            {record.customer.nip ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">NIP</dt>
                <dd className="font-mono">{record.customer.nip}</dd>
              </div>
            ) : null}
            {record.customer.matter ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">Konu</dt>
                <dd>{record.customer.matter}</dd>
              </div>
            ) : null}
            {record.packageSlug === "telefon-gorusme" &&
            record.pricingMeta?.callRequestedAt ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">
                  Tercih edilen görüşme
                </dt>
                <dd>
                  {formatCallSlotTr(record.pricingMeta.callRequestedAt)}
                </dd>
              </div>
            ) : null}
            {record.customer.resultLocale ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">Özet dili</dt>
                <dd className="uppercase">{record.customer.resultLocale}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-medium text-pt-aws-ink">E-posta</dt>
              <dd>{record.customer.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-pt-aws-ink">Telefon</dt>
              <dd>{record.customer.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-pt-aws-ink">Paket</dt>
              <dd>{packageLabelTr(record.packageSlug)}</dd>
            </div>
            <div>
              <dt className="font-medium text-pt-aws-ink">Fiyat</dt>
              <dd>
                {formatPricingLine({
                  amountCents: record.payment.amountCents,
                  currency: record.payment.currency,
                  packageSlug: record.packageSlug,
                  pricingMeta: record.pricingMeta,
                })}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-pt-aws-ink">Ödeme</dt>
              <dd>
                {paymentLabelTr(record.payment.status)}
                {record.payment.paidAt
                  ? ` · ${new Date(record.payment.paidAt).toLocaleString()}`
                  : ""}
              </dd>
            </div>
            {record.payment.invoice ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">Fatura</dt>
                <dd>
                  {record.payment.invoice.status === "issued"
                    ? [
                        record.payment.invoice.number,
                        record.payment.invoice.ksefNumber
                          ? `KSeF ${record.payment.invoice.ksefNumber}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "Kesildi"
                    : record.payment.invoice.status === "failed"
                      ? `Hata${record.payment.invoice.lastError ? ` — ${record.payment.invoice.lastError}` : ""}`
                      : "Muhasebeci keser"}
                </dd>
              </div>
            ) : null}
            {record.customer.notes ? (
              <div>
                <dt className="font-medium text-pt-aws-ink">Başvuru notu</dt>
                <dd>{record.customer.notes}</dd>
              </div>
            ) : null}
          </dl>
          <PartnerField
            caseId={record.id}
            currentId={record.lawyerPartnerId ?? ""}
            currentName={record.lawyerPartner ?? ""}
            partners={partnerOptions}
          />
          <ArchiveFolderForm caseId={record.id} current={archiveFolder} />
          {letter ? (
            <p className="mt-4 rounded-md border border-pt-border bg-pt-bg px-3 py-2 text-xs text-pt-slate-600">
              Panel = canlı kayıt. Sonuç PDF yüklerken POL-TURK bant
              eklenebilir; müşteri dosya sayfasından indirir.
            </p>
          ) : null}
        </section>

        <section className="rounded-lg border border-pt-border bg-pt-surface p-5">
          {showUploads ? (
            <>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
                Evrak
              </h2>
              <p className="mt-1 text-sm text-pt-slate-600">
                Mektup veya ilgili form (müşteri) ve sonuç (siz) — tıklayınca indirilir
              </p>
              <ul className="mt-4 space-y-3">
                {Array.isArray(slots)
                  ? slots.map((slot) => {
                      const slotDocs = docs.filter(
                        (d) => d.slotKey === slot.key,
                      );
                      return (
                        <li
                          key={slot.key}
                          className="rounded-md border border-pt-border px-3 py-3"
                        >
                          <p className="font-medium text-pt-aws-ink">
                            {slotLabel(slot, "tr")}
                            <span className="ml-2 text-xs font-normal text-pt-slate-500">
                              ({slot.role})
                            </span>
                            {slot.required ? (
                              <span className="ml-1 text-pt-emerald-600">*</span>
                            ) : null}
                          </p>
                          {slotDocs.length === 0 ? (
                            <p className="mt-1 text-sm text-pt-slate-500">
                              Yüklenmedi
                            </p>
                          ) : (
                            <ul className="mt-2 space-y-1">
                              {slotDocs.map((d) => (
                                <li key={d.id}>
                                  <a
                                    href={`/api/panel/cases/${record.id}/files/${d.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-pt-emerald-600 hover:underline"
                                  >
                                    {d.originalName}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </>
          ) : (
            <>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
                Eski kayıt
              </h2>
              <p className="mt-2 text-sm text-pt-slate-600">
                Bu paket artık kamu siparişinde yok.
              </p>
            </>
          )}
        </section>

        <section className="rounded-lg border border-pt-border bg-pt-surface p-5 lg:col-span-2 xl:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            İşlem
          </h2>
          <div className="mt-4">
            <StatusForm caseId={record.id} current={record.status} />
          </div>
          {letter ? <DeliverableUpload caseId={record.id} /> : null}
          <ChecklistForm caseId={record.id} items={checklist} />
          <div className="mt-6 border-t border-pt-border pt-6">
            <h3 className="text-sm font-semibold">Zaman çizelgesi</h3>
            {timeline.length === 0 ? (
              <p className="mt-2 text-sm text-pt-slate-500">Henüz not yok.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {timeline.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-md border border-pt-border px-3 py-2 text-sm"
                  >
                    <p className="text-pt-aws-ink">{n.body}</p>
                    <p className="mt-1 text-[10px] text-pt-slate-500">
                      {new Date(n.createdAt).toLocaleString("tr-TR")}
                      {n.sharedWithCustomer ? (
                        <span className="ml-2 rounded bg-pt-emerald-600/10 px-1.5 py-0.5 text-pt-emerald-600">
                          müşteriyle paylaşıldı
                        </span>
                      ) : (
                        <span className="ml-2 text-pt-slate-500">iç not</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CaseNotesForm
            caseId={record.id}
            showList={false}
            initialNotes={(record.notes ?? []).map((n) => ({
              id: n.id,
              body: n.body,
              sharedWithCustomer: n.sharedWithCustomer,
              createdAt: n.createdAt,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
