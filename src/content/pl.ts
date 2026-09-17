import { faqPl } from "./faq";
import type { SiteContent } from "./types";

export const pl: SiteContent = {
  meta: {
    title: "ROUTEPOL | Pisma urzędowe w Waszym języku — status pod kontrolą",
    description:
      "Wyjaśniamy pisma PL / EN / TR: czego chcą, jaki termin, co dalej. Proces prawny prowadzą polscy adwokaci-partnerzy — nie jesteśmy adwokatem.",
  },
  brand: {
    name: "ROUTEPOL",
    tagline: "Trasa, która prowadzi w Polsce.",
  },
  portalSteps: {
    steps: ["Płatność", "Przyjęte", "W toku", "Gotowe"],
  },
  services: {
    title: "Usługi",
    intro:
      "Doradztwo inwestycyjne i założenie spółki dla przedsiębiorców z TR; tracking administracyjny dla firm tureckich w PL. Pakiety pism (miesięczne = abonament) oraz towarzyszenie na miejscu.",
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
        badge: "Abonament · tracking",
        shortDescription:
          "Pisma urzędowe PL / EN / TR: czego chcą, jaki termin, co dalej — przez cały miesiąc. Abonament Stripe — karta odnawia się co miesiąc; opłata także bez pism.",
        detailLabel: "Szczegóły",
        priceFrom: "od 160 zł / mies.",
        priceRows: [
          { label: "4 pisma", amount: "160 zł" },
          { label: "6 pism", amount: "240 zł" },
          { label: "8 pism", amount: "320 zł" },
          { label: "10 pism", amount: "400 zł" },
        ],
        priceQuote: {
          label: "12 pism i więcej",
          getPriceLabel: "Uzyskaj cenę",
          talkLabel: "Porozmawiajmy",
          href: "?process=aylik-paket#iletisim",
        },
        priceNote:
          "Abonament ciągły: odnowienie kartą co miesiąc automatycznie. Opłata także bez pism w danym miesiącu; niewykorzystany limit nie podlega zwrotowi. 40 zł za pismo; minimum 4. Od 12 pism — wycena / formularz. Honorarium adwokata osobno.",
        details: [
          "Streszczenie PL / EN / TR",
          "Żądanie i termin",
          "Następny krok: Wy, księgowy lub adwokat-partner",
        ],
        notIncluded: [
          "Porada prawna i procesy (adwokat-partner)",
          "Księgowość",
          "Gwarancja decyzji",
          "Zwrot niewykorzystanego limitu",
        ],
      },
      {
        slug: "surec-yonetimi",
        icon: "FileSignature",
        title: "Prowadzenie z pełnomocnictwem",
        badge: "Założenie · abonament",
        shortDescription:
          "Koordynacja dokumentów i terminów z pełnomocnictwem administracyjnym. Status w Waszym języku; kontakt z adwokatem-partnerem i śledzenie. Abonament Stripe — karta odnawia się co miesiąc; opłata także bez spraw.",
        detailLabel: "Szczegóły",
        priceFrom: "od 650 zł / mies.",
        priceRows: [
          { label: "Firma", amount: "1 200 zł / mies." },
          { label: "Osoba", amount: "650 zł / mies." },
        ],
        priceNote:
          "Abonament ciągły: odnowienie kartą co miesiąc automatycznie. Opłata także bez spraw w danym miesiącu. Taksa notariusza po Waszej stronie. Honorarium adwokata osobno. Tylko sprawy administracyjne.",
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
          "Zwrot opłaty za miesiąc bez spraw",
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
      {
        slug: "yerinde-eslik",
        icon: "Building2",
        title: "Towarzyszenie na miejscu",
        badge: "Urząd · bank · biuro",
        shortDescription:
          "Wizyta w instytucji w całej Polsce: most językowy i obecność przy Was (pół dnia). Dojazd poza miastem osobno. Bez gwarancji decyzji.",
        detailLabel: "Szczegóły",
        priceFrom: "450 zł / pół dnia",
        priceRows: [
          { label: "Pół dnia (≈3–4 godz., 1 urząd)", amount: "450 zł" },
        ],
        priceNote:
          "1 wizyta / 1 urząd. Miasto obowiązkowe we wniosku. Dojazd poza miastem i dodatkowe godziny — osobno. To nie jest adwokatura.",
        details: [
          "Most językowy i towarzyszenie w urzędzie / banku / biurze",
          "Krótki briefing przed wizytą",
          "Po wizycie: notatka — co się stało, co dalej",
        ],
        notIncluded: [
          "Gwarancja decyzji urzędu",
          "Reprezentacja prawna / adwokatura",
          "Nielimitowany dojazd lub dodatkowe godziny (osobno)",
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
      "ROUTEPOL nie jest kancelarią adwokacką. Proces prawny prowadzą polscy adwokaci-partnerzy. Wyjaśniamy pisma w Waszym języku i śledzimy sprawę; porada i reprezentacja prawna należą do adwokata. Decyzja urzędu należy do urzędu.",
    privacy: "Prywatność",
    rights: "© ROUTEPOL. Wszelkie prawa zastrzeżone.",
  },
  privacyPage: {
    title: "Prywatność (RODO)",
    body: "Dane osobowe przetwarzamy wyłącznie w celu świadczenia usługi, płatności i kontaktu; nie sprzedajemy ich marketingowi.",
    sections: [
      {
        title: "Administrator danych",
        paragraphs: [
          "Administrator: ROUTEPOL (Polska). Nazwa, NIP i adres uzupełniane w env (NEXT_PUBLIC_OPERATOR_*).",
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
      "MOS to portal wniosków o pobyt. ROUTEPOL nie załatwia pobytu. Jeśli do firmy lub do Was przyszło pismo z MOS / urzędu — wyjaśnimy je PL / EN / TR.",
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
      "Dzień dobry ROUTEPOL, piszę ze strony. Chcę informacji o wyjaśnieniu pisma / śledzeniu sprawy (firma lub osoba).",
    whatsappLabel: "WhatsApp",
    foundationNote: "",
    contentComplete: true,
  },
};
