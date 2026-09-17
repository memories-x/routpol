import type { RehberArticle } from "@/content/rehber";
import { SmartLink } from "@/components/ui/SmartLink";
import Link from "next/link";

type Props = {
  locale: string;
  article: RehberArticle;
  hubLabel: string;
};

function hrefWithLocale(locale: string, href: string): string {
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

export function RehberArticleView({ locale, article, hubLabel }: Props) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const sources = Array.isArray(article.sources) ? article.sources : [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
        {article.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-pt-navy-900 sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-pt-slate-600">
        {article.description}
      </p>
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        {article.disclaimer}
      </p>

      <nav
        className="mt-8 rounded-xl border border-pt-border bg-pt-surface p-4"
        aria-label="TOC"
      >
        <ol className="space-y-2 text-sm">
          {sections.map((section, i) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-pt-navy-800 hover:text-pt-emerald-700"
              >
                {i + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {sections.map((section) => {
          const paragraphs = Array.isArray(section.paragraphs)
            ? section.paragraphs
            : [];
          const bullets = Array.isArray(section.bullets) ? section.bullets : [];
          return (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-pt-navy-900">
                {section.title}
              </h2>
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 64)}
                  className="mt-3 leading-relaxed text-pt-slate-600"
                >
                  {p}
                </p>
              ))}
              {bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-pt-slate-600">
                  {bullets.map((b) => (
                    <li key={b.slice(0, 64)}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        })}
      </div>

      {sources.length > 0 && article.sourcesLabel ? (
        <section className="mt-12 border-t border-pt-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            {article.sourcesLabel}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((s) => (
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
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <SmartLink
          href={hrefWithLocale(locale, article.ctaPrimary.href)}
          className="rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500"
        >
          {article.ctaPrimary.label}
        </SmartLink>
        <SmartLink
          href={hrefWithLocale(locale, article.ctaSecondary.href)}
          className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
        >
          {article.ctaSecondary.label}
        </SmartLink>
        <Link
          href={`/${locale}/rehber`}
          className="rounded-md px-5 py-3 text-sm font-medium text-pt-emerald-700 hover:underline"
        >
          ← {hubLabel}
        </Link>
      </div>
    </article>
  );
}
