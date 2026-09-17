import { cx } from "@/lib/ui-classes";

type Props = {
  steps: string[];
  current: number;
};

/**
 * Modern başvuru stepper — no truncated labels, clear progress rail.
 */
export function OrderStepIndicator({ steps, current }: Props) {
  const items = Array.isArray(steps) ? steps : [];

  return (
    <nav aria-label={items.join(" — ")} className="mb-8">
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
        {items.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={label} className="relative min-w-0">
              {i < items.length - 1 ? (
                <span
                  className={cx(
                    "pointer-events-none absolute left-[calc(50%+1.1rem)] right-[-0.5rem] top-3.5 hidden h-0.5 sm:block",
                    done || active ? "bg-pt-emerald-500" : "bg-pt-border",
                  )}
                  aria-hidden
                />
              ) : null}
              <div
                className={cx(
                  "relative flex flex-col items-start gap-2 rounded-xl border px-3 py-3 transition-colors duration-200 sm:items-center sm:text-center",
                  active
                    ? "border-pt-emerald-600 bg-pt-emerald-50/70 shadow-sm"
                    : done
                      ? "border-pt-emerald-200 bg-pt-surface"
                      : "border-pt-border bg-pt-bg/60",
                )}
              >
                <span
                  className={cx(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold tabular-nums transition-colors duration-200",
                    active
                      ? "bg-pt-emerald-600 text-white"
                      : done
                        ? "bg-pt-emerald-600 text-white"
                        : "bg-pt-surface text-pt-slate-500 ring-1 ring-pt-border",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : n}
                </span>
                <span
                  className={cx(
                    "w-full text-left text-xs font-semibold leading-snug sm:text-center sm:text-[13px]",
                    active ? "text-pt-navy-950" : "text-pt-slate-600",
                  )}
                >
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
