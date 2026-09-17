import { ActivePeriodsPanel } from "@/components/panel/ActivePeriodsPanel";
import { CaseRowTable, caseRecordToTableRow } from "@/components/panel/ui/CaseRowTable";
import { CustomerList } from "@/components/panel/CustomerList";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { StatCard } from "@/components/panel/ui/StatCard";
import { SurecHubList } from "@/components/panel/ui/SurecHubList";
import {
  agingDays,
  caseAgingIso,
  needsAttention,
} from "@/lib/cases/aging";
import {
  excludeSurecCases,
  getPanelStats,
  groupSurecHubs,
  listCustomerSummaries,
  listPanelCases,
  listQueue,
} from "@/lib/cases/store";
import { listActivePeriodsForPanel } from "@/lib/customer-portal/panel-periods";
import { countQuoteLeadsByStatus, listQuoteLeads } from "@/lib/leads/store";
import { leadServiceLabel } from "@/lib/leads/labels";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PanelHomePage() {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const [stats, customers, cases, activePeriods, newLeads, newLeadCount] =
    await Promise.all([
      getPanelStats(),
      listCustomerSummaries(),
      listPanelCases(),
      listActivePeriodsForPanel(),
      listQuoteLeads({ status: "new", limit: 8 }),
      countQuoteLeadsByStatus("new"),
    ]);

  const safeCases = Array.isArray(cases) ? cases : [];
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const letterCases = excludeSurecCases(safeCases);
  const surecHubs = groupSurecHubs(safeCases);
  const surecOpen = surecHubs.filter((h) => h.openCount > 0);
  const surecAttention = surecHubs.filter((h) => h.attention);
  const safeNewLeads = Array.isArray(newLeads) ? newLeads : [];

  const letterQueue = listQueue(letterCases);
  const queue = letterQueue.slice(0, 12);
  const letterAttention = letterQueue.filter((c) =>
    needsAttention(
      c.status,
      agingDays(
        caseAgingIso({
          status: c.status,
          updatedAt: c.updatedAt,
          paidAt: c.payment?.paidAt,
        }),
      ),
    ),
  );
  const recentCustomers = safeCustomers.slice(0, 8);
  const recentCases = letterCases.slice(0, 8);

  const tiles = [
    {
      label: "Yeni temas",
      value: newLeadCount,
      href: "/panel/temas?status=new",
    },
    { label: "Müşteri", value: stats.customers, href: "/panel/musteriler" },
    { label: "Dosya", value: stats.cases, href: "/panel/dosyalar" },
    {
      label: "Süreç müşterisi",
      value: surecHubs.length,
      href: "/panel/musteriler",
    },
    {
      label: "Ödendi",
      value: stats.paid,
      href: "/panel/dosyalar?status=paid",
    },
    {
      label: "Hazırlanıyor",
      value: stats.inProgress,
      href: "/panel/dosyalar?status=in_progress",
    },
    {
      label: "Ödeme bekliyor",
      value: stats.awaitingPayment,
      href: "/panel/dosyalar?status=awaiting_payment",
    },
  ];

  const preview = safeCases.some((c) => c.id.startsWith("case_seed_"));

  return (
    <div>
      {preview ? (
        <p className="mb-4 rounded-md border border-pt-aws-ink/15 bg-pt-aws-ink px-3 py-2 text-xs text-white">
          Örnek operasyon verisi — canlı müşteri değil. Kaldırmak:{" "}
          <code className="text-white/80">npm run panel:preview -- --clear</code>
        </p>
      ) : null}
      <PageHeader
        title="Operasyon özeti"
        description="Günlük: temas → kuyruk → işle → sonuç yükle. Aylık kota müşteride (/hesabim). Ay sonu: Faturalar → ZIP → muhasebeci."
        actions={
          <>
            <a
              href="/api/panel/export/cases"
              className="rounded-md border border-pt-border px-3 py-2 text-sm font-medium hover:bg-pt-surface"
            >
              CSV dosyalar
            </a>
            <a
              href="/api/panel/export/customers"
              className="rounded-md border border-pt-border px-3 py-2 text-sm font-medium hover:bg-pt-surface"
            >
              CSV müşteriler
            </a>
          </>
        }
      />

      {newLeadCount > 0 ? (
        <section className="mt-6 rounded-lg border-2 border-pt-emerald-600/40 bg-pt-emerald-50/50 px-4 py-4 md:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-pt-navy-900">
                Yeni temas talepleri
              </h2>
              <p className="mt-1 text-sm text-pt-slate-600">
                {newLeadCount} kişi dönüş bekliyor — WhatsApp veya e-posta ile
                yanıtlayın.
              </p>
            </div>
            <Link
              href="/panel/temas?status=new"
              className="shrink-0 rounded-md bg-pt-navy-900 px-3 py-2 text-sm font-medium text-white hover:bg-pt-navy-800"
            >
              Temas listesi
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-pt-border rounded-md border border-pt-border bg-pt-surface">
            {safeNewLeads.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-sm"
              >
                <div>
                  <p className="font-medium text-pt-navy-900">{lead.fullName}</p>
                  <p className="text-xs text-pt-slate-500">
                    {leadServiceLabel(lead.serviceType)} · {lead.phoneE164}
                    {lead.likelyDuplicate ? " · olası tekrar" : ""}
                  </p>
                </div>
                <Link
                  href="/panel/temas?status=new"
                  className="text-xs font-semibold text-pt-emerald-700 hover:underline"
                >
                  Aç
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {letterAttention.length > 0 || surecAttention.length > 0 ? (
        <section className="mt-6 rounded-lg border-2 border-amber-400/50 bg-amber-50 px-4 py-4 md:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-pt-navy-900">
                Bugün öncelik
              </h2>
              <p className="mt-1 text-sm text-pt-slate-600">
                {letterAttention.length + surecAttention.length} dosya 3+ gün
                bekliyor — önce bunları kapatın.
              </p>
            </div>
            <a
              href="/panel/kuyruk"
              className="shrink-0 rounded-md bg-pt-navy-900 px-3 py-2 text-sm font-medium text-white hover:bg-pt-navy-800"
            >
              Tüm kuyruk
            </a>
          </div>
          <div className="mt-4 space-y-4">
            {surecAttention.length > 0 ? (
              <SurecHubList
                hubs={surecAttention}
                empty="Süreç dikkat listesi boş."
              />
            ) : null}
            {letterAttention.length > 0 ? (
              <CaseRowTable
                rows={letterAttention.map(caseRecordToTableRow)}
                empty="Dikkat listesi boş."
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {stats.cases === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-pt-border bg-pt-surface px-6 py-8 text-sm text-pt-slate-600">
          <p className="font-medium text-pt-aws-ink">Henüz dosya yok</p>
          <p className="mt-2">
            İlk sipariş siteden gelir:{" "}
            <code className="text-xs">/tr/basvuru</code> → ödeme → burada
            listelenir. Mektubu indirin, sonucu yükleyin, durumu güncelleyin.
          </p>
        </div>
      ) : null}

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {tiles.map((t) => (
          <li key={t.label}>
            <StatCard label={t.label} value={t.value} href={t.href} />
          </li>
        ))}
      </ul>

      <ActivePeriodsPanel periods={activePeriods} />

      {surecOpen.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Süreç müşterileri</h2>
          <p className="mt-1 text-xs text-pt-slate-500">
            Aynı e-posta altındaki vekaletli süreçler tek kart. Tıklayınca firma
            kartı — konular üst üste binmez.
          </p>
          <SurecHubList
            hubs={surecOpen}
            empty="Açık süreç müşterisi yok."
          />
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Bugün kuyruğu</h2>
        <p className="mt-1 text-xs text-pt-slate-500">
          Tek yazı ve aylık paket — ödendi + hazırlanıyor. Süreç işi yukarıdaki
          kartlarda.
        </p>
        <CaseRowTable
          rows={queue.map(caseRecordToTableRow)}
          empty="Mektup / aylık kuyruk boş."
        />
      </section>

      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold">Son müşteriler</h2>
          <CustomerList
            customers={recentCustomers}
            emptyText="Henüz müşteri yok."
          />
        </section>
        <section>
          <h2 className="text-lg font-semibold">Son mektup / aylık</h2>
          <CaseRowTable
            rows={recentCases.map(caseRecordToTableRow)}
            empty="Henüz dosya yok."
          />
        </section>
      </div>
    </div>
  );
}
