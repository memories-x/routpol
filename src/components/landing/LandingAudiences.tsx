"use client";

import { PtReveal } from "@/components/ui/PtReveal";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import { getServiceIcon } from "@/lib/icons";

type Props = { content: LandingContent; locale: string };

/**
 * Hostinger “Tools for every…” rhythm: eyebrow + large title + intro + link grid.
 * Quiet Authority colors; no invented metrics / card wall clutter.
 */
export function LandingAudiences({ content, locale }: Props) {
  const A = content.audiences;
  const items = Array.isArray(A.items) ? A.items : [];

  return (
    <section
      id="kim-icin"
      className="scroll-mt-20 border-t border-pt-border bg-pt-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PtReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
            {A.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-5xl">
            {A.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {A.intro}
          </p>
        </PtReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {items.map((item, i) => {
            const Icon = getServiceIcon(item.icon);
            const href = item.href.startsWith("#")
              ? `/${locale}${item.href}`
              : item.href.startsWith("/")
                ? `/${locale}${item.href}`
                : `/${locale}/${item.href}`;
            const points = Array.isArray(item.points) ? item.points.slice(0, 2) : [];

            return (
              <PtReveal key={item.id} delay={0.05 + i * 0.04} className="h-full">
                <SmartLink
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-pt-border bg-pt-bg/40 p-6 transition-colors hover:border-pt-emerald-600/40 hover:bg-pt-emerald-50/30 md:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pt-emerald-50 text-pt-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-pt-navy-950 md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-pt-slate-600">
                    {item.body}
                  </p>
                  {points.length > 0 ? (
                    <ul className="mt-4 space-y-1.5 border-t border-pt-border/80 pt-4">
                      {points.map((p) => (
                        <li
                          key={p}
                          className="text-xs leading-snug text-pt-slate-500"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-5 text-sm font-semibold text-pt-emerald-700 transition-colors group-hover:text-pt-emerald-600">
                    {item.ctaLabel} →
                  </span>
                </SmartLink>
              </PtReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
