/** Ref-combo shared classes — Quiet Authority tokens. */

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export const inputClassName =
  "mt-1 w-full rounded-xl border border-pt-border bg-pt-surface px-3.5 py-2.5 text-sm text-pt-navy-900 transition-colors focus:border-pt-emerald-600 disabled:opacity-60";

export const labelClassName = "block text-sm font-medium text-pt-navy-800";

/** Stripe-like CTA craft on Quiet Authority emerald. */
export const btnPrimaryClassName =
  "inline-flex items-center justify-center rounded-xl bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_20px_-10px_rgba(5,150,105,0.55)] transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-pt-emerald-500 hover:shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_14px_28px_-12px_rgba(5,150,105,0.55)] active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0";

export const btnSecondaryClassName =
  "inline-flex items-center justify-center rounded-xl border border-pt-border bg-pt-surface px-5 py-3 text-sm font-semibold text-pt-navy-800 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-[color,background-color,box-shadow,transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-pt-navy-300 hover:bg-pt-bg active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0";

export const cardClassName =
  "rounded-2xl border border-pt-border bg-pt-surface p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-24px_rgba(15,23,42,0.35)]";

export function packageCardClassName(featured: boolean): string {
  return featured
    ? "relative flex h-full flex-col overflow-hidden rounded-2xl border border-pt-emerald-600/80 bg-pt-surface p-7 shadow-[0_1px_0_rgba(15,23,42,0.04),0_20px_48px_-30px_rgba(5,150,105,0.4)] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_28px_52px_-24px_rgba(5,150,105,0.48)]"
    : "flex h-full flex-col rounded-2xl border border-pt-border/90 bg-pt-surface p-6 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-pt-emerald-500 hover:bg-pt-emerald-50/30 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.35)]";
}

export const pageTitleClassName = (extra?: string) =>
  cx("font-display font-semibold tracking-tight text-pt-navy-950", extra);
