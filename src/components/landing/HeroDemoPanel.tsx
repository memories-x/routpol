"use client";

import { SmartLink } from "@/components/ui/SmartLink";
import type { HeroDemoContent, HeroDemoScene } from "@/content/landing-hero-demo";
import { useHeroDemoPlayback } from "@/hooks/useHeroDemoPlayback";
import { useMemo } from "react";

type Props = {
  demo: HeroDemoContent;
  locale: string;
};

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

function buildScenes(demo: HeroDemoContent): HeroDemoScene[] {
  if (Array.isArray(demo.scenes) && demo.scenes.length > 0) {
    return demo.scenes.map((s) => ({
      ...s,
      statusPending: s.statusPending ?? demo.statusPending,
      statusReady: s.statusReady ?? demo.statusReady,
      rows: Array.isArray(s.rows) ? s.rows : [],
      href: s.href,
      ctaLabel: s.ctaLabel,
    }));
  }
  const rows = Array.isArray(demo.rows) ? demo.rows : [];
  return [
    {
      id: "default",
      title: demo.label,
      statusPending: demo.statusPending,
      statusReady: demo.statusReady,
      rows,
      href: "/hizmetler#paketler",
      ctaLabel: demo.label,
    },
  ];
}

/** Belge sahnesi — hizmet başına müşteri görünümü; sahneler sırayla oynar. */
export function HeroDemoPanel({ demo, locale }: Props) {
  const scenes = useMemo(() => buildScenes(demo), [demo]);
  const { sceneIndex, openCount, typed, done, goScene } =
    useHeroDemoPlayback(scenes);

  const scene = scenes[sceneIndex] ?? scenes[0];
  if (!scene) return null;

  const rows = Array.isArray(scene.rows) ? scene.rows : [];
  const statusLabel = done ? scene.statusReady : scene.statusPending;
  const sceneHref = resolveHref(locale, scene.href);

  return (
    <aside className="relative pt-hero-demo" aria-label={demo.label}>
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
          <p
            key={scene.id}
            className="flex-1 truncate text-center text-[11px] font-medium text-pt-slate-500 transition-opacity duration-300"
          >
            {scene.title}
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
          <div
            key={scene.id}
            className="min-h-[9.5rem] rounded-xl border border-pt-border bg-pt-surface px-4 py-1 shadow-sm md:px-5 animate-[pt-demo-in_0.45s_cubic-bezier(0.16,1,0.3,1)]"
          >
            <dl>
              {rows.map((row, i) => {
                const visible = openCount > i;
                const writing = openCount === i + 1 && !done;
                const value = done
                  ? row.value
                  : visible
                    ? (typed[i] ?? "")
                    : "";
                return (
                  <div
                    key={`${scene.id}-${row.label}`}
                    className={`flex items-baseline justify-between gap-4 border-b border-pt-border/70 py-3.5 last:border-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      visible ? "opacity-100" : "opacity-20"
                    }`}
                  >
                    <dt className="text-sm text-pt-slate-500">{row.label}</dt>
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
            <p className="text-xs leading-relaxed text-pt-slate-500">
              {demo.footnote}
            </p>
            {done && scene.href ? (
              <SmartLink
                href={sceneHref}
                className="shrink-0 text-xs font-semibold text-pt-emerald-700 transition-colors hover:text-pt-emerald-600"
              >
                {scene.ctaLabel} →
              </SmartLink>
            ) : null}
          </div>

          {scenes.length > 1 ? (
            <div
              className="mt-4 flex items-center justify-center gap-2"
              role="tablist"
              aria-label={demo.label}
            >
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === sceneIndex}
                  aria-label={s.title}
                  onClick={() => goScene(i)}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === sceneIndex
                      ? "w-6 bg-pt-emerald-600"
                      : "w-1.5 bg-pt-border hover:bg-pt-slate-400"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
