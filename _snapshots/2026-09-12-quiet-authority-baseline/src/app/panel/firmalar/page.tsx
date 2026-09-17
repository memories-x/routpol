import { CustomerList } from "@/components/panel/CustomerList";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { listCompanies, listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";

export default async function PanelCompaniesPage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const companies = listCompanies(await listCases());

  return (
    <div>
      <PageHeader
        title="Firmalar"
        description="Firma unvanı dolu müşteri kartları — tüm süreçler kartta."
      />
      <CustomerList
        customers={companies}
        emptyText="Henüz firma kaydı yok."
      />
    </div>
  );
}
