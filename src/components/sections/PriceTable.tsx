import type { ServiceItem } from "@/content/types";
import Link from "next/link";

type PriceTableProps = {
  item: ServiceItem;
  priceLabel: string;
  compact?: boolean;
  /** Needed for priceQuote CTAs */
  locale?: string;
};

export function PriceTable({
  item,
  priceLabel,
  compact,
  locale = "tr",
}: PriceTableProps) {
  const rows = Array.isArray(item.priceRows) ? item.priceRows : [];
  const quote = item.priceQuote;
  const quoteHref = quote
    ? `/${locale}${quote.href.startsWith("?") || quote.href.startsWith("#") ? quote.href : `/${quote.href}`}`
    : "";

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
          {quote ? (
            <div className="flex flex-col gap-2 px-3 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <dt className="text-pt-slate-600">{quote.label}</dt>
              <dd className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Link
                  href={quoteHref}
                  className="font-semibold text-pt-emerald-700 hover:underline"
                >
                  {quote.getPriceLabel} →
                </Link>
                <Link
                  href={quoteHref}
                  className="font-semibold text-pt-navy-900 hover:text-pt-emerald-700 hover:underline"
                >
                  {quote.talkLabel} →
                </Link>
              </dd>
            </div>
          ) : null}
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
