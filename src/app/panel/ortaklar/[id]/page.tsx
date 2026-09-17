import { PartnerForm } from "@/components/panel/PartnerForm";
import {
  CaseRowTable,
  caseRecordToTableRow,
} from "@/components/panel/ui/CaseRowTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { casesForPartner, getLawyerPartner } from "@/lib/partners/store";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ duzenle?: string }>;
};

export default async function PanelPartnerDetailPage({
  params,
  searchParams,
}: PageProps) {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const { id } = await params;
  const sp = await searchParams;
  const editing = sp.duzenle === "1";
  const partner = await getLawyerPartner(id);
  if (!partner) notFound();

  const all = await listCases();
  const linked = casesForPartner(
    partner,
    Array.isArray(all) ? all : [],
  ).filter((c) => c.status !== "draft");
  const open = linked.filter(
    (c) =>
      c.status === "paid" ||
      c.status === "in_progress" ||
      c.status === "awaiting_payment",
  );

  const ghostBtn =
    "rounded-md border border-pt-border px-3 py-2 text-sm font-medium hover:bg-pt-surface";

  return (
    <div>
      <Link
        href="/panel/ortaklar"
        className="text-sm text-pt-emerald-600 hover:underline"
      >
        ← Avukat ortakları
      </Link>

      <div className="mt-4">
        <PageHeader
          title={partner.name}
          description={
            [partner.officeName, partner.city].filter(Boolean).join(" · ") ||
            undefined
          }
          actions={
            <>
              {partner.phone ? (
                <a
                  href={`tel:${partner.phone}`}
                  className="rounded-sm bg-pt-aws-ink px-3 py-2 text-sm font-semibold text-white"
                >
                  Ara
                </a>
              ) : null}
              {partner.email ? (
                <a href={`mailto:${partner.email}`} className={ghostBtn}>
                  E-posta
                </a>
              ) : null}
              {editing ? (
                <Link href={`/panel/ortaklar/${partner.id}`} className={ghostBtn}>
                  Vazgeç
                </Link>
              ) : (
                <Link
                  href={`/panel/ortaklar/${partner.id}?duzenle=1`}
                  className={ghostBtn}
                >
                  Düzenle
                </Link>
              )}
            </>
          }
        />
      </div>

      {editing ? (
        <PartnerForm partner={partner} />
      ) : partner.notes ? (
        <p className="mt-4 rounded-lg border border-pt-border bg-pt-surface px-4 py-3 text-sm text-pt-slate-600">
          {partner.notes}
        </p>
      ) : null}

      <section className="mt-10" id="dosyalar">
        <h2 className="text-lg font-semibold">
          Dosyalar{" "}
          <span className="text-sm font-normal text-pt-slate-500">
            · {open.length} açık / {linked.length} toplam
          </span>
        </h2>
        <p className="mt-1 text-xs text-pt-slate-500">
          Atama dosya sayfasındaki listeden yapılır.
        </p>
        <CaseRowTable
          rows={linked.map(caseRecordToTableRow)}
          empty="Bu ortağa bağlı dosya yok. Dosya detayında ortak seçin."
        />
      </section>
    </div>
  );
}
