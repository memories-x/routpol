import { AboutPageView } from "@/components/about/AboutPageView";
import { PageShell } from "@/components/ui/PageShell";
import { getAboutContent } from "@/content/hakkimizda";
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
  const about = getAboutContent(locale);
  const brand = getLandingContent(locale).brand.name;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${about.metaTitle} | ${brand}`,
    description: about.metaDescription,
    alternates: {
      languages: {
        tr: `${base}/tr/hakkimizda`,
        pl: `${base}/pl/hakkimizda`,
        en: `${base}/en/hakkimizda`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getAboutContent(locale);

  return (
    <PageShell width="wide">
      <AboutPageView locale={locale} content={content} />
    </PageShell>
  );
}
