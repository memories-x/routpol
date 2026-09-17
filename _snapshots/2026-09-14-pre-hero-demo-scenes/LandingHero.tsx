"use client";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import { useEffect, useRef, useState } from "react";

type Props = {
  content: LandingContent;
  locale: string;
};

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

type DemoRow = { label: string; value: string };

/** Belge sahnesi — otomatik tek sefer yazılır; replay yok. */
export function LandingHero({ content, locale }: Props) {
  const rows: DemoRow[] = Array.isArray(content.hero.demo.rows)
    ? content.hero.demo.rows
    : [];
  const [mounted, setMounted] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [typed, setTyped] = useState<string[]>(() => rows.map(() => ""));
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);
  const played = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || played.current) return;
    played.current = true;

    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setOpenCount(0);
    setTyped(rows.map(() => ""));
    setDone(false);

    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    let t = 450;
    rows.forEach((row, i) => {
      schedule(() => {
        setOpenCount(i + 1);
        setTyped((prev) => {
          const next = [...prev];
          next[i] = "";
          return next;
        });
      }, t);
      t += 180;

      for (let c = 1; c <= row.value.length; c++) {
        const slice = row.value.slice(0, c);
        schedule(() => {
          setTyped((prev) => {
            const next = [...prev];
            next[i] = slice;
            return next;
          });
        }, t);
        t += 40;
      }
      t += 320;
    });

    schedule(() => setDone(true), t + 120);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const statusLabel = done
    ? content.hero.demo.statusReady
    : content.hero.demo.statusPending;

  const primaryHref = resolveHref(
    locale,
    content.hero.ctaPrimaryHref ?? "/danismanlik",
  );
  const secondaryHref = resolveHref(
    locale,
    content.hero.ctaSecondaryHref ?? "/hizmetler#paketler",
  );
  const supportTrack = content.hero.supportTrack;
  const supportTrackHref = supportTrack
    ? resolveHref(locale, supportTrack.href)
    : "";
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

          {supportTrack ? (
            <aside
              id="idari"
              className="mt-8 max-w-md scroll-mt-24 rounded-2xl border border-dashed border-pt-border bg-pt-surface/80 px-4 py-4 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-pt-emerald-600/35"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pt-slate-500">
                {supportTrack.kicker}
              </p>
              <p className="mt-2 text-sm font-semibold text-pt-navy-950">
                {supportTrack.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-pt-slate-500">
                {supportTrack.body}
              </p>
              <SmartLink
                href={supportTrackHref}
                className="mt-3 inline-flex text-xs font-semibold text-pt-emerald-700 transition-colors hover:text-pt-emerald-600"
              >
                {supportTrack.ctaLabel} →
              </SmartLink>
            </aside>
          ) : null}
        </div>

        <aside
          className="relative pt-hero-demo"
          aria-label={content.hero.demo.label}
        >
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-gradient-to-br from-pt-emerald-50/90 via-transparent to-pt-navy-50/40"
            aria-hidden
          />

          <div className="pt-product-panel overflow-hidden rounded-[1.25rem] border border-pt-border bg-pt-surface ring-1 ring-pt-navy-950/[0.03]">
            <div className="flex items-center gap-3 border-b border-pt-border bg-pt-bg/80 px-4 py-3 md:px-5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-pt-border" />
              </div>
              <p className="flex-1 truncate text-center text-[11px] font-medium text-pt-slate-500">
                {content.hero.demo.label}
              </p>
            </div>

            <div className="border-b border-pt-border bg-pt-surface px-4 py-2.5 md:px-5">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                  done
                    ? "bg-pt-emerald-50 text-pt-emerald-800"
                    : "bg-amber-50 text-amber-900"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    done ? "bg-pt-emerald-600" : "bg-amber-500"
                  }`}
                  aria-hidden
                />
                {statusLabel}
              </span>
            </div>

            <div className="bg-pt-bg/50 p-4 md:p-5">
              <div className="min-h-[9.5rem] rounded-xl border border-pt-border bg-pt-surface px-4 py-1 shadow-sm md:px-5">
                <dl>
                  {rows.map((row, i) => {
                    const visible = openCount > i;
                    const writing = openCount === i + 1 && !done;
                    const value = done
                      ? row.value
                      : visible
                        ? typed[i]
                        : "";
                    return (
                      <div
                        key={row.label}
                        className={`flex items-baseline justify-between gap-4 border-b border-pt-border/70 py-3.5 last:border-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          visible ? "opacity-100" : "opacity-20"
                        }`}
                      >
                        <dt className="text-sm text-pt-slate-500">
                          {row.label}
                        </dt>
                        <dd className="min-h-[1.25rem] max-w-[55%] text-right text-sm font-semibold text-pt-navy-900">
                          {value}
                          {writing ? (
                            <span
                              className="ml-0.5 inline-block h-4 w-0.5 bg-pt-emerald-600 align-middle"
                              aria-hidden
                            />
                          ) : null}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
              <p className="mt-4 px-1 text-xs leading-relaxed text-pt-slate-500">
                {content.hero.demo.footnote}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
