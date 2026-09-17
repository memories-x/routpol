import { cx } from "@/lib/ui-classes";

type Props = {
  steps: string[];
  current: number;
  /** i18n: "Adım" / "Krok" / "Step" */
  stepWord?: string;
};

/**
 * Başvuru adımları — kesilmiş / dikey harf sarımı yok.
 * Üstte ilerleme + büyük etiket; altta her satırda tam yazılı adımlar.
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
    <div className="mb-8 space-y-4" aria-label={items.join(" — ")}>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-base font-semibold text-pt-navy-950 md:text-lg">
            {stepWord} {safeCurrent} / {total}
            <span className="text-pt-slate-500"> · </span>
            <span className="text-pt-emerald-800">{activeLabel}</span>
          </p>
          <span className="shrink-0 text-xs font-medium tabular-nums text-pt-slate-500">
            %{pct}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-pt-border"
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

      {/* Form kolonu dar — tek sütun; 4’lü grid harf-harf dikey sarıyordu */}
      <ol className="grid grid-cols-1 gap-2">
        {items.map((label, i) => {
          const n = i + 1;
          const done = n < safeCurrent;
          const active = n === safeCurrent;
          return (
            <li key={`${n}-${label}`}>
              <div
                className={cx(
                  "flex min-h-[3rem] items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-200",
                  active
                    ? "border-pt-emerald-600 bg-pt-emerald-50 shadow-sm"
                    : done
                      ? "border-pt-emerald-200 bg-pt-surface"
                      : "border-pt-border bg-pt-bg/50",
                )}
              >
                <span
                  className={cx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    active || done
                      ? "bg-pt-emerald-600 text-white"
                      : "bg-pt-surface text-pt-slate-500 ring-1 ring-pt-border",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : n}
                </span>
                <span
                  className={cx(
                    "text-sm font-semibold leading-snug",
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
    </div>
  );
}
