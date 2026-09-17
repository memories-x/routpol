import {
  DataTable,
  type DataTableColumn,
} from "@/components/panel/ui/DataTable";
import type { LawyerPartner } from "@/lib/partners/types";
import Link from "next/link";

export type PartnerTableRow = LawyerPartner & {
  openCount: number;
};

type Props = {
  rows: PartnerTableRow[];
  empty: string;
};

export function PartnerTable({ rows, empty }: Props) {
  const list = Array.isArray(rows) ? rows : [];
  const columns: DataTableColumn<PartnerTableRow>[] = [
    {
      key: "name",
      header: "Ortak",
      cell: (r) => (
        <div>
          <Link
            href={`/panel/ortaklar/${r.id}`}
            className="font-medium text-pt-aws-ink hover:underline"
          >
            {r.name}
          </Link>
          {r.officeName || r.city ? (
            <p className="text-[11px] text-pt-slate-500">
              {[r.officeName, r.city].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      key: "phone",
      header: "Telefon",
      cell: (r) =>
        r.phone ? (
          <a
            href={`tel:${r.phone}`}
            className="text-pt-emerald-600 hover:underline"
          >
            {r.phone}
          </a>
        ) : (
          "—"
        ),
    },
    {
      key: "email",
      header: "E-posta",
      cell: (r) =>
        r.email ? (
          <a
            href={`mailto:${r.email}`}
            className="block max-w-[14rem] truncate text-pt-emerald-600 hover:underline"
            title={r.email}
          >
            {r.email}
          </a>
        ) : (
          "—"
        ),
    },
    {
      key: "open",
      header: "Açık dosya",
      className: "text-right whitespace-nowrap",
      cell: (r) => r.openCount,
    },
  ];

  return (
    <DataTable
      rows={list}
      columns={columns}
      getKey={(r) => r.id}
      empty={empty}
      minWidthClass="min-w-[28rem]"
      rowClassName={(r) => (!r.active ? "opacity-60" : undefined)}
    />
  );
}
