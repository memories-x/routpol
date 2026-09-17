import { PageShell } from "@/components/ui/PageShell";
import { getRehberHub } from "@/content/rehber";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "pl" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const hub = getRehberHub(locale);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: hub.meta.title,
    description: hub.meta.description,
    alternates: {
      languages: {
        tr: `${base}/tr/rehber`,
        pl: `${base}/pl/rehber`,
        en: `${base}/en/rehber`,
      },
    },
  };
}

export default async function RehberHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const hub = getRehberHub(locale);
  const cards = Array.isArray(hub.cards) ? hub.cards : [];

  return (
    <PageShell width="wide">
      <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
        {hub.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
        {hub.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pt-slate-600">{hub.intro}</p>
      <p className="mt-4 max-w-2xl rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        {hub.disclaimer}
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link
              href={`/${locale}/rehber/${card.slug}`}
              className="flex h-full flex-col rounded-xl border border-pt-border bg-pt-surface p-6 transition hover:border-pt-emerald-600/40"
            >
              {card.badge ? (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-700">
                  {card.badge}
                </span>
              ) : null}
              <h2 className="mt-2 font-display text-xl text-pt-navy-900">
                {card.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-pt-slate-600">
                {card.body}
              </p>
              <span className="mt-4 text-sm font-semibold text-pt-emerald-700">
                {hub.readCta} →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/${locale}`}
        className="mt-12 inline-block text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {hub.backHome}
      </Link>
    </PageShell>
  );
}
