import type { ServiceItem } from "@/content/types";

type PriceTableProps = {
  item: ServiceItem;
  priceLabel: string;
  compact?: boolean;
};

export function PriceTable({ item, priceLabel, compact }: PriceTableProps) {
  const rows = Array.isArray(item.priceRows) ? item.priceRows : [];

  return (
    <div className={compact ? "mt-4" : "mt-8"}>
      <p className="text-xs font-semibold uppercase tracking-wide text-pt-slate-500">
        {priceLabel}
      </p>
      <p className="mt-1 text-2xl font-semibold text-pt-aws-ink">
        {item.priceFrom}
      </p>
      {rows.length > 0 ? (
        <dl className="mt-3 divide-y divide-pt-border rounded-sm border border-pt-border">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 px-3 py-2 text-sm"
            >
              <dt className="text-pt-slate-600">{row.label}</dt>
              <dd className="shrink-0 font-semibold text-pt-aws-ink">
                {row.amount}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {item.priceNote ? (
        <p className="mt-2 text-xs leading-relaxed text-pt-slate-500">
          {item.priceNote}
        </p>
      ) : null}
    </div>
  );
}
