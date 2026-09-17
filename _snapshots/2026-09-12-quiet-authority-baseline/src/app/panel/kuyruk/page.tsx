import { CaseRowTable, caseRecordToTableRow } from "@/components/panel/ui/CaseRowTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { SurecHubList } from "@/components/panel/ui/SurecHubList";
import {
  excludeSurecCases,
  groupSurecHubs,
  listCases,
  listQueue,
} from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";

export default async function PanelQueuePage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const all = await listCases();
  const letterQueue = listQueue(excludeSurecCases(all));
  const letterRows = Array.isArray(letterQueue)
    ? letterQueue.map(caseRecordToTableRow)
    : [];
  const surecOpen = groupSurecHubs(all).filter((h) => h.openCount > 0);

  return (
    <div>
      <PageHeader
        title="Kuyruk"
        description="Süreç müşterisi kartta (firma hub). Tek yazı / aylık satır satır."
      />
      {surecOpen.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Süreç müşterileri</h2>
          <SurecHubList hubs={surecOpen} empty="Açık süreç yok." />
        </section>
      ) : null}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Tek yazı / aylık</h2>
        <CaseRowTable rows={letterRows} empty="Mektup / aylık kuyruk boş." />
      </section>
    </div>
  );
}
