import { faqEn } from "./faq";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  meta: {
    title: "ROUTEPOL | Official letters in your language — your case tracked",
    description:
      "We explain institution letters in PL / EN / TR: what is asked, the deadline, what comes next. Monthly packages are Stripe subscriptions. Polish lawyer partners run the legal process — we are not lawyers.",
  },
  brand: {
    name: "ROUTEPOL",
    tagline: "The route that guides you in Poland.",
  },
  portalSteps: {
    steps: ["Payment", "Received", "In progress", "Ready"],
  },
  services: {
    title: "Services",
    intro:
      "Investment and company-formation advisory for Turkish operators; Poland admin tracking for Turkish businesses locally. Letter packages (monthly = subscription) plus on-site accompaniment.",
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
        badge: "Subscription · tracking",
        shortDescription:
          "Official letters explained in PL / EN / TR all month: what is asked, the deadline, what comes next. Stripe subscription — card renews monthly; fee applies even with no letters.",
        detailLabel: "Details",
        priceFrom: "from 160 zł / month",
        priceRows: [
          { label: "4 letters", amount: "160 zł" },
          { label: "6 letters", amount: "240 zł" },
          { label: "8 letters", amount: "320 zł" },
          { label: "10 letters", amount: "400 zł" },
        ],
        priceQuote: {
          label: "12 letters and above",
          getPriceLabel: "Get a quote",
          talkLabel: "Talk to us",
          href: "?process=aylik-paket#iletisim",
        },
        priceNote:
          "Ongoing subscription: card renews automatically each month. Fee applies even with no letters that month; unused quota is not refunded. 40 zł per letter; minimum 4. For 12+ letters — quote / contact form. Lawyer fees separate.",
        details: [
          "PL / EN / TR summary",
          "What is asked and the deadline",
          "Next step: you, bookkeeper or lawyer partner",
        ],
        notIncluded: [
          "Legal advice and court (lawyer partner)",
          "Bookkeeping",
          "An approval guarantee",
          "Refund of unused quota",
        ],
      },
      {
        slug: "surec-yonetimi",
        icon: "FileSignature",
        title: "Admin execution with POA",
        badge: "Formation · subscription",
        shortDescription:
          "Document and appointment coordination under an administrative POA. Status in your language; contact with the lawyer partner and ongoing tracking. Stripe subscription — card renews monthly; fee applies even with no work.",
        detailLabel: "Details",
        priceFrom: "from 650 zł / month",
        priceRows: [
          { label: "Company", amount: "1 200 zł / month" },
          { label: "Individual", amount: "650 zł / month" },
        ],
        priceNote:
          "Ongoing subscription: card renews automatically each month. Fee applies even with no work that month. Notary fee is yours. Lawyer fees separate. Administrative acts only.",
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
          "Refund for a month with no work",
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
      {
        slug: "yerinde-eslik",
        icon: "Building2",
        title: "On-site accompaniment",
        badge: "Office · bank · urząd",
        shortDescription:
          "One institutional visit anywhere in Poland: language bridge and accompaniment (half day). Travel outside the city is separate. No outcome guarantee.",
        detailLabel: "Details",
        priceFrom: "450 zł / half day",
        priceRows: [
          { label: "Half day (≈3–4 h, 1 office)", amount: "450 zł" },
        ],
        priceNote:
          "1 visit / 1 office. City required on the application. Out-of-city travel and extra hours agreed separately. Not legal representation.",
        details: [
          "Language bridge and accompaniment at office / bank / urząd",
          "Short briefing before the visit",
          "Afterwards: status note — what happened, what is next",
        ],
        notIncluded: [
          "Guarantee of an official decision",
          "Legal representation / advocacy",
          "Unlimited travel or extra hours (separate)",
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
      "ROUTEPOL is not a law firm. Polish lawyer partners run the legal process. We explain letters in your language and track the case; legal advice and representation belong to the lawyer. Official outcomes are decided by the Polish institution.",
    privacy: "Privacy",
    rights: "© ROUTEPOL. All rights reserved.",
  },
  privacyPage: {
    title: "Privacy (GDPR / RODO)",
    body: "Personal data is processed only to deliver the service, take payment, and communicate; we do not sell it for marketing.",
    sections: [
      {
        title: "Data controller",
        paragraphs: [
          "Controller: ROUTEPOL (Poland). Legal name, NIP, and address are filled via env (NEXT_PUBLIC_OPERATOR_*).",
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
      "MOS is the official portal for some residence filings. ROUTEPOL does not obtain residence. If a MOS or office letter arrives for your company or for you, we explain it in PL / EN / TR.",
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
      "Hello ROUTEPOL, I am writing from the site. I need information on explaining a letter / tracking a case (company or individual).",
    whatsappLabel: "WhatsApp",
    foundationNote: "",
    contentComplete: true,
  },
};
