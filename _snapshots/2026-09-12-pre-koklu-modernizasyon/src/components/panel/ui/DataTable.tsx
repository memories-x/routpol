import type { ReactNode } from "react";
import { PanelEmptyState } from "@/components/panel/ui/PanelEmptyState";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => ReactNode;
};

type Props<T> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  getKey: (row: T) => string;
  empty: string;
  rowClassName?: (row: T) => string | undefined;
  className?: string;
  minWidthClass?: string;
};

export function DataTable<T>({
  rows,
  columns,
  getKey,
  empty,
  rowClassName,
  className = "mt-4",
  minWidthClass = "min-w-[36rem]",
}: Props<T>) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return <PanelEmptyState message={empty} className={className} />;
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return <PanelEmptyState message={empty} className={className} />;
  }

  return (
    <div
      className={`overflow-x-auto rounded-sm border border-pt-border bg-pt-surface shadow-sm ${className}`.trim()}
    >
      <table
        className={`w-full text-left text-sm ${minWidthClass}`.trim()}
      >
        <thead className="border-b border-pt-border bg-pt-surface-alt text-[11px] font-semibold uppercase tracking-wide text-pt-slate-500">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-3 py-2.5 font-semibold ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-pt-border">
          {rows.map((row) => {
            const extra = rowClassName?.(row) ?? "";
            return (
              <tr
                key={getKey(row)}
                className={`hover:bg-pt-surface-alt ${extra}`.trim()}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-2.5 align-middle ${col.className ?? ""}`}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
