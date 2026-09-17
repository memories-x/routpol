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

/** Quiet Authority hero — brand first, document demo, clear CTA hierarchy. */
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

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <motion.div
          initial={motionOff ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
          <h1 className="mt-4 max-w-[16ch] font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-pt-navy-950 md:text-5xl md:leading-[1.1]">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-xl border-l-2 border-pt-emerald-600 pl-4 text-sm leading-relaxed text-pt-slate-600">
            {content.hero.valueLine}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <SmartLink
              href={primaryHref}
              className="inline-flex rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pt-emerald-500"
            >
              {content.hero.ctaPrimary}
            </SmartLink>
            <SmartLink
              href={secondaryHref}
              className="text-sm font-semibold text-pt-navy-900 underline-offset-4 transition-colors hover:text-pt-emerald-700 hover:underline"
            >
              {content.hero.ctaSecondary}
            </SmartLink>
          </div>

          {trustLine ? (
            <p className="mt-10 max-w-lg text-xs leading-relaxed text-pt-slate-500">
              {trustLine}
            </p>
          ) : null}
        </motion.div>

        <motion.aside
          initial={motionOff ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: motionOff ? 0 : 0.05,
            ease: "easeOut",
          }}
          className="bg-pt-surface"
          aria-label={content.hero.demo.label}
        >
          <div className="h-1 w-full bg-pt-emerald-600" aria-hidden />
          <div className="border border-t-0 border-pt-border px-5 py-5 md:px-6 md:py-6">
            <div className="flex items-center justify-between gap-3 border-b border-pt-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-pt-navy-800">
                {content.hero.demo.label}
              </p>
              <span className="text-[10px] font-medium uppercase tracking-wide text-pt-slate-400">
                PL → TR
              </span>
            </div>
            <dl className="mt-1">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-4 border-b border-pt-border/90 py-3.5 last:border-0"
                >
                  <dt className="text-sm text-pt-slate-500">{row.label}</dt>
                  <dd className="max-w-[55%] text-right text-sm font-semibold text-pt-navy-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-pt-slate-500">
              {content.hero.demo.footnote}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
