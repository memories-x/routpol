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
  nav: [
    { id: "paketler", label: "Services", href: "#paketler" },
    { id: "sinirlar", label: "Scope", href: "#sinirlar" },
    { id: "surec", label: "How it works", href: "#surec" },
    { id: "neden-biz", label: "Why us", href: "#neden-biz" },
    { id: "sss", label: "FAQ", href: "#sss" },
    { id: "iletisim", label: "Contact", href: "#iletisim" },
  ],
  hero: {
    title: "Understand the official letter — your case stays on track",
    subtitle:
      "We explain institution letters in PL / EN / TR: what is asked, the deadline, what comes next.",
    badges: ["Summary in your language", "Lawyer runs it · we track"],
    ctaPrimary: "Apply",
    ctaSecondary: "WhatsApp",
    ctaHeader: "Apply",
    accountLink: "Account",
    trustLine:
      "POL-TURK is not a law firm. Polish lawyer partners run the legal process.",
    eyebrow: "Official letter · your language · tracked",
    documentDemo: {
      docLabel: "Summary card",
      keywords: ["wezwanie", "termin", "załącznik"],
      footnote: "Example only — fields differ on your actual case.",
      rows: [
        { label: "What is requested", value: "Extra document + form" },
        { label: "Deadline", value: "14 days" },
        { label: "Next step", value: "Upload files / forward to lawyer" },
      ],
    },
  },
  whatWeDo: {
    eyebrow: "Role split",
    title: "Who does what?",
    intro:
      "Information flows through POL-TURK; legal decisions stay with the partner lawyer — we are not a law firm.",
    lanes: {
      lawyer: {
        label: "Partner lawyer",
        note: "Legal decisions and representation (separate lane)",
      },
      institution: {
        label: "Authority / ZUS",
        action: "Official letter arrives",
      },
      bridge: {
        label: "POL-TURK",
        action: "Explains · tracks · coordinates",
      },
      you: {
        label: "You",
        action: "You know what to do",
      },
    },
  },
  portalSteps: {
    steps: ["Payment", "Received", "In progress", "Ready"],
  },
  services: {
    title: "Services",
    intro: "Company, individual, or a single letter — pick the package that fits.",
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
        badge: "For companies",
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
        badge: "Company / individual",
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
        badge: "Company or individual",
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
  scope: {
    title: "Scope",
    eyebrow: "Boundaries",
    intro: "What we do and do not do — a clear line.",
    includedTitle: "What we do",
    excludedTitle: "What we do not",
    included: [
      "PL / EN / TR summary of the letter — request, deadline, who acts",
      "Track case status: what arrived, what comes next",
      "Coordination between lawyer partner, institution and you",
      "Current information on your private case page",
      "On request — sworn translation via sworn translators",
    ],
    excluded: [
      "Lawyering, legal advice and court (with the lawyer partner)",
      "Bookkeeping and tax filings",
      "Guaranteeing a decision or a deadline",
      "Presenting ourselves as a lawyer or sworn translator",
    ],
    collaboration: {
      title: "Who does what?",
      body: "Polish lawyer partners run the legal process — advice and representation stay with them. POL-TURK is not a law firm: we explain letters in your language, track the case, coordinate the parties. Tax stays with the bookkeeper; sworn translation with a sworn translator.",
    },
  },
  whyUs: {
    title: "Why POL-TURK?",
    intro:
      "We leave the law to the lawyer. You understand the letter and see where the case stands — companies and individuals to the same standard.",
    concessionTitle: "",
    concessionBody: "",
    compareTitle: "",
    compareThemLabel: "",
    compareUsLabel: "",
    compareRows: [],
    itemsTitle: "",
    items: [
      {
        title: "You understand the letter",
        body: "PL / EN / TR summary: request, deadline, who acts — without legal jargon.",
      },
      {
        title: "You track the case",
        body: "Status does not get lost between lawyer and institution. Updates on your case page; email reminders when something changes.",
      },
      {
        title: "Three languages",
        body: "PL / EN / TR. Sworn translation through sworn translators when required — priced separately.",
      },
      {
        title: "An honest limit",
        body: "We do not promise the decision. The institution and licensed professionals decide.",
      },
    ],
  },
  process: {
    title: "How it works",
    steps: [
      {
        title: "Send the letter",
        body: "Apply with the file or describe your case. Choose the language (PL / EN / TR).",
      },
      {
        title: "We explain",
        body: "What is asked, the deadline, what comes next — in your language. When law is needed, the lawyer partner steps in.",
      },
      {
        title: "The lawyer runs it",
        body: "The legal side sits with the Polish lawyer partner; control and representation stay there.",
      },
      {
        title: "Tracking and updates",
        body: "We inform you as things move. Download the result from your case page when ready.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        id: "ne",
        question: "What do you do?",
        answer:
          "We explain official letters in PL / EN / TR: what is asked, the deadline, what comes next. We track status and coordinate between you and the lawyer partner. We do not run the legal process — that stays with the lawyer.",
      },
      {
        id: "kim",
        question: "Who is this for?",
        answer:
          "Foreign companies in Poland and individuals who need clear language and tracking on administrative matters.",
      },
      {
        id: "dil",
        question: "Which languages do you work in?",
        answer:
          "PL / EN / TR. Sworn translation goes through sworn translators; pricing is separate.",
      },
      {
        id: "muhasebe",
        question: "We already have a bookkeeper. Why you?",
        answer:
          "The bookkeeper keeps the books. Letters and process often get lost between management and the lawyer. We clarify language and status; tax stays with the bookkeeper, law with the lawyer.",
      },
      {
        id: "fiyat",
        question: "What does it cost?",
        answer:
          "Monthly admin tracking from 160 zł. POA execution: company 1 200 zł, individual 650 zł. Single letter from 50 zł. Lawyer fees are separate. Details under services.",
      },
      {
        id: "vekalet",
        question: "Do you go to the office?",
        answer:
          "Only on the notarial-POA admin package. Legal representation stays with the lawyer partner.",
      },
      {
        id: "sonuc",
        question: "How do I get the result?",
        answer:
          "No account. After payment we email your private link; when the result is ready we email the same link again. You download from that page — we do not attach the file.",
      },
      {
        id: "garanti",
        question: "Do you guarantee the outcome?",
        answer:
          "No. The institution and licensed professionals decide. We provide explanation, tracking and coordination — not a promised result.",
      },
      {
        id: "avukat",
        question: "Are you a lawyer?",
        answer:
          "No. Polish lawyer partners run the legal process. We explain letters in your language and track the case.",
      },
    ],
  },
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
    form: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      phoneCode: "Country code",
      serviceType: "Service",
      message: "Company / individual, city, what you need",
      privacy: "I agree to processing of my data for contact.",
      submit: "Send",
      loading: "Sending…",
      success: "Message received. We will reply shortly.",
      error: "Could not send. Please try again.",
      rateLimited: "Too many tries. Please wait a bit.",
      fieldError: "Check this field.",
      fileNote: "To upload a letter and pay, use the apply page:",
      otherService: "Other",
    },
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
  socialProof: {
    eyebrow: "Transparency",
    title: "No fake customer counts — you see the process",
    note: "We do not promise approval or timelines. The authority decides.",
    badges: ["PL", "EN", "TR"],
    signals: [],
    flowTitle: "What you see after payment",
    flowNote:
      "Every case follows the same steps — status in your account and in the email link.",
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
    foundationNote: "",
    contentComplete: true,
  },
};
