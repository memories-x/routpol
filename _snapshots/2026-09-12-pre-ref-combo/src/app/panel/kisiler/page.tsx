import { CustomerList } from "@/components/panel/CustomerList";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { listIndividuals, listCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";

export default async function PanelIndividualsPage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const people = listIndividuals(await listCases());

  return (
    <div>
      <PageHeader
        title="Kişiler"
        description="Firma unvanı olmayan bireysel müşteriler."
      />
      <CustomerList customers={people} emptyText="Henüz bireysel kayıt yok." />
    </div>
  );
}
