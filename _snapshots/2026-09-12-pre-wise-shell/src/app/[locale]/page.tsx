import { LandingPage } from "@/components/landing/LandingPage";
import { getContent } from "@/content";
import { getLandingContent } from "@/content/landing";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
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
  const content = getLandingContent(locale);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `${base}/${locale}`,
      siteName: content.brand.name,
    },
    alternates: {
      languages: {
        tr: `${base}/tr`,
        pl: `${base}/pl`,
        en: `${base}/en`,
        "x-default": `${base}/tr`,
      },
    },
  };
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getLandingContent(locale);
  const site = getContent(locale);

  return <LandingPage content={content} site={site} locale={locale} />;
}
