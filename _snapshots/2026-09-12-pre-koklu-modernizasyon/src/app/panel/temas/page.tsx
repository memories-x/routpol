import { LeadFilters } from "@/components/panel/LeadFilters";
import { LeadInboxTable } from "@/components/panel/LeadInboxTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { StatCard } from "@/components/panel/ui/StatCard";
import {
  countQuoteLeadsByStatus,
  listQuoteLeads,
  type QuoteLeadStatus,
} from "@/lib/leads/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

function parseStatus(raw: string | undefined): QuoteLeadStatus | "all" {
  if (raw === "new" || raw === "contacted" || raw === "closed") return raw;
  return "all";
}

export default async function PanelTemasPage({ searchParams }: PageProps) {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const sp = await searchParams;
  const status = parseStatus(sp.status);
  const q = sp.q?.trim() ?? "";

  const [leads, newCount, contactedCount, closedCount] = await Promise.all([
    listQuoteLeads({ status, q }),
    countQuoteLeadsByStatus("new"),
    countQuoteLeadsByStatus("contacted"),
    countQuoteLeadsByStatus("closed"),
  ]);

  return (
    <div>
      <PageHeader
        title="Temas talepleri"
        description="Formdan gelen yatırım / kuruluş ve iletişim talepleri. WhatsApp veya e-posta ile dönüşü siz başlatırsınız; tıklanınca kayıt ‘Dönüldü’ olur."
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Yeni" value={newCount} href="/panel/temas?status=new" />
        <StatCard
          label="Dönüldü"
          value={contactedCount}
          href="/panel/temas?status=contacted"
        />
        <StatCard
          label="Kapalı"
          value={closedCount}
          href="/panel/temas?status=closed"
        />
      </div>

      <Suspense fallback={null}>
        <LeadFilters newCount={newCount} />
      </Suspense>

      <LeadInboxTable leads={leads} />
    </div>
  );
}
