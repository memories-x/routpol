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

  return (
    <section className="relative overflow-hidden border-b border-pt-border bg-pt-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pt-emerald-600/40"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            size="hero"
            priority
          />

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-pt-emerald-700">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-pt-navy-950 md:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-pt-emerald-600 pl-4 text-sm leading-relaxed text-pt-slate-600">
            {content.hero.valueLine}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SmartLink
              href={primaryHref}
              className="inline-flex rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500"
            >
              {content.hero.ctaPrimary}
            </SmartLink>
            <SmartLink
              href={secondaryHref}
              className="inline-flex rounded-md border border-pt-border bg-pt-surface px-5 py-3 text-sm font-semibold text-pt-navy-900 hover:bg-pt-surface-alt"
            >
              {content.hero.ctaSecondary}
            </SmartLink>
          </div>
        </motion.div>

        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="border border-pt-border bg-pt-surface p-5 md:p-6"
          aria-label={content.hero.demo.label}
        >
          <div className="flex items-center justify-between gap-3 border-b border-pt-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-pt-emerald-700">
              {content.hero.demo.label}
            </p>
            <span className="text-[10px] font-medium uppercase tracking-wide text-pt-slate-400">
              PL → TR
            </span>
          </div>
          <dl className="mt-5 space-y-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 border-b border-pt-border pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-pt-slate-500">{row.label}</dt>
                <dd className="text-right text-sm font-semibold text-pt-navy-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-pt-slate-500">
            {content.hero.demo.footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
