import { RehberArticleView } from "@/components/rehber/RehberArticleView";
import {
  getRehberArticle,
  getRehberHub,
  rehberSlugs,
} from "@/content/rehber";
import { isLocale, locales } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    rehberSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const article = getRehberArticle(locale, slug);
  if (!article) return { title: "POL-TURK" };
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${article.title} | POL-TURK`,
    description: article.description,
    alternates: {
      languages: {
        tr: `${base}/tr/rehber/${slug}`,
        pl: `${base}/pl/rehber/${slug}`,
        en: `${base}/en/rehber/${slug}`,
      },
    },
  };
}

export default async function RehberArticlePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const article = getRehberArticle(raw, slug);
  if (!article) notFound();
  const hub = getRehberHub(raw);

  return (
    <RehberArticleView
      locale={raw}
      article={article}
      hubLabel={hub.title}
    />
  );
}
