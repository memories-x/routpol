import { cx } from "@/lib/ui-classes";

type Props = {
  steps: string[];
  current: number;
  /** i18n: "Adım" / "Krok" / "Step" */
  stepWord?: string;
};

/**
 * Wise-style compact progress: current title + thin bar + numbered rail.
 * Labels sit under dots (never beside in a squeezed column).
 */
export function OrderStepIndicator({
  steps,
  current,
  stepWord = "Adım",
}: Props) {
  const items = Array.isArray(steps) ? steps : [];
  const total = items.length || 1;
  const safeCurrent = Math.min(Math.max(current, 1), total);
  const activeLabel = items[safeCurrent - 1] ?? "";
  const pct = Math.round((safeCurrent / total) * 100);

  return (
    <div className="mb-10 space-y-5" aria-label={items.join(" — ")}>
      <div className="space-y-3">
        <p className="text-sm font-medium text-pt-slate-500">
          {stepWord}{" "}
          <span className="tabular-nums text-pt-navy-900">
            {safeCurrent}
          </span>
          <span className="text-pt-slate-400"> / {total}</span>
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-pt-navy-950 md:text-[1.75rem]">
          {activeLabel}
        </h2>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-pt-border/80"
          role="progressbar"
          aria-valuenow={safeCurrent}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={activeLabel}
        >
          <div
            className="h-full rounded-full bg-pt-emerald-600 transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ol className="flex w-full items-start">
        {items.map((label, i) => {
          const n = i + 1;
          const done = n < safeCurrent;
          const active = n === safeCurrent;
          return (
            <li
              key={`${n}-${label}`}
              className="relative flex min-w-0 flex-1 flex-col items-center px-0.5 text-center"
            >
              {i > 0 ? (
                <span
                  className={cx(
                    "absolute top-3.5 right-1/2 left-[-50%] -z-0 h-px",
                    done || active ? "bg-pt-emerald-500" : "bg-pt-border",
                  )}
                  aria-hidden
                />
              ) : null}
              <span
                className={cx(
                  "relative z-[1] flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200",
                  active
                    ? "bg-pt-emerald-600 text-white shadow-[0_0_0_4px_rgba(5,150,105,0.15)]"
                    : done
                      ? "bg-pt-emerald-600 text-white"
                      : "bg-pt-surface text-pt-slate-500 ring-1 ring-pt-border",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M6.5 11.2 3.3 8l1.1-1.1 2.1 2.1 4.6-4.6L12.2 5.5z"
                    />
                  </svg>
                ) : (
                  n
                )}
              </span>
              <span
                className={cx(
                  "mt-2 max-w-full text-[11px] font-semibold leading-snug sm:text-xs",
                  active ? "text-pt-navy-950" : "text-pt-slate-500",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
