export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type PriceRow = {
  label: string;
  amount: string;
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
};

export type WhyUsItem = {
  title: string;
  body: string;
};

export type WhyUsCompareRow = {
  them: string;
  us: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  meta: { title: string; description: string };
  brand: { name: string; tagline: string };
  nav: NavItem[];
  hero: {
    title: string;
    subtitle: string;
    badges: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    ctaHeader: string;
    accountLink: string;
    trustLine?: string;
    eyebrow?: string;
    documentDemo: {
      docLabel: string;
      keywords: string[];
      rows: { label: string; value: string }[];
      footnote?: string;
    };
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    intro: string;
    lanes: {
      lawyer: { label: string; note: string };
      institution: { label: string; action: string };
      bridge: { label: string; action: string };
      you: { label: string; action: string };
    };
  };
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
  scope: {
    title: string;
    eyebrow?: string;
    intro?: string;
    includedTitle: string;
    excludedTitle: string;
    included: string[];
    excluded: string[];
    collaboration: { title: string; body: string };
  };
  whyUs: {
    title: string;
    intro: string;
    concessionTitle: string;
    concessionBody: string;
    compareTitle: string;
    compareThemLabel: string;
    compareUsLabel: string;
    compareRows: WhyUsCompareRow[];
    itemsTitle: string;
    items: WhyUsItem[];
  };
  process: { title: string; steps: ProcessStep[] };
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
    form: {
      fullName: string;
      email: string;
      phone: string;
      phoneCode: string;
      serviceType: string;
      message: string;
      privacy: string;
      submit: string;
      loading: string;
      success: string;
      error: string;
      rateLimited: string;
      fieldError: string;
      fileNote: string;
      otherService: string;
    };
  };
  footer: { disclaimer: string; privacy: string; rights: string };
  privacyPage: {
    title: string;
    body: string;
    sections?: { title: string; paragraphs: string[] }[];
  };
  socialProof?: {
    eyebrow: string;
    title: string;
    note?: string;
    badges: string[];
    signals: { label: string; value: string }[];
    flowTitle?: string;
    flowNote?: string;
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
    foundationNote: string;
    contentComplete: boolean;
  };
};
