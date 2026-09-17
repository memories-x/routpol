import { cardClassName, cx } from "@/lib/ui-classes";

type Props = {
  title: string;
  packageLabel: string;
  packageName: string;
  amountLabel: string;
  amount: string;
  disclaimer?: string;
  className?: string;
};

export function OrderSummaryCard({
  title,
  packageLabel,
  packageName,
  amountLabel,
  amount,
  disclaimer,
  className,
}: Props) {
  return (
    <aside
      className={cx(
        cardClassName,
        "border-pt-border/70 bg-pt-surface lg:sticky lg:top-24 lg:self-start",
        className,
      )}
      aria-label={title}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-pt-slate-500">
        {title}
      </p>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight tabular-nums text-pt-navy-950">
        {amount}
      </p>
      <p className="mt-1 text-sm text-pt-slate-500">{amountLabel}</p>
      <div className="mt-5 border-t border-pt-border/80 pt-4">
        <p className="text-xs text-pt-slate-500">{packageLabel}</p>
        <p className="mt-1 text-sm font-semibold text-pt-navy-900">
          {packageName}
        </p>
      </div>
      {disclaimer ? (
        <p className="mt-5 text-xs leading-relaxed text-pt-slate-500">
          {disclaimer}
        </p>
      ) : null}
    </aside>
  );
}
