/** Shared shape for long-form service detail pages (kurulum / işletme / eğitim). */

export type ServiceDetailContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  positioning: string;
  whoTitle: string;
  who: { title: string; body: string; id?: string }[];
  /** Optional deep workstreams (investor lifecycle, etc.) */
  workstreamsTitle?: string;
  workstreamsIntro?: string;
  workstreams?: {
    title: string;
    body: string;
    items: string[];
  }[];
  pillarsTitle: string;
  pillars: { title: string; body: string }[];
  deliverablesTitle: string;
  deliverables: string[];
  processTitle: string;
  processIntro: string;
  process: { title: string; body: string }[];
  packagesTitle: string;
  packagesIntro: string;
  packages: {
    slug: string;
    title: string;
    role: string;
    href: string;
  }[];
  includedTitle: string;
  included: string[];
  excludedTitle: string;
  excluded: string[];
  engagementTitle: string;
  engagementBody: string;
  ctaConsult: string;
  /** Absolute path without locale, e.g. /basvuru?paket=yerinde-eslik — default #iletisim */
  ctaConsultHref?: string;
  ctaPrimaryPackage: { label: string; href: string };
  ctaSecondaryPackage?: { label: string; href: string };
  ctaBack: string;
  disclaimer: string;
};
