import { cx } from "@/lib/ui-classes";

type Props = {
  steps: string[];
  current: number;
};

export function OrderStepIndicator({ steps, current }: Props) {
  const items = Array.isArray(steps) ? steps : [];
  return (
    <ol
      className="mb-8 flex flex-wrap gap-2 sm:gap-0"
      aria-label={items.join(" — ")}
    >
      {items.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            className={cx(
              "flex min-w-0 flex-1 items-center gap-2 text-xs sm:text-sm",
              i > 0 && "sm:pl-2",
            )}
          >
            {i > 0 ? (
              <span
                className={cx(
                  "hidden h-px flex-1 sm:block",
                  done || active ? "bg-pt-emerald-500" : "bg-pt-border",
                )}
                aria-hidden
              />
            ) : null}
            <span
              className={cx(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums",
                active
                  ? "bg-pt-emerald-600 text-white"
                  : done
                    ? "bg-pt-emerald-100 text-pt-emerald-800"
                    : "bg-pt-bg text-pt-slate-500",
              )}
            >
              {n}
            </span>
            <span
              className={cx(
                "truncate font-medium",
                active ? "text-pt-navy-900" : "text-pt-slate-500",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
