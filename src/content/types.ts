export type PriceRow = {
  label: string;
  amount: string;
};

/** 12+ kota — sabit fiyat yok; iletişim / teklif */
export type ServicePriceQuote = {
  label: string;
  getPriceLabel: string;
  talkLabel: string;
  /** Path after locale, e.g. `?process=aylik-paket#iletisim` */
  href: string;
};

export type ServiceItem = {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  detailLabel: string;
  details: string[];
  notIncluded: string[];
  priceFrom: string;
  priceRows: PriceRow[];
  priceNote: string;
  badge?: string;
  priceQuote?: ServicePriceQuote;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  meta: { title: string; description: string };
  brand: { name: string; tagline: string };
  portalSteps: {
    steps: [string, string, string, string];
  };
  services: {
    title: string;
    intro?: string;
    items: ServiceItem[];
    detailCta: string;
    detailBack: string;
    includedLabel: string;
    excludedLabel: string;
    priceLabel: string;
  };
  faq: { title: string; items: FaqItem[] };
  contact: {
    title: string;
    officeLabel: string;
    officeValue: string;
    emailLabel: string;
    emailValue: string;
    phoneLabel: string;
    phoneValue: string;
    hoursLabel: string;
    hoursValue: string;
  };
  footer: { disclaimer: string; privacy: string; rights: string };
  privacyPage: {
    title: string;
    body: string;
    sections?: { title: string; paragraphs: string[] }[];
  };
  mosGuidePage: {
    title: string;
    intro: string;
    disclaimer: string;
    sourcesLabel: string;
    sources: { label: string; url: string }[];
    ctaLabel: string;
    backLabel: string;
    sections: {
      id: string;
      title: string;
      paragraphs: string[];
      bullets?: string[];
    }[];
  };
  system: {
    localeSoon: string;
    whatsappPrefill: string;
    whatsappLabel: string;
    foundationNote: string;
    contentComplete: boolean;
  };
};
