# i18n İçerik Anahtar İskeleti

Faz 1’de yalnızca `tr` doldurulur; anahtar isimleri Faz 2’ye hazır.

```ts
// content/types.ts (hedef)
export type Locale = "tr" | "pl" | "en";

export type SiteContent = {
  meta: { title: string; description: string };
  brand: { name: string; tagline: string };
  nav: { id: string; label: string; href: string }[];
  hero: {
    title: string;
    subtitle: string;
    badges: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    slug: string;
    icon: string;
    title: string;
    shortDescription: string;
    detailLabel: string;
  }[];
  whyUs: { title: string; items: { title: string; body: string }[] };
  process: { title: string; steps: { title: string; body: string }[] };
  faq: { id: string; question: string; answer: string }[];
  contact: {
    title: string;
    officeLabel: string;
    hoursLabel: string;
    form: Record<string, string>; // labels, placeholders, errors, success
  };
  footer: { disclaimer: string; privacy: string; rights: string };
  privacyPage: { title: string; body: string };
  system: {
    localeSoon: string;
    fileUploadNote: string;
    whatsappPrefill: string;
  };
};
```

**Kural:** Yeni UI metni → önce anahtar, sonra çeviri. Bileşende string literal yok (test id / class hariç).
