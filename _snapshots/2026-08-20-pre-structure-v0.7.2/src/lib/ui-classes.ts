/** Paylaşımlı müşteri yüzeyi sınıfları — hafif shell, 0.8 brief’siz. */

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export const inputClassName =
  "mt-1 w-full rounded-md border border-pt-border bg-pt-surface px-3 py-2 text-sm text-pt-navy-900 disabled:opacity-60";

export const labelClassName = "block text-sm font-medium text-pt-navy-800";

export const btnPrimaryClassName =
  "inline-flex items-center justify-center rounded-md bg-pt-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60";

export const btnSecondaryClassName =
  "inline-flex items-center justify-center rounded-md border border-pt-border bg-pt-surface px-4 py-2.5 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg disabled:opacity-60";

export const cardClassName =
  "rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm";

export const pageTitleClassName = (extra?: string) =>
  cx("font-display text-pt-navy-900", extra);
