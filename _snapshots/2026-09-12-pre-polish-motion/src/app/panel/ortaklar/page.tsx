import { PageHeader } from "@/components/panel/ui/PageHeader";
import { PartnerTable } from "@/components/panel/ui/PartnerTable";
import { listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { leftoverPartnerLabels } from "@/lib/partners/filter";
import { casesForPartner, listLawyerPartners } from "@/lib/partners/store";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PanelPartnersPage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const [partners, cases] = await Promise.all([
    listLawyerPartners(),
    listCases(),
  ]);
  const directory = Array.isArray(partners) ? partners : [];
  const visibleCases = (Array.isArray(cases) ? cases : []).filter(
    (c) => c.status !== "draft",
  );
  const leftover = leftoverPartnerLabels(directory, visibleCases);

  const rows = directory
    .map((p) => {
      const linked = casesForPartner(p, visibleCases);
      const open = linked.filter(
        (c) =>
          c.status === "paid" ||
          c.status === "in_progress" ||
          c.status === "awaiting_payment",
      );
      return { ...p, openCount: open.length };
    })
    .sort((a, b) => {
      if (b.openCount !== a.openCount) return b.openCount - a.openCount;
      return a.name.localeCompare(b.name, "tr");
    });

  return (
    <div>
      <PageHeader
        title="Avukat ortakları"
        description="Telefon defteri + açık dosyalar. Atama dosya sayfasında yapılır."
        actions={
          <Link
            href="/panel/ortaklar/yeni"
            className="rounded-md bg-pt-emerald-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Ortak ekle
          </Link>
        }
      />

      {directory.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-pt-border bg-pt-surface px-6 py-8 text-sm text-pt-slate-600">
          <p className="font-medium text-pt-aws-ink">Henüz ortak yok</p>
          <p className="mt-2">
            Ad, telefon, e-posta yeterli. Sonra dosyada listeden seçersiniz.
          </p>
        </div>
      ) : (
        <PartnerTable rows={rows} empty="Ortak yok." />
      )}

      {leftover.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-pt-aws-ink">
            Eski etiket (kart yok)
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {leftover.map((name) => (
              <li key={name} className="flex gap-3">
                <span className="text-pt-slate-600">{name}</span>
                <Link
                  href={`/panel/ortaklar/yeni?name=${encodeURIComponent(name)}`}
                  className="text-pt-emerald-600 hover:underline"
                >
                  Kart yap
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
