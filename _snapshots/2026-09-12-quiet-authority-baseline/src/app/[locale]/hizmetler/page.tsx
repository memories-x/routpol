import { LandingScope } from "@/components/landing/LandingScope";
import { PageShell } from "@/components/ui/PageShell";
import { SmartLink } from "@/components/ui/SmartLink";
import { getContent } from "@/content";
import { getLandingContent } from "@/content/landing";
import { sortCheckoutPackages } from "@/lib/cases/document-slots";
import { getServiceIcon } from "@/lib/icons";
import { isLocale, type Locale } from "@/lib/i18n";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import {
  Building2,
  FileSignature,
  FileText,
  GraduationCap,
  Mail,
  Map,
  Store,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const catIcons = {
  FileText,
  Mail,
  Map,
  FileSignature,
  GraduationCap,
  User,
} as const;
const audIcons = { Building2, Store, GraduationCap, User } as const;

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "pl" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const landing = getLandingContent(locale);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${landing.categories.title} | ${landing.brand.name}`,
    description: landing.meta.description,
    alternates: {
      languages: {
        tr: `${base}/tr/hizmetler`,
        pl: `${base}/pl/hizmetler`,
        en: `${base}/en/hizmetler`,
      },
    },
  };
}

export default async function ServicesHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const landing = getLandingContent(locale);
  const site = getContent(locale);
  const audiences = Array.isArray(landing.audiences.items)
    ? landing.audiences.items
    : [];
  const categories = Array.isArray(landing.categories.items)
    ? landing.categories.items
    : [];
  const laneCategories = categories.filter((c) => !c.packageSlug);
  const packages = sortCheckoutPackages(
    Array.isArray(site.services.items) ? site.services.items : [],
  );

  const lanesIntro =
    locale === "pl"
      ? "Ścieżki doradcze i towarzyszenie — nie checkout. Pakiety płatne powyżej."
      : locale === "en"
        ? "Advisory and accompaniment lanes — not checkout. Paid packages above."
        : "Danışmanlık ve eşlik hatları — checkout değil. Ücretli paketler yukarıda.";

  return (
    <>
      <LandingScope content={landing} />

      <PageShell width="wide" className="pb-8 md:pb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
          {landing.categories.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
          {landing.categories.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-pt-slate-600">
          {landing.categories.intro}
        </p>

        <section id="paketler" className="mt-14 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
              {landing.packages.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl text-pt-navy-900 md:text-3xl">
              {landing.packages.title}
            </h2>
            <p className="mt-3 text-pt-slate-600">{landing.packages.intro}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => {
              const Icon = getServiceIcon(item.icon);
              const featured = item.slug === "aylik-paket";
              return (
                <article
                  key={item.slug}
                  className={
                    featured
                      ? "flex h-full flex-col border-2 border-pt-emerald-600 bg-pt-surface p-6"
                      : "flex h-full flex-col border border-pt-border bg-pt-surface p-6"
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center bg-pt-navy-900/5 text-pt-navy-800">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    {item.badge ? (
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-pt-emerald-700">
                        {item.badge}
                      </p>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-pt-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-pt-slate-600">
                    {item.shortDescription}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-pt-navy-900">
                    {item.priceFrom}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={`/${locale}/basvuru?paket=${item.slug}`}
                      className={`${btnPrimaryClassName} w-full py-2.5 text-center`}
                    >
                      {landing.packages.applyLabel}
                    </Link>
                    <Link
                      href={`/${locale}/hizmetler/${item.slug}`}
                      className="text-center text-sm font-medium text-pt-emerald-700 hover:underline"
                    >
                      {landing.packages.detailLabel}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="yonlendirme"
          className="mt-16 scroll-mt-24 border-t border-pt-border pt-14"
        >
          <h2 className="font-display text-2xl text-pt-navy-900">
            {locale === "pl"
              ? "Ścieżki doradcze"
              : locale === "en"
                ? "Advisory lanes"
                : "Danışmanlık hatları"}
          </h2>
          <p className="mt-2 max-w-2xl text-pt-slate-600">{lanesIntro}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {laneCategories.map((item) => {
              const Icon =
                catIcons[item.icon as keyof typeof catIcons] ?? FileText;
              return (
                <article
                  key={item.id}
                  className="flex h-full flex-col border-t border-pt-border pt-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center text-pt-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-3 font-semibold text-pt-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-pt-slate-600">
                    {item.body}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-sm font-semibold text-pt-emerald-700 hover:underline"
                    >
                      {item.ctaLabel} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="kim-icin-hub"
          className="mt-16 scroll-mt-24 border-t border-pt-border pt-14"
        >
          <h2 className="font-display text-2xl text-pt-navy-900">
            {landing.audiences.title}
          </h2>
          <p className="mt-2 max-w-2xl text-pt-slate-600">
            {landing.audiences.intro}
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {audiences.map((item) => {
              const Icon =
                audIcons[item.icon as keyof typeof audIcons] ?? Building2;
              const points = Array.isArray(item.points) ? item.points : [];
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-24 border-t border-pt-border pt-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-pt-navy-800">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-pt-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-pt-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-sm text-pt-slate-600"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pt-emerald-600"
                          aria-hidden
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {item.href ? (
                    <Link
                      href={`/${locale}${item.href}`}
                      className="mt-4 inline-block text-sm font-semibold text-pt-emerald-700 hover:underline"
                    >
                      {item.ctaLabel} →
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </PageShell>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-4 py-12 md:px-6">
        <Link
          href={`/${locale}/basvuru`}
          className={`${btnPrimaryClassName} px-5 py-3`}
        >
          {landing.headerCta}
        </Link>
        <SmartLink
          href={`/${locale}#iletisim`}
          className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
        >
          {landing.lead.modalTitle}
        </SmartLink>
      </div>
    </>
  );
}
