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
 * Wise-inspired Quiet Authority hero.
 * Refs: wise.com (cross-border clarity + calm motion), stripe.com (CTA hierarchy).
 * Not a Wise clone — POL-TURK serif/emerald/belge demo.
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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pt-emerald-600/45"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            size="hero"
            priority
          />

          <p className="mt-9 text-xs font-semibold uppercase tracking-[0.16em] text-pt-emerald-700">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[16ch] font-display text-[2.05rem] font-semibold leading-[1.1] tracking-tight text-pt-navy-950 md:text-[3rem] md:leading-[1.06]">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-lg border-l-2 border-pt-emerald-600 pl-4 text-sm leading-relaxed text-pt-slate-600">
            {content.hero.valueLine}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <SmartLink
              href={primaryHref}
              className="inline-flex rounded-lg bg-pt-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pt-emerald-500"
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
            <p className="mt-9 max-w-md text-xs leading-relaxed text-pt-slate-500">
              {trustLine}
            </p>
          ) : null}
        </motion.div>

        <motion.aside
          initial={motionOff ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: motionOff ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
          aria-label={content.hero.demo.label}
        >
          {/* Soft wash — Wise-like calm, not grey mist */}
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-pt-emerald-50/60"
            aria-hidden
          />

          <div className="overflow-hidden rounded-2xl border border-pt-border bg-pt-surface shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between gap-3 border-b border-pt-border px-5 py-4 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-pt-navy-800">
                {content.hero.demo.label}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-pt-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-800">
                PL
                <span className="text-pt-emerald-600" aria-hidden>
                  →
                </span>
                TR
              </span>
            </div>

            <dl className="px-5 py-2 md:px-6">
              {rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={motionOff ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: motionOff ? 0 : 0.18 + i * 0.07,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 border-b border-pt-border/80 py-3.5 last:border-0"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pt-emerald-50 text-[11px] font-bold text-pt-emerald-700">
                    {i + 1}
                  </span>
                  <dt className="flex-1 text-sm text-pt-slate-500">{row.label}</dt>
                  <dd className="max-w-[45%] text-right text-sm font-semibold text-pt-navy-900">
                    {row.value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <p className="border-t border-pt-border px-5 py-4 text-xs leading-relaxed text-pt-slate-500 md:px-6">
              {content.hero.demo.footnote}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
