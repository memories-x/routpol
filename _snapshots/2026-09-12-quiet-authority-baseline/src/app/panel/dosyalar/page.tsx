import { PanelFilters } from "@/components/panel/PanelFilters";
import { CaseRowTable, caseRecordToTableRow } from "@/components/panel/ui/CaseRowTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { filterCaseRecords, listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    package?: string;
  }>;
};

export default async function PanelCasesPage({ searchParams }: PageProps) {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const sp = await searchParams;
  const all = await listCases();
  const cases = filterCaseRecords(all, {
    q: sp.q,
    status: sp.status,
    packageSlug: sp.package,
  });

  const ranked =
    !sp.q && !sp.status && !sp.package
      ? [...cases].sort((a, b) => {
          const rank = (s: string) => {
            if (s === "paid") return 0;
            if (s === "in_progress") return 1;
            if (s === "awaiting_payment") return 2;
            if (s === "closed") return 3;
            return 4;
          };
          const d = rank(a.status) - rank(b.status);
          if (d !== 0) return d;
          return b.updatedAt.localeCompare(a.updatedAt);
        })
      : cases;

  const rows = Array.isArray(ranked)
    ? ranked.map(caseRecordToTableRow)
    : [];

  return (
    <div>
      <PageHeader
        title="Dosyalar"
        description="Tüm süreçler (süreç yönetimi dahil tek tek). Özet ekranı süreç müşterisini kartta toplar. Bekleme: iş kaç gündür duruyor. Sıradaki: açık iş maddesi."
      />

      <Suspense fallback={null}>
        <PanelFilters
          basePath="/panel/dosyalar"
          placeholder="İsim, firma, konu, id…"
          showStatus
          showPackage
        />
      </Suspense>

      <CaseRowTable rows={rows} empty="Dosya bulunamadı." />
    </div>
  );
}
