/** Landing content types — locale bodies in tr/pl/en. */

import type { FaqBlock } from "../faq";
import type { HeroDemoContent } from "../landing-hero-demo";

export type LandingLocale = "tr" | "pl" | "en";

export type LandingNavItem = {
  id: string;
  label: string;
  /** Path after locale (`/hizmetler`) or hash (`#paketler`) */
  href: string;
};

export type LandingContent = {
  meta: { title: string; description: string };
  brand: { name: string; tagline: string; secondName?: string; secondLineHint?: string };
  nav: LandingNavItem[];
  headerCta: string;
  accountLink: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    valueLine: string;
    ctaPrimary: string;
    /** Hash or path after locale — default `#paketler` */
    ctaPrimaryHref?: string;
    ctaSecondary: string;
    /** Hash or path — default `#hizmetler` */
    ctaSecondaryHref?: string;
    /** Müşteri dosyası demo — `landing-hero-demo.ts` */
    demo: HeroDemoContent;
  };
  bridge: {
    eyebrow: string;
    title: string;
    intro: string;
    lanes: { id: string; label: string; body: string }[];
    lawyerNote: string;
    /** Ayrı ticaret hattı — hero’da değil; Quiet Authority budget */
    serviceLine?: {
      title: string;
      body: string;
      ctaLabel: string;
      href: string;
    };
  };
  audiences: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      points: string[];
      ctaLabel: string;
      href: string;
    }[];
  };
  /** Yerinde eşlik — firma / şahıs (mevcut segmentlerden ayrı) */
  fieldSupport: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      points: string[];
      ctaLabel: string;
      href: string;
    }[];
    disclaimer: string;
    hubCta: string;
    hubHref: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      packageSlug?: string;
      href: string;
      ctaLabel: string;
      /** Paket | Görüşme */
      badge?: string;
    }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    intro: string;
    applyLabel: string;
    detailLabel: string;
    /** Soft path: ask before buying — hash `#iletisim` */
    talkLabel?: string;
    talkHref?: string;
    /** Featured (aylık) mini month story — Attio single scene */
    featuredStory: {
      title: string;
      steps: string[];
    };
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    paidPathTitle: string;
    steps: { title: string; body: string }[];
    consultPathTitle: string;
    consultPathBody: string;
    consultSteps: { title: string; body: string }[];
    ctaPackage: string;
    ctaConsult: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    intro: string;
    tabs: {
      id: string;
      label: string;
      title: string;
      bullets: string[];
      ctaLabel: string;
      href: string;
    }[];
  };
  scope: {
    eyebrow: string;
    title: string;
    includedTitle: string;
    excludedTitle: string;
    included: string[];
    excluded: string[];
  };
  faq: FaqBlock;
  lead: {
    title: string;
    intro: string;
    fullName: string;
    company: string;
    employees: string;
    email: string;
    phone: string;
    process: string;
    processOptions: { value: string; label: string }[];
    privacy: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    fieldError: string;
    modalTitle: string;
    close: string;
  };
  trust: {
    title: string;
    badges: string[];
  };
  footer: {
    disclaimer: string;
    privacy: string;
    rights: string;
    servicesHub: string;
    about: string;
    apply: string;
    accompaniment: string;
    advisory: string;
    formation: string;
    business: string;
    education: string;
    packages: string;
    guide: string;
    faq: string;
    groupServices: string;
    groupBuy: string;
    groupSite: string;
  };
};
