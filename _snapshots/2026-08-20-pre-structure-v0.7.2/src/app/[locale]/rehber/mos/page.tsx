import { getContent } from "@/content";
import { getPublicEnv } from "@/lib/env";
import { isLocale, locales } from "@/lib/i18n";
import {
  daysSinceMosVerification,
  isMosContentStale,
  MOS_CONTENT_VERIFIED_AT,
} from "@/lib/mos-content-review";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const content = getContent(locale);
  const path = "rehber/mos";
  return {
    title: `${content.mosGuidePage.title} | ${content.brand.name}`,
    description: content.mosGuidePage.intro.slice(0, 160),
    alternates: {
      languages: {
        tr: `/tr/${path}`,
        pl: `/pl/${path}`,
        en: `/en/${path}`,
      },
    },
  };
}

export default async function MosGuidePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const content = getContent(raw);
  const page = content.mosGuidePage;
  const stale = isMosContentStale();
  const daysSince = daysSinceMosVerification();

  return (
    <article className="mx-auto max-w-7xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-pt-emerald-600">
        {content.brand.name}
      </p>
      <h1 className="font-display text-3xl text-pt-navy-900 mt-2 sm:text-4xl">{page.title}</h1>
      <p className="mt-6 leading-relaxed text-pt-slate-600">{page.intro}</p>
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        {page.disclaimer}
      </p>
      <p className="mt-2 text-xs text-pt-slate-500">
        verifiedAt: {MOS_CONTENT_VERIFIED_AT} ({daysSince} gün) · Bilgilendirme
        içeriği; otomasyon veya resmi başvuru değildir.
      </p>
      {stale ? (
        <p className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900">
          [WARN] MOS içeriği 90 günden eski — mevzuat/evrak listesi gözden
          geçirilmeli (docs/03-operasyon.md).
        </p>
      ) : null}

      <nav className="mt-8 rounded-xl border border-pt-border bg-pt-surface p-4 shadow-sm" aria-label="İçindekiler">
        <ol className="space-y-2 text-sm">
          {page.sections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-pt-aws-ink hover:text-pt-emerald-600"
              >
                {i + 1}. {section.title.replace(/^\d+\)\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-pt-navy-900">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="mt-3 leading-relaxed text-pt-slate-600">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-pt-slate-600">
                {section.bullets.map((b) => (
                  <li key={b.slice(0, 48)}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-pt-border pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
          {page.sourcesLabel}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {page.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pt-emerald-600 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/${raw}/basvuru?paket=aylik-paket`}
          className="rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500"
        >
          {page.ctaLabel}
        </Link>
        <Link
          href={`/${raw}`}
          className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
        >
          ← {page.backLabel}
        </Link>
      </div>
    </article>
  );
}
