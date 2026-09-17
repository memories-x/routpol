import { SmartLink } from "@/components/ui/SmartLink";
import type { DanismanlikContent } from "@/content/danismanlik";
import { btnPrimaryClassName } from "@/lib/ui-classes";

type Props = {
  locale: string;
  content: DanismanlikContent;
};

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

export function DanismanlikPageView({ locale, content }: Props) {
  const who = Array.isArray(content.who) ? content.who : [];
  const offer = Array.isArray(content.offer) ? content.offer : [];
  const limits = Array.isArray(content.limits) ? content.limits : [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
        {content.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
        {content.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-pt-slate-600 md:text-lg">
        {content.lead}
      </p>
      <p className="mt-4 rounded-2xl border border-dashed border-pt-border bg-pt-bg/80 px-4 py-3 text-sm leading-relaxed text-pt-slate-500">
        {content.separateNote}
      </p>

      <h2 className="mt-14 font-display text-xl font-semibold text-pt-navy-950">
        {content.whoTitle}
      </h2>
      <ul className="mt-5 space-y-4">
        {who.map((item) => (
          <li key={item.title}>
            <p className="text-sm font-semibold text-pt-navy-900">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-pt-slate-600">
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-xl font-semibold text-pt-navy-950">
        {content.offerTitle}
      </h2>
      <ul className="mt-5 space-y-5">
        {offer.map((item) => (
          <li key={item.title} className="border-t border-pt-border/80 pt-5">
            <p className="text-sm font-semibold text-pt-navy-900">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-pt-slate-600">
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-xl font-semibold text-pt-navy-950">
        {content.limitsTitle}
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-pt-slate-600">
        {limits.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
        <SmartLink
          href={resolveHref(locale, content.ctaPrimaryHref)}
          className={btnPrimaryClassName}
        >
          {content.ctaPrimary}
        </SmartLink>
        <SmartLink
          href={resolveHref(locale, content.ctaSecondaryHref)}
          className="text-sm font-semibold text-pt-navy-900 hover:text-pt-emerald-700"
        >
          {content.ctaSecondary} →
        </SmartLink>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-pt-slate-500">
        {content.disclaimer}
      </p>
    </article>
  );
}
