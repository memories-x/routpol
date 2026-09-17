import { faqPl } from "./faq";
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
  portalSteps: {
    steps: ["Płatność", "Przyjęte", "W toku", "Gotowe"],
  },
  services: {
    title: "Usługi",
    intro:
      "Doradztwo inwestycyjne i założenie spółki dla przedsiębiorców z TR; most administracyjny dla firm tureckich w PL. Trzy pakiety: jedno pismo, opieka miesięczna, prowadzenie z POA.",
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
        badge: "Firma · tracking",
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
        badge: "Założenie · POA",
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
        badge: "Jednorazowo",
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
  faq: faqPl,
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
    whatsappLabel: "WhatsApp",
    foundationNote: "",
    contentComplete: true,
  },
};
