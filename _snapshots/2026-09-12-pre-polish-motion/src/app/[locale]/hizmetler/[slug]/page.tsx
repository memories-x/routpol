import { getContent } from "@/content";
import { PriceTable } from "@/components/sections/PriceTable";
import { PageShell } from "@/components/ui/PageShell";
import { getServiceIcon } from "@/lib/icons";
import { isLocale, type Locale } from "@/lib/i18n";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales: Locale[] = ["tr", "pl", "en"];
  const slugs = getContent("tr").services.items.map((s) => s.slug);
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const content = getContent(locale);
  const service = content.services.items.find((s) => s.slug === slug);
  if (!service) return { title: content.brand.name };

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${service.title} | ${content.brand.name}`,
    description: service.shortDescription,
    alternates: {
      languages: {
        tr: `${base}/tr/hizmetler/${slug}`,
        pl: `${base}/pl/hizmetler/${slug}`,
        en: `${base}/en/hizmetler/${slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getContent(locale);
  const items = Array.isArray(content.services.items)
    ? content.services.items
    : [];
  const service = items.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);
  const details = Array.isArray(service.details) ? service.details : [];
  const notIncluded = Array.isArray(service.notIncluded)
    ? service.notIncluded
    : [];

  return (
    <PageShell width="default">
      <Link
        href={`/${locale}/hizmetler`}
        className="text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {content.services.detailBack}
      </Link>

      <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-lg bg-pt-navy-900/5 text-pt-navy-800">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="mt-4 font-display text-3xl text-pt-navy-900 md:text-4xl">
        {service.title}
      </h1>
      <p className="mt-4 text-lg text-pt-slate-600">{service.shortDescription}</p>

      <PriceTable item={service} priceLabel={content.services.priceLabel} />

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
        {content.services.includedLabel}
      </h2>
      <ul className="mt-4 space-y-3">
        {details.map((line) => (
          <li key={line} className="flex gap-3 text-pt-slate-600">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-600"
              aria-hidden
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {notIncluded.length > 0 ? (
        <>
          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            {content.services.excludedLabel}
          </h2>
          <ul className="mt-4 space-y-3">
            {notIncluded.map((line) => (
              <li key={line} className="flex gap-3 text-pt-slate-600">
                <X
                  className="mt-0.5 h-4 w-4 shrink-0 text-pt-slate-400"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-10 rounded-xl border border-pt-border bg-pt-bg p-6 md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
            {content.services.priceLabel}
          </p>
          <p className="mt-1 font-display text-xl text-pt-navy-900">
            {service.priceFrom}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
          <Link
            href={`/${locale}/basvuru?paket=${service.slug}`}
            className="rounded-md bg-pt-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500"
          >
            {content.services.detailCta}
          </Link>
          <Link
            href={`/${locale}/hizmetler`}
            className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-surface"
          >
            {content.services.detailBack}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
