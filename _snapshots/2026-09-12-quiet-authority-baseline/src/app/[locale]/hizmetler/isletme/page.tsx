import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { PageShell } from "@/components/ui/PageShell";
import { getIsletmeContent } from "@/content/isletme";
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
  const content = getIsletmeContent(locale);
  const brand = getLandingContent(locale).brand.name;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${content.meta.title} | ${brand}`,
    description: content.meta.description,
    alternates: {
      languages: {
        tr: `${base}/tr/hizmetler/isletme`,
        pl: `${base}/pl/hizmetler/isletme`,
        en: `${base}/en/hizmetler/isletme`,
      },
    },
  };
}

export default async function IsletmeServicePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getIsletmeContent(locale);

  return (
    <PageShell width="wide">
      <ServiceDetailView locale={locale} content={content} />
    </PageShell>
  );
}
