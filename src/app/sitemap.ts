import { getContent } from "@/content";
import { rehberSlugs } from "@/content/rehber";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const locales = ["tr", "pl", "en"] as const;
  const slugs = getContent("tr").services.items.map((s) => s.slug);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${base}/${locale}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
    entries.push({
      url: `${base}/${locale}/hizmetler/egitim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
    entries.push({
      url: `${base}/${locale}/hizmetler/kurulum`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
    entries.push({
      url: `${base}/${locale}/hizmetler/isletme`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
    entries.push({
      url: `${base}/${locale}/hizmetler/eslik`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    });
    entries.push({
      url: `${base}/${locale}/basvuru`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
    entries.push({
      url: `${base}/${locale}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });
    entries.push({
      url: `${base}/${locale}/rehber`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const guide of rehberSlugs) {
      entries.push({
        url: `${base}/${locale}/rehber/${guide}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: guide === "mos" ? 0.55 : 0.6,
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: `${base}/${locale}/hizmetler/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
