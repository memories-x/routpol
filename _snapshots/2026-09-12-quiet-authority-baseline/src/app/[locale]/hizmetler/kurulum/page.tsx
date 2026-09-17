import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { PageShell } from "@/components/ui/PageShell";
import { getKurulumContent } from "@/content/kurulum";
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
  const content = getKurulumContent(locale);
  const brand = getLandingContent(locale).brand.name;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${content.meta.title} | ${brand}`,
    description: content.meta.description,
    alternates: {
      languages: {
        tr: `${base}/tr/hizmetler/kurulum`,
        pl: `${base}/pl/hizmetler/kurulum`,
        en: `${base}/en/hizmetler/kurulum`,
      },
    },
  };
}

export default async function KurulumServicePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getKurulumContent(locale);

  return (
    <PageShell width="wide">
      <ServiceDetailView locale={locale} content={content} />
    </PageShell>
  );
}
