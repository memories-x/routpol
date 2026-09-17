import { formatCallSlotTr } from "@/lib/cases/call-schedule";
import { PackageLabel } from "@/components/panel/ui/PackageLabel";
import { StatusBadge } from "@/components/panel/ui/StatusBadge";
import { DataTable, type DataTableColumn } from "@/components/panel/ui/DataTable";
import {
  agingDays,
  agingLabel,
  caseAgingIso,
  needsAttention,
} from "@/lib/cases/aging";
import { nextChecklistLabel } from "@/lib/cases/checklist";
import { caseFilingLabel } from "@/lib/cases/filing";
import { formatMoney } from "@/lib/cases/money";
import type { CaseRecord } from "@/lib/cases/types";
import Link from "next/link";

export type CaseTableRow = {
  id: string;
  filingLabel: string;
  packageSlug: string;
  status: string;
  updatedAt: string;
  paidAt?: string;
  documentCount: number;
  amountCents?: number;
  currency?: string;
  lawyerPartner?: string;
  nextAction: string;
  callRequestedAt?: string;
};

export function caseRecordToTableRow(c: CaseRecord): CaseTableRow {
  return {
    id: c.id,
    filingLabel: caseFilingLabel({
      companyName: c.customer.companyName,
      fullName: c.customer.fullName,
      matter: c.customer.matter,
    }),
    packageSlug: c.packageSlug,
    status: c.status,
    updatedAt: c.updatedAt,
    paidAt: c.payment?.paidAt,
    documentCount: Array.isArray(c.documents) ? c.documents.length : 0,
    amountCents: c.payment?.amountCents,
    currency: c.payment?.currency,
    lawyerPartner: c.lawyerPartner,
    nextAction: nextChecklistLabel(c.packageSlug, c.checklist, c.status),
    callRequestedAt: c.pricingMeta?.callRequestedAt,
  };
}

type Props = {
  rows: CaseTableRow[];
  empty: string;
  showAmount?: boolean;
};

export function CaseRowTable({ rows, empty, showAmount = false }: Props) {
  const columns: DataTableColumn<CaseTableRow>[] = [
    {
      key: "file",
      header: "Dosya",
      cell: (r) => (
        <div>
          <Link
            href={`/panel/${r.id}`}
            className="line-clamp-2 font-medium text-pt-aws-ink hover:underline"
          >
            {r.filingLabel}
          </Link>
          {r.callRequestedAt ? (
            <p className="text-[11px] text-pt-emerald-700">
              Görüşme: {formatCallSlotTr(r.callRequestedAt)}
            </p>
          ) : null}
          {r.lawyerPartner ? (
            <p className="text-[11px] text-pt-slate-500">{r.lawyerPartner}</p>
          ) : null}
        </div>
      ),
    },
    {
      key: "package",
      header: "Paket",
      cell: (r) => <PackageLabel slug={r.packageSlug} />,
    },
    {
      key: "status",
      header: "Durum",
      cell: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "days",
      header: "Bekleme",
      className: "whitespace-nowrap",
      cell: (r) => {
        const days = agingDays(
          caseAgingIso({
            status: r.status,
            updatedAt: r.updatedAt,
            paidAt: r.paidAt,
          }),
        );
        const hot = needsAttention(r.status, days);
        const hint =
          r.status === "paid"
            ? "Ödemeden beri"
            : r.status === "in_progress"
              ? "Son güncellemeden beri"
              : "Kayıt yaş";
        return (
          <span
            title={hint}
            className={hot ? "font-medium text-pt-danger" : "text-pt-slate-600"}
          >
            {agingLabel(days)}
          </span>
        );
      },
    },
    {
      key: "next",
      header: "Sıradaki",
      cell: (r) => (
        <span className="text-pt-slate-600">{r.nextAction}</span>
      ),
    },
    {
      key: "docs",
      header: "Evrak",
      className: "whitespace-nowrap",
      cell: (r) => (
        <span className="tabular-nums text-pt-slate-600">{r.documentCount}</span>
      ),
    },
  ];

  if (showAmount) {
    columns.push({
      key: "amount",
      header: "Tutar",
      className: "whitespace-nowrap text-right",
      cell: (r) => (
        <span className="font-medium tabular-nums text-pt-aws-ink">
          {typeof r.amountCents === "number"
            ? formatMoney(r.amountCents, r.currency ?? "pln")
            : "—"}
        </span>
      ),
    });
  }

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getKey={(r) => r.id}
      empty={empty}
      rowClassName={(r) =>
        needsAttention(
          r.status,
          agingDays(
            caseAgingIso({
              status: r.status,
              updatedAt: r.updatedAt,
              paidAt: r.paidAt,
            }),
          ),
        )
          ? "bg-pt-danger/5"
          : undefined
      }
    />
  );
}
