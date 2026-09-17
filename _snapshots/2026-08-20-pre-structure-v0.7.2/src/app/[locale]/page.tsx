import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Scope } from "@/components/sections/Scope";
import { Services } from "@/components/sections/Services";
import { SocialProof } from "@/components/sections/SocialProof";
import { WhyUs } from "@/components/sections/WhyUs";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
  const content = getContent(locale);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `${base}/${locale}`,
      siteName: content.brand.name,
      locale: locale === "tr" ? "tr_TR" : locale === "pl" ? "pl_PL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
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
  const content = getContent(locale);

  return (
    <>
      <Hero content={content} locale={locale} />
      <Services content={content} locale={locale} />
      <Scope content={content} />
      <Process content={content} />
      <WhyUs content={content} />
      <SocialProof content={content} />
      <Faq content={content} />
      <Suspense fallback={<div id="iletisim" className="scroll-mt-20 py-16" />}>
        <Contact content={content} locale={locale} />
      </Suspense>
      <WhatsAppFab content={content} locale={locale} />
    </>
  );
}
