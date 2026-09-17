"use client";

import type { LandingContent } from "@/content/landing";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SmartLink } from "@/components/ui/SmartLink";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  content: LandingContent;
  locale: string;
};

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

/**
 * Ref combo hero: Clerk product-demo panel + Pitch staggered motion +
 * Mercury open breath. Quiet Authority DNA (serif, emerald, belge).
 */
export function LandingHero({ content, locale }: Props) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const motionOff = !ready || Boolean(reduce);
  const rows = Array.isArray(content.hero.demo.rows)
    ? content.hero.demo.rows
    : [];
  const primaryHref = resolveHref(
    locale,
    content.hero.ctaPrimaryHref ?? "/hizmetler#paketler",
  );
  const secondaryHref = resolveHref(
    locale,
    content.hero.ctaSecondaryHref ?? "/hizmetler",
  );
  const trustLine = Array.isArray(content.trust.badges)
    ? content.trust.badges.slice(0, 3).join(" · ")
    : "";

  return (
    <section className="relative overflow-hidden border-b border-pt-border bg-pt-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pt-emerald-600/40"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            size="hero"
            priority
          />

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-pt-emerald-700">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[15ch] font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-pt-navy-950 md:text-[3.1rem] md:leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-pt-slate-500">
            {content.hero.valueLine}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SmartLink
              href={primaryHref}
              className="inline-flex rounded-xl bg-pt-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pt-emerald-500"
            >
              {content.hero.ctaPrimary}
            </SmartLink>
            <SmartLink
              href={secondaryHref}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-pt-navy-900 transition-colors hover:text-pt-emerald-700"
            >
              {content.hero.ctaSecondary}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </SmartLink>
          </div>

          {trustLine ? (
            <p className="mt-10 max-w-md text-xs leading-relaxed text-pt-slate-500">
              {trustLine}
            </p>
          ) : null}
        </motion.div>

        {/* Clerk-style product demo — belge sahnesi */}
        <motion.aside
          initial={motionOff ? false : { opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.55,
            delay: motionOff ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
          aria-label={content.hero.demo.label}
        >
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-pt-emerald-50/80 via-pt-bg to-pt-bg"
            aria-hidden
          />

          <div className="overflow-hidden rounded-[1.25rem] border border-pt-border bg-pt-surface shadow-[0_24px_56px_-32px_rgba(15,23,42,0.45)]">
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-pt-border bg-pt-bg/80 px-4 py-3 md:px-5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
              </div>
              <p className="flex-1 truncate text-center text-[11px] font-medium text-pt-slate-500">
                {content.hero.demo.label}
              </p>
              <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-700">
                PL → TR
              </span>
            </div>

            {/* Nested document sheet */}
            <div className="bg-pt-bg/50 p-4 md:p-5">
              <div className="rounded-xl border border-pt-border bg-pt-surface px-4 py-1 shadow-sm md:px-5">
                <dl>
                  {rows.map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={motionOff ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: motionOff ? 0 : 0.22 + i * 0.09,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-baseline justify-between gap-4 border-b border-pt-border/70 py-3.5 last:border-0"
                    >
                      <dt className="text-sm text-pt-slate-500">{row.label}</dt>
                      <dd className="text-right text-sm font-semibold text-pt-navy-900">
                        {row.value}
                      </dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 px-1 text-xs leading-relaxed text-pt-slate-500">
                {content.hero.demo.footnote}
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
