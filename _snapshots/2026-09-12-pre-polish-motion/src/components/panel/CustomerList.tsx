import { DataTable, type DataTableColumn } from "@/components/panel/ui/DataTable";
import { packageLabelTr } from "@/lib/cases/package-labels";
import type { CustomerSummary } from "@/lib/cases/customers";
import { formatMoney } from "@/lib/cases/money";
import Link from "next/link";

type Props = {
  customers: CustomerSummary[];
  emptyText: string;
};

export function CustomerList({ customers, emptyText }: Props) {
  const rows = Array.isArray(customers) ? customers : [];

  const columns: DataTableColumn<CustomerSummary>[] = [
    {
      key: "name",
      header: "Unvan",
      cell: (c) => (
        <div>
          <Link
            href={`/panel/musteriler/${encodeURIComponent(c.key)}`}
            className="font-medium text-pt-aws-ink hover:underline"
          >
            {c.companyName || c.fullName}
          </Link>
          {c.companyName ? (
            <p className="text-[11px] text-pt-slate-500">{c.fullName}</p>
          ) : null}
        </div>
      ),
    },
    {
      key: "email",
      header: "E-posta",
      cell: (c) => (
        <span className="block max-w-[16rem] truncate text-pt-slate-600" title={c.email}>
          {c.email}
        </span>
      ),
    },
    {
      key: "open",
      header: "Açık / toplam",
      className: "whitespace-nowrap",
      cell: (c) => (
        <span className="text-pt-aws-ink">
          {c.activeCount}/{c.caseCount}
        </span>
      ),
    },
    {
      key: "packages",
      header: "Paketler",
      cell: (c) => (
        <span className="text-pt-slate-600">
          {Array.isArray(c.packages) && c.packages.length > 0
            ? c.packages.map((p) => packageLabelTr(p)).join(", ")
            : "—"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getKey={(c) => c.key}
      empty={emptyText}
    />
  );
}

export { formatMoney };
export { statusLabelTr } from "@/lib/cases/checklist";
