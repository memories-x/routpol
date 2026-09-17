import { cardClassName, cx, pageTitleClassName } from "@/lib/ui-classes";

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
        "lg:sticky lg:top-24 lg:self-start",
        className,
      )}
      aria-label={title}
    >
      <h2 className={pageTitleClassName("text-lg md:text-xl")}>{title}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-pt-slate-500">{packageLabel}</dt>
          <dd className="mt-0.5 font-medium text-pt-navy-900">{packageName}</dd>
        </div>
        <div>
          <dt className="text-pt-slate-500">{amountLabel}</dt>
          <dd className="mt-0.5 text-xl font-semibold tabular-nums text-pt-navy-900">
            {amount}
          </dd>
        </div>
      </dl>
      {disclaimer ? (
        <p className="mt-4 border-t border-pt-border pt-4 text-xs leading-relaxed text-pt-slate-600">
          {disclaimer}
        </p>
      ) : null}
    </aside>
  );
}
