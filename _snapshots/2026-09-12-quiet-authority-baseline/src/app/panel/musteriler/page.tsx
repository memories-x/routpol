import { CustomerList } from "@/components/panel/CustomerList";
import { PanelFilters } from "@/components/panel/PanelFilters";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import {
  filterCustomers,
  listCustomerSummaries,
} from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function PanelCustomersPage({ searchParams }: PageProps) {
  if (!(await isPanelAuthenticated())) {
    redirect("/panel/login");
  }

  const sp = await searchParams;
  const all = await listCustomerSummaries();
  const customers = filterCustomers(all, sp.q ?? "");

  return (
    <div>
      <PageHeader
        title="Müşteriler"
        description="Kişi / şirket kartı. Aynı e-posta altındaki tüm süreçler bir arada."
      />

      <Suspense fallback={null}>
        <PanelFilters
          basePath="/panel/musteriler"
          placeholder="İsim, firma, e-posta…"
        />
      </Suspense>

      <CustomerList customers={customers} emptyText="Kayıt bulunamadı." />
    </div>
  );
}
