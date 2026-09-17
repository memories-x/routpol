import { CaseRowTable } from "@/components/panel/ui/CaseRowTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { nextChecklistLabel } from "@/lib/cases/checklist";
import { packageLabelTr } from "@/lib/cases/package-labels";
import { getCustomerBundle, isSurecPackage } from "@/lib/cases/store";
import { caseFilingLabel } from "@/lib/cases/filing";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ key: string }>;
};

export default async function PanelCustomerDetailPage({ params }: PageProps) {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const { key } = await params;
  const customer = await getCustomerBundle(key);
  if (!customer) notFound();

  const cases = Array.isArray(customer.cases) ? customer.cases : [];
  const notes = Array.isArray(customer.recentNotes)
    ? customer.recentNotes
    : [];
  const packages = Array.isArray(customer.packages) ? customer.packages : [];

  const surecCases = cases.filter((c) => isSurecPackage(c.packageSlug));
  const otherCases = cases.filter((c) => !isSurecPackage(c.packageSlug));

  const companyName = customer.companyName;
  const fullName = customer.fullName;

  function toTableRows(list: typeof cases) {
    return list.map((c) => ({
      id: c.id,
      filingLabel: caseFilingLabel({
        companyName,
        fullName,
        matter: c.matter,
      }),
      packageSlug: c.packageSlug,
      status: c.status,
      updatedAt: c.updatedAt,
      paidAt: c.paidAt,
      documentCount: c.documentCount,
      amountCents: c.amountCents,
      currency: c.currency,
      lawyerPartner: c.lawyerPartner,
      nextAction: nextChecklistLabel(c.packageSlug, c.checklist, c.status),
    }));
  }

  return (
    <div>
      <Link
        href="/panel/musteriler"
        className="text-sm text-pt-emerald-600 hover:underline"
      >
        ← Müşteriler
      </Link>

      <div className="mt-4">
        <PageHeader
          title={customer.companyName || customer.fullName}
          description={`${customer.email} · ${customer.phone}`}
        />
      </div>

      <dl className="mt-6 grid gap-3 rounded-lg border border-pt-border bg-pt-surface p-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-pt-slate-500">Kişi</dt>
          <dd className="font-medium">{customer.fullName}</dd>
        </div>
        {customer.companyName ? (
          <div>
            <dt className="text-pt-slate-500">Firma</dt>
            <dd className="font-medium">{customer.companyName}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-pt-slate-500">E-posta</dt>
          <dd>
            <a
              href={`mailto:${customer.email}`}
              className="text-pt-emerald-600 hover:underline"
            >
              {customer.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-pt-slate-500">Telefon</dt>
          <dd>
            <a
              href={`tel:${customer.phone}`}
              className="text-pt-emerald-600 hover:underline"
            >
              {customer.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-pt-slate-500">Dosyalar</dt>
          <dd>
            {customer.caseCount} toplam · {customer.activeCount} açık
          </dd>
        </div>
        <div>
          <dt className="text-pt-slate-500">Paketler</dt>
          <dd>
            {packages.length > 0
              ? packages.map((p) => packageLabelTr(p)).join(", ")
              : "—"}
          </dd>
        </div>
      </dl>

      {notes.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Son notlar</h2>
          <ul className="mt-3 space-y-2">
            {notes.map((n, i) => (
              <li
                key={`${n.caseId}-${n.createdAt}-${i}`}
                className="rounded-md border border-pt-border bg-pt-surface px-3 py-2 text-sm"
              >
                <p>{n.body}</p>
                <p className="mt-1 text-[10px] text-pt-slate-500">
                  {new Date(n.createdAt).toLocaleString()}
                  {n.sharedWithCustomer ? " · paylaşıldı" : " · iç"}
                  {" · "}
                  <Link href={`/panel/${n.caseId}`} className="underline">
                    dosya
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {surecCases.length > 0 ? (
        <section id="surec" className="mt-10 scroll-mt-20">
          <h2 className="text-lg font-semibold">Süreç yönetimi</h2>
          <p className="mt-1 text-xs text-pt-slate-500">
            Her siteden gelen sipariş ayrı kayıttır. Bu kart hub: konular burada
            yan yana, özette tek müşteri olarak durur.
          </p>
          <CaseRowTable
            rows={toTableRows(surecCases)}
            empty="Süreç dosyası yok."
            showAmount
          />
        </section>
      ) : null}

      {otherCases.length > 0 || surecCases.length === 0 ? (
        <>
          <h2 className="mt-10 text-lg font-semibold">
            {surecCases.length > 0 ? "Tek yazı / aylık" : "Dosyalar"}
          </h2>
          <CaseRowTable
            rows={toTableRows(otherCases)}
            empty="Bu müşteride dosya yok."
            showAmount
          />
        </>
      ) : null}
    </div>
  );
}
