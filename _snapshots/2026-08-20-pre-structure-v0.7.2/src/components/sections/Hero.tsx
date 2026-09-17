"use client";

import type { SiteContent } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { btnPrimaryClassName, btnSecondaryClassName } from "@/lib/ui-classes";

type HeroProps = {
  content: SiteContent;
  locale: string;
};

export function Hero({ content, locale }: HeroProps) {
  const wa = buildWhatsAppUrl(content.system.whatsappPrefill);
  const badges = Array.isArray(content.hero.badges) ? content.hero.badges : [];
  const demo = content.hero.documentDemo;
  const rows = Array.isArray(demo?.rows) ? demo.rows : [];

  return (
    <section className="relative overflow-hidden border-b border-pt-border">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pt-navy-950 via-pt-navy-900 to-pt-navy-800"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(16,185,129,0.12)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-24">
        <div className="max-w-xl lg:max-w-none">
          {content.hero.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pt-emerald-400">
              {content.hero.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 font-display text-3xl leading-[1.15] text-white md:text-[2.75rem] lg:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            {content.hero.subtitle}
          </p>

          {badges.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-md border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/90 md:text-sm"
                >
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/${locale}/basvuru`}
              className={`${btnPrimaryClassName} px-6 py-3`}
            >
              {content.hero.ctaPrimary}
            </a>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnSecondaryClassName} border-white/20 bg-white/5 text-white hover:bg-white/10`}
              >
                {content.hero.ctaSecondary}
              </a>
            ) : null}
          </div>

          {content.hero.trustLine ? (
            <p className="mt-6 max-w-lg text-xs leading-relaxed text-white/55 md:text-sm">
              {content.hero.trustLine}
            </p>
          ) : null}
        </div>

        {rows.length > 0 ? (
          <div className="mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
            <div className="rounded-xl border border-white/12 bg-white/95 p-5 text-pt-navy-900 shadow-xl shadow-pt-navy-950/30 md:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-pt-border pb-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-pt-emerald-700">
                  {demo.docLabel}
                </p>
                {Array.isArray(demo.keywords) && demo.keywords.length > 0 ? (
                  <p className="truncate text-[10px] uppercase tracking-wide text-pt-slate-400">
                    {demo.keywords.join(" · ")}
                  </p>
                ) : null}
              </div>
              <dl className="mt-4 space-y-3">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-pt-border/80 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-pt-slate-500">{row.label}</dt>
                    <dd className="text-right text-sm font-medium text-pt-navy-900">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {demo.footnote ? (
              <p className="mt-3 text-center text-xs text-white/45 lg:text-left">
                {demo.footnote}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
