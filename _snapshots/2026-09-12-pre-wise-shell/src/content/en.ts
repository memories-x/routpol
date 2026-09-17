import { faqEn } from "./faq";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "POL-TURK | Official letters in your language — your case tracked",
    description:
      "We explain institution letters in PL / EN / TR: what is asked, the deadline, what comes next. Polish lawyer partners run the legal process — we are not lawyers.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "We explain the letter, we track the case",
  },
  portalSteps: {
    steps: ["Payment", "Received", "In progress", "Ready"],
  },
  services: {
    title: "Services",
    intro:
      "Investment and company-formation advisory for Turkish operators; admin bridge for Turkish businesses in Poland. Three packages: single letter, monthly tracking, POA execution.",
    detailCta: "Apply",
    detailBack: "Back to services",
    includedLabel: "Included",
    excludedLabel: "Not included",
    priceLabel: "Fee",
    items: [
      {
        slug: "aylik-paket",
        icon: "Mail",
        title: "Monthly admin tracking",
        badge: "Business · tracking",
        shortDescription:
          "Official letters explained in PL / EN / TR all month: what is asked, the deadline, what comes next.",
        detailLabel: "Details",
        priceFrom: "from 160 zł / month",
        priceRows: [
          { label: "4 letters", amount: "160 zł" },
          { label: "6 letters", amount: "240 zł" },
          { label: "8 letters", amount: "320 zł" },
          { label: "10 letters", amount: "400 zł" },
          { label: "12 letters", amount: "480 zł" },
        ],
        priceNote:
          "40 zł per letter. Minimum 4. Lawyer fees separate. Foreign companies and individuals.",
        details: [
          "PL / EN / TR summary",
          "What is asked and the deadline",
          "Next step: you, bookkeeper or lawyer partner",
        ],
        notIncluded: [
          "Legal advice and court (lawyer partner)",
          "Bookkeeping",
          "An approval guarantee",
        ],
      },
      {
        slug: "surec-yonetimi",
        icon: "FileSignature",
        title: "Admin execution with POA",
        badge: "Formation · POA",
        shortDescription:
          "Document and appointment coordination under an administrative POA. Status in your language; contact with the lawyer partner and ongoing tracking.",
        detailLabel: "Details",
        priceFrom: "from 650 zł / month",
        priceRows: [
          { label: "Company", amount: "1 200 zł / month" },
          { label: "Individual", amount: "650 zł / month" },
        ],
        priceNote:
          "Notary fee is yours. Lawyer fees separate. Administrative acts only.",
        details: [
          "Document and appointment coordination (admin POA)",
          "Case status in PL / EN / TR — what happened, what is next",
          "Contact with the lawyer partner and tracking",
        ],
        notIncluded: [
          "Notary fee",
          "Lawyer fees, legal advice and court",
          "Bookkeeping",
          "An approval guarantee",
        ],
      },
      {
        slug: "tek-yazi",
        icon: "FileText",
        title: "Single letter",
        badge: "One-off",
        shortDescription:
          "One letter: explanation in your language and a clear next step. When law is needed we point you to the lawyer partner. No monthly plan.",
        detailLabel: "Details",
        priceFrom: "from 50 zł",
        priceRows: [
          { label: "Up to 2 pages", amount: "50 zł" },
          { label: "Each extra page", amount: "+25 zł" },
        ],
        priceNote:
          "Pages from the file. First two 50 zł; each further +25 zł. Lawyer fees separate.",
        details: [
          "Explanation in PL / EN / TR",
          "What they want and the deadline",
          "Who acts (you / bookkeeper / lawyer)",
        ],
        notIncluded: [
          "Legal advice and representation",
          "Ongoing monitoring",
          "Bookkeeping",
        ],
      },
    ],
  },
  faq: faqEn,
  contact: {
    title: "Contact",
    officeLabel: "Meeting",
    officeValue: "Poland — by appointment",
    emailLabel: "Email",
    emailValue: "teklif@pol-turk.example",
    phoneLabel: "Phone",
    phoneValue: "",
    hoursLabel: "Hours",
    hoursValue: "Mon–Fri 09:00–17:00 (Europe/Warsaw)",
  },
  footer: {
    disclaimer:
      "POL-TURK is not a law firm. Polish lawyer partners run the legal process. We explain letters in your language and track the case; legal advice and representation belong to the lawyer. Official outcomes are decided by the Polish institution.",
    privacy: "Privacy",
    rights: "© POL-TURK. All rights reserved.",
  },
  privacyPage: {
    title: "Privacy (GDPR / RODO)",
    body: "Personal data is processed only to deliver the service, take payment, and communicate; we do not sell it for marketing.",
    sections: [
      {
        title: "Data controller",
        paragraphs: [
          "Controller: POL-TURK (Poland). Legal name, NIP, and address are filled via env (NEXT_PUBLIC_OPERATOR_*).",
          "RODO contact: site email or postal address.",
        ],
      },
      {
        title: "Data categories",
        paragraphs: [
          "Identity and contact details, company NIP, document metadata, Stripe payment references (no card numbers stored).",
        ],
      },
      {
        title: "Legal basis",
        paragraphs: [
          "Contract (Art. 6(1)(b) GDPR), legitimate interest — security logs (Art. 6(1)(f)).",
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "Unpaid drafts: 30 days. Closed cases: 24 months, then metadata and file bytes are purged.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "Access, rectification, erasure, restriction, objection, portability where applicable. Complaint: UODO (Poland).",
        ],
      },
      {
        title: "Cookies & analytics",
        paragraphs: [
          "Session cookies (panel, portal). Cookieless server-side analytics — no ad cookies.",
        ],
      },
    ],
  },
  mosGuidePage: {
    title: "About MOS",
    intro:
      "MOS is the official portal for some residence filings. POL-TURK does not obtain residence. If a MOS or office letter arrives for your company or for you, we explain it in PL / EN / TR.",
    disclaimer: "General information. Not legal advice and not a guarantee.",
    sourcesLabel: "Official source",
    sources: [
      {
        label: "UDSC — MOS",
        url: "https://www.gov.pl/web/udsc/info-mos",
      },
      {
        label: "MOS portal",
        url: "https://mos.cudzoziemcy.gov.pl",
      },
    ],
    ctaLabel: "Apply",
    backLabel: "Home",
    sections: [
      {
        id: "biz",
        title: "What we do",
        paragraphs: [
          "If a letter arrived, we explain it in your chosen language (PL / EN / TR): what is asked, the deadline, who should act. We do not file the application for you.",
        ],
      },
    ],
  },
  system: {
    localeSoon: "",
    whatsappPrefill:
      "Hello POL-TURK, I am writing from the site. I need information on explaining a letter / tracking a case (company or individual).",
    whatsappLabel: "WhatsApp",
    foundationNote: "",
    contentComplete: true,
  },
};
