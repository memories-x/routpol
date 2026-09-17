import type { SiteContent } from "./types";

export const pl: SiteContent = {
  meta: {
    title: "POL-TURK | Pisma urzędowe w Waszym języku — status pod kontrolą",
    description:
      "Wyjaśniamy pisma PL / EN / TR: czego chcą, jaki termin, co dalej. Proces prawny prowadzą polscy adwokaci-partnerzy — nie jesteśmy adwokatem.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "Wyjaśniamy pismo, śledzimy sprawę",
  },
  nav: [
    { id: "paketler", label: "Usługi", href: "#paketler" },
    { id: "sinirlar", label: "Zakres", href: "#sinirlar" },
    { id: "surec", label: "Jak to działa?", href: "#surec" },
    { id: "neden-biz", label: "Dlaczego my", href: "#neden-biz" },
    { id: "sss", label: "FAQ", href: "#sss" },
    { id: "iletisim", label: "Kontakt", href: "#iletisim" },
  ],
  hero: {
    title: "Rozumiecie pismo urzędowe — sprawa się nie gubi",
    subtitle:
      "Wyjaśniamy pisma PL / EN / TR: czego chcą, jaki termin, co dalej.",
    badges: ["Streszczenie w Waszym języku", "Adwokat prowadzi · my śledzimy"],
    ctaPrimary: "Złóż wniosek",
    ctaSecondary: "WhatsApp",
    ctaHeader: "Wniosek",
    accountLink: "Konto",
    trustLine:
      "POL-TURK nie jest kancelarią. Proces prawny prowadzą polscy adwokaci-partnerzy.",
    eyebrow: "Pismo urzędowe · w Twoim języku",
    documentDemo: {
      docLabel: "Karta podsumowania",
      keywords: ["wezwanie", "termin", "załącznik"],
      footnote: "Przykład — w realnej sprawie pola mogą się różnić.",
      rows: [
        { label: "Czego wymagają", value: "Dokument + formularz" },
        { label: "Termin", value: "14 dni" },
        { label: "Następny krok", value: "Prześlij pliki / do adwokata" },
      ],
    },
  },
  whatWeDo: {
    eyebrow: "Podział ról",
    title: "Kto co robi?",
    intro:
      "Przepływ informacji idzie przez POL-TURK; decyzje prawne zostają u partnera adwokata — nie jesteśmy kancelarią.",
    lanes: {
      lawyer: {
        label: "Partner prawny",
        note: "Decyzje prawne i reprezentacja (osobny pas)",
      },
      institution: {
        label: "Urząd / ZUS",
        action: "Przychodzi pismo urzędowe",
      },
      bridge: {
        label: "POL-TURK",
        action: "Wyjaśnia · śledzi · koordynuje",
      },
      you: {
        label: "Państwo",
        action: "Wiedzą, co zrobić",
      },
    },
  },
  portalSteps: {
    steps: ["Płatność", "Przyjęte", "W toku", "Gotowe"],
  },
  services: {
    title: "Usługi",
    intro: "Firma, osoba fizyczna lub jedno pismo — wybierzcie pakiet.",
    detailCta: "Złóż wniosek",
    detailBack: "Wróć do usług",
    includedLabel: "W cenie",
    excludedLabel: "Poza zakresem",
    priceLabel: "Opłata",
    items: [
      {
        slug: "aylik-paket",
        icon: "Mail",
        title: "Miesięczna opieka administracyjna",
        badge: "Dla firm",
        shortDescription:
          "Pisma urzędowe PL / EN / TR: czego chcą, jaki termin, co dalej — przez cały miesiąc.",
        detailLabel: "Szczegóły",
        priceFrom: "od 160 zł / mies.",
        priceRows: [
          { label: "4 pisma", amount: "160 zł" },
          { label: "6 pism", amount: "240 zł" },
          { label: "8 pism", amount: "320 zł" },
          { label: "10 pism", amount: "400 zł" },
          { label: "12 pism", amount: "480 zł" },
        ],
        priceNote:
          "40 zł za pismo. Minimum 4. Honorarium adwokata osobno. Firma zagraniczna i osoba.",
        details: [
          "Streszczenie PL / EN / TR",
          "Żądanie i termin",
          "Następny krok: Wy, księgowy lub adwokat-partner",
        ],
        notIncluded: [
          "Porada prawna i procesy (adwokat-partner)",
          "Księgowość",
          "Gwarancja decyzji",
        ],
      },
      {
        slug: "surec-yonetimi",
        icon: "FileSignature",
        title: "Prowadzenie z pełnomocnictwem",
        badge: "Firma / osoba",
        shortDescription:
          "Koordynacja dokumentów i terminów z pełnomocnictwem administracyjnym. Status w Waszym języku; kontakt z adwokatem-partnerem i śledzenie.",
        detailLabel: "Szczegóły",
        priceFrom: "od 650 zł / mies.",
        priceRows: [
          { label: "Firma", amount: "1 200 zł / mies." },
          { label: "Osoba", amount: "650 zł / mies." },
        ],
        priceNote:
          "Taksa notariusza po Waszej stronie. Honorarium adwokata osobno. Tylko sprawy administracyjne.",
        details: [
          "Koordynacja dokumentów i terminów (pełnomocnictwo administracyjne)",
          "Status sprawy PL / EN / TR — co się dzieje, co dalej",
          "Kontakt z adwokatem-partnerem i śledzenie",
        ],
        notIncluded: [
          "Opłata notariusza",
          "Honorarium adwokata, porada i procesy",
          "Księgowość",
          "Gwarancja decyzji",
        ],
      },
      {
        slug: "tek-yazi",
        icon: "FileText",
        title: "Jedno pismo",
        badge: "Firma lub osoba",
        shortDescription:
          "Jedno pismo: wyjaśnienie w Waszym języku i jasny następny krok. Gdy trzeba prawa — kierujemy do adwokata-partnera. Bez abonamentu.",
        detailLabel: "Szczegóły",
        priceFrom: "od 50 zł",
        priceRows: [
          { label: "Do 2 stron", amount: "50 zł" },
          { label: "Każda kolejna strona", amount: "+25 zł" },
        ],
        priceNote:
          "Strony z pliku. Pierwsze dwie 50 zł; każda następna +25 zł. Adwokat osobno.",
        details: [
          "Wyjaśnienie PL / EN / TR",
          "Czego chcą i termin",
          "Kto działa (Wy / księgowy / adwokat)",
        ],
        notIncluded: [
          "Porada i reprezentacja prawna",
          "Stały monitoring",
          "Księgowość",
        ],
      },
    ],
  },
  scope: {
    title: "Zakres",
    eyebrow: "Granice",
    intro: "Co robimy, czego nie robimy — jasna linia.",
    includedTitle: "Robimy",
    excludedTitle: "Nie robimy",
    included: [
      "Streszczenie pisma PL / EN / TR — żądanie, termin, kto działa",
      "Śledzenie statusu: co przyszło, co dalej",
      "Koordynacja między adwokatem-partnerem, urzędem a Wami",
      "Aktualna informacja — na Waszej stronie sprawy",
      "Na życzenie — tłumaczenie przysięgłe przez tłumaczy przysięgłych",
    ],
    excluded: [
      "Adwokatura, porada prawna i procesy (u adwokata-partnera)",
      "Księgowość i deklaracje",
      "Gwarancja decyzji lub terminu",
      "Przedstawianie się jako adwokat lub tłumacz przysięgły",
    ],
    collaboration: {
      title: "Kto co robi?",
      body: "Proces prawny prowadzą polscy adwokaci-partnerzy — porada i reprezentacja u nich. POL-TURK nie jest adwokatem: wyjaśnia pisma w Waszym języku, śledzi sprawę, koordynuje strony. Podatki u księgowego; tłumaczenie przysięgłe u tłumacza przysięgłego.",
    },
  },
  whyUs: {
    title: "Dlaczego POL-TURK?",
    intro:
      "Prawo zostawiamy adwokatowi. Wy rozumiecie pismo i widzicie, gdzie jest sprawa — firma i osoba tym samym standardem.",
    concessionTitle: "",
    concessionBody: "",
    compareTitle: "",
    compareThemLabel: "",
    compareUsLabel: "",
    compareRows: [],
    itemsTitle: "",
    items: [
      {
        title: "Rozumiecie pismo",
        body: "Streszczenie PL / EN / TR: żądanie, termin, kto działa — bez prawniczego żargonu.",
      },
      {
        title: "Śledzicie sprawę",
        body: "Status nie ginie między adwokatem a urzędem. Aktualizacje na stronie sprawy; przypomnienie e-mailem.",
      },
      {
        title: "Trzy języki",
        body: "PL / EN / TR. Tłumaczenie przysięgłe — przez tłumaczy przysięgłych; koszt osobno.",
      },
      {
        title: "Szczera granica",
        body: "Nie gwarantujemy decyzji. Decyzja należy do urzędu i uprawnionych zawodów.",
      },
    ],
  },
  process: {
    title: "Jak to działa?",
    steps: [
      {
        title: "Przekażcie pismo",
        body: "Wniosek z plikiem lub opisem sprawy. Wybieracie język (PL / EN / TR).",
      },
      {
        title: "Wyjaśniamy",
        body: "Czego chcą, jaki termin, co dalej — w wybranym języku. Gdy trzeba prawa — adwokat-partner.",
      },
      {
        title: "Adwokat prowadzi",
        body: "Strona prawna u polskiego adwokata-partnera; kontrola i reprezentacja u niego.",
      },
      {
        title: "Status i aktualizacje",
        body: "Informujemy o postępach. Wynik pobieracie ze strony sprawy.",
      },
    ],
  },
  faq: {
    title: "Częste pytania",
    items: [
      {
        id: "ne",
        question: "Co robicie?",
        answer:
          "Wyjaśniamy pisma urzędowe PL / EN / TR: czego chcą, jaki termin, co dalej. Śledzimy status i koordynujemy między adwokatem-partnerem a Wami. Nie prowadzimy procesu prawnego — to u adwokata.",
      },
      {
        id: "kim",
        question: "Dla kogo?",
        answer:
          "Firmy zagraniczne w Polsce i osoby prywatne. Kto potrzebuje jasnego języka i śledzenia spraw administracyjnych.",
      },
      {
        id: "dil",
        question: "W jakich językach pracujecie?",
        answer:
          "PL / EN / TR. Tłumaczenie przysięgłe — przez tłumaczy przysięgłych; koszt osobno.",
      },
      {
        id: "muhasebe",
        question: "Mamy księgowego — po co Wy?",
        answer:
          "Księgowy prowadzi księgi. Pismo i proces często giną między zarządem a adwokatem. My wyjaśniamy język i status; podatki u księgowego, prawo u adwokata.",
      },
      {
        id: "fiyat",
        question: "Ile to kosztuje?",
        answer:
          "Opieka miesięczna od 160 zł. Pełnomocnictwo: firma 1 200 zł, osoba 650 zł. Jedno pismo od 50 zł. Honorarium adwokata osobno. Szczegóły w usługach.",
      },
      {
        id: "vekalet",
        question: "Idziecie do urzędu?",
        answer:
          "Tylko w pakiecie z pełnomocnictwem notarialnym (sprawy administracyjne). Reprezentacja prawna — u adwokata-partnera.",
      },
      {
        id: "sonuc",
        question: "Jak odebrać wynik?",
        answer:
          "Bez konta. Po płatności wysyłamy prywatny link e-mailem; gdy wynik jest gotowy — drugi e-mail z tym samym linkiem. Plik pobieracie ze strony, nie w załączniku.",
      },
      {
        id: "garanti",
        question: "Czy gwarantujecie decyzję?",
        answer:
          "Nie. Decyzja należy do urzędu i uprawnionych. Dajemy wyjaśnienie, śledzenie i koordynację — bez obietnicy wyniku.",
      },
      {
        id: "avukat",
        question: "Jesteście adwokatem?",
        answer:
          "Nie. Proces prawny prowadzą polscy adwokaci-partnerzy. My wyjaśniamy pisma w Waszym języku i śledzimy sprawę.",
      },
    ],
  },
  contact: {
    title: "Kontakt",
    officeLabel: "Spotkanie",
    officeValue: "Polska — po umówieniu",
    emailLabel: "E-mail",
    emailValue: "teklif@pol-turk.example",
    phoneLabel: "Telefon",
    phoneValue: "",
    hoursLabel: "Godziny",
    hoursValue: "Pn–Pt 09:00–17:00 (Europe/Warsaw)",
    form: {
      fullName: "Imię i nazwisko",
      email: "E-mail",
      phone: "Telefon",
      phoneCode: "Kierunkowy",
      serviceType: "Usługa",
      message: "Firma / osoba, miasto, potrzeba",
      privacy: "Zgadzam się na przetwarzanie danych w celu kontaktu.",
      submit: "Wyślij",
      loading: "Wysyłanie…",
      success: "Wiadomość przyjęta. Odezwiemy się wkrótce.",
      error: "Nie wysłano. Spróbujcie ponownie.",
      rateLimited: "Za dużo prób. Spróbujcie później.",
      fieldError: "Sprawdźcie to pole.",
      fileNote: "Aby wgrać pismo i zapłacić, użyjcie strony wniosku:",
      otherService: "Inne",
    },
  },
  footer: {
    disclaimer:
      "POL-TURK nie jest kancelarią adwokacką. Proces prawny prowadzą polscy adwokaci-partnerzy. Wyjaśniamy pisma w Waszym języku i śledzimy sprawę; porada i reprezentacja prawna należą do adwokata. Decyzja urzędu należy do urzędu.",
    privacy: "Prywatność",
    rights: "© POL-TURK. Wszelkie prawa zastrzeżone.",
  },
  privacyPage: {
    title: "Prywatność (RODO)",
    body: "Dane osobowe przetwarzamy wyłącznie w celu świadczenia usługi, płatności i kontaktu; nie sprzedajemy ich marketingowi.",
    sections: [
      {
        title: "Administrator danych",
        paragraphs: [
          "Administrator: POL-TURK (Polska). Nazwa, NIP i adres uzupełniane w env (NEXT_PUBLIC_OPERATOR_*).",
          "Kontakt RODO: e-mail lub adres korespondencyjny na stronie.",
        ],
      },
      {
        title: "Zakres danych",
        paragraphs: [
          "Dane identyfikacyjne i kontaktowe, NIP firmy, metadane dokumentów, identyfikatory płatności Stripe (bez numeru karty).",
        ],
      },
      {
        title: "Podstawa prawna",
        paragraphs: [
          "Umowa (art. 6 ust. 1 lit. b RODO), prawnie uzasadniony interes — logi bezpieczeństwa (lit. f).",
        ],
      },
      {
        title: "Okres przechowywania",
        paragraphs: [
          "Nieopłacone wnioski: 30 dni. Zamknięte sprawy: 24 miesiące, potem usunięcie metadanych i plików.",
        ],
      },
      {
        title: "Prawa",
        paragraphs: [
          "Dostęp, sprostowanie, usunięcie, ograniczenie, sprzeciw, przenoszenie. Skarga: UODO.",
        ],
      },
      {
        title: "Cookies i analityka",
        paragraphs: [
          "Cookies sesji (panel, portal). Analityka bez cookies po stronie serwera — bez reklam.",
        ],
      },
    ],
  },
  socialProof: {
    eyebrow: "Przejrzystość",
    title: "Bez fikcyjnych liczb — widzisz proces",
    note: "Nie gwarantujemy decyzji ani terminów. Decyzja należy do urzędu.",
    badges: ["PL", "EN", "TR"],
    signals: [],
    flowTitle: "Co widzicie po płatności?",
    flowNote:
      "Każda sprawa przechodzi te same kroki — status w koncie i w linku z e-maila.",
  },
  mosGuidePage: {
    title: "O MOS",
    intro:
      "MOS to portal wniosków o pobyt. POL-TURK nie załatwia pobytu. Jeśli do firmy lub do Was przyszło pismo z MOS / urzędu — wyjaśnimy je PL / EN / TR.",
    disclaimer: "Informacja ogólna. Bez porady prawnej i gwarancji.",
    sourcesLabel: "Źródło",
    sources: [
      {
        label: "UDSC — MOS",
        url: "https://www.gov.pl/web/udsc/info-mos",
      },
      {
        label: "Portal MOS",
        url: "https://mos.cudzoziemcy.gov.pl",
      },
    ],
    ctaLabel: "Złóż wniosek",
    backLabel: "Strona główna",
    sections: [
      {
        id: "biz",
        title: "Co robimy?",
        paragraphs: [
          "Jeśli przyszło pismo — wyjaśniamy w wybranym języku (PL / EN / TR): czego chcą, jaki termin, kto ma działać. Nie składamy wniosku za Was.",
        ],
      },
    ],
  },
  system: {
    localeSoon: "",
    whatsappPrefill:
      "Dzień dobry POL-TURK, piszę ze strony. Chcę informacji o wyjaśnieniu pisma / śledzeniu sprawy (firma lub osoba).",
    foundationNote: "",
    contentComplete: true,
  },
};
