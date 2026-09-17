export const locales = ["tr", "pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeSoonMessage(locale: Locale): string {
  if (locale === "tr") {
    return "Lehçe ve İngilizce içerik yakında. Şimdilik Türkçe devam edebilirsiniz.";
  }
  if (locale === "pl") {
    return "Pełna treść PL wkrótce. Na razie dostępna jest wersja TR.";
  }
  return "Full EN content coming soon. Turkish version is available for now.";
}
