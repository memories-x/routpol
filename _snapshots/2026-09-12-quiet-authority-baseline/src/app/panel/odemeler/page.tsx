import { CaseRowTable, caseRecordToTableRow } from "@/components/panel/ui/CaseRowTable";
import { PageHeader } from "@/components/panel/ui/PageHeader";
import { formatMoney } from "@/lib/cases/money";
import { listCases, listPaidCases } from "@/lib/cases/store";
import { isPanelAuthenticated } from "@/lib/panel-auth";
import { redirect } from "next/navigation";

export default async function PanelPaymentsPage() {
  if (!(await isPanelAuthenticated())) redirect("/panel/login");

  const paid = listPaidCases(await listCases());
  const rows = Array.isArray(paid) ? paid.map(caseRecordToTableRow) : [];
  const totalCents = (Array.isArray(paid) ? paid : []).reduce(
    (s, c) =>
      s + (typeof c.payment.amountCents === "number" ? c.payment.amountCents : 0),
    0,
  );
  const currency = paid[0]?.payment.currency ?? "pln";

  return (
    <div>
      <PageHeader
        title="Ödemeler"
        description="Stripe / ödeme kaydı — payment.status = paid. Yasal fatura muhasebecide; ay paketi Faturalar’da."
      />
      {rows.length > 0 ? (
        <p className="mt-4 text-sm font-medium text-pt-aws-ink">
          Toplam (listelenen): {formatMoney(totalCents, currency)} · {rows.length}{" "}
          kayıt
        </p>
      ) : null}
      <CaseRowTable
        rows={rows}
        empty="Henüz ödeme yok."
        showAmount
      />
    </div>
  );
}
