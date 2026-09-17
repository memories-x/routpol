"use client";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { HeroDemoPanel } from "@/components/landing/HeroDemoPanel";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import { btnPrimaryClassName } from "@/lib/ui-classes";

type Props = {
  content: LandingContent;
  locale: string;
};

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

/** Quiet Authority hero — brand, copy, CTAs, demo. Trade line lives on Bridge. */
export function LandingHero({ content, locale }: Props) {
  const primaryHref = resolveHref(
    locale,
    content.hero.ctaPrimaryHref ?? "/danismanlik",
  );
  const secondaryHref = resolveHref(
    locale,
    content.hero.ctaSecondaryHref ?? "/hizmetler#paketler",
  );
  const trustLine = Array.isArray(content.trust.badges)
    ? content.trust.badges.slice(0, 3).join(" · ")
    : "";

  return (
    <section className="relative overflow-hidden border-b border-pt-border bg-pt-bg">
      <div className="pt-hero-ambient pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pt-emerald-600/40"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="pt-hero-copy">
          <BrandLockup
            name={content.brand.name}
            tagline={content.brand.tagline}
            size="hero"
            priority
          />
          {content.brand.secondName ? (
            <p className="mt-3 text-xs font-medium tracking-wide text-pt-slate-500">
              {content.brand.secondName}
              {content.brand.secondLineHint ? (
                <>
                  <span className="text-pt-slate-400"> · </span>
                  <span className="font-normal">
                    {content.brand.secondLineHint}
                  </span>
                </>
              ) : null}
            </p>
          ) : null}

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-pt-emerald-700">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[18ch] font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-pt-navy-950 md:text-[3.1rem] md:leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-pt-slate-600 md:text-lg">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-pt-slate-500">
            {content.hero.valueLine}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SmartLink href={primaryHref} className={btnPrimaryClassName}>
              {content.hero.ctaPrimary}
            </SmartLink>
            <SmartLink
              href={secondaryHref}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-pt-navy-900 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-pt-emerald-700"
            >
              {content.hero.ctaSecondary}
              <span
                aria-hidden
                className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </SmartLink>
          </div>

          {trustLine ? (
            <p className="mt-8 max-w-md text-xs leading-relaxed text-pt-slate-500">
              {trustLine}
            </p>
          ) : null}
        </div>

        <HeroDemoPanel demo={content.hero.demo} locale={locale} />
      </div>
    </section>
  );
}
