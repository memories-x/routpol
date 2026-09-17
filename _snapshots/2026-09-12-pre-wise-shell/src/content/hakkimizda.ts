import type { Locale } from "@/lib/i18n";

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  whoTitle: string;
  who: string[];
  doTitle: string;
  doItems: { title: string; body: string }[];
  roleTitle: string;
  roleUs: { label: string; body: string };
  roleLawyer: { label: string; body: string };
  roleYou: { label: string; body: string };
  notTitle: string;
  notItems: string[];
  howTitle: string;
  how: string[];
  ctaPackages: string;
  ctaContact: string;
  packagesHref: string;
  contactHref: string;
};

const tr: AboutContent = {
  metaTitle: "Hakkımızda",
  metaDescription:
    "POL-TURK: Polonya idari köprü. Resmi yazıyı anlatır, süreci takip eder. Avukatlık değildir.",
  eyebrow: "Kurumsal kimlik",
  title: "Hakkımızda",
  lead: "POL-TURK, Polonya’daki resmi yazı ve idari süreçlerde dil köprüsü ve takip masasıdır. Avukat, mali müşavir veya yeminli tercüman değiliz. Karar urzęde ve sözleşmeli Polonyalı avukat ortağındadır.",
  whoTitle: "Kimiz",
  who: [
    "Türkiye merkezli işletmeciler ile Polonya’daki kurumlar arasında yazılı, izlenebilir bir operasyon hattı kurarız.",
    "Yereldeki KOBİ, lojistik işyerleri ve şahıs urzęd işlerinde aynı standart geçerlidir: kapsam net, dil açık, durum dosyada kalır.",
    "Ekip dilleri: Türkçe, Lehçe, İngilizce; ihtiyaçta Rusça ve Ukraynaca.",
  ],
  doTitle: "Ne yapıyoruz",
  doItems: [
    {
      title: "Yazıyı anlatmak",
      body: "Kurum yazısının ne istediğini, süreyi ve sıradaki adımı sizin dilinizde özetleriz. Bu hukuki görüş değildir.",
    },
    {
      title: "Takip",
      body: "Dosya sayfasında durum, evrak ve sonuç tek yerde durur. E-posta ekiyle evrak göndermeyiz.",
    },
    {
      title: "Koordinasyon",
      body: "Avukat, noter, muhasebeci ve sizin aranızda bilgi kaybolmasın diye sırayı tutarız. Yatırım ve şirket kuruluşunda idari harita çizer, süreci ortağa iletiriz — tescili biz yapmayız.",
    },
    {
      title: "İdari eşlik",
      body: "Noter vekaleti varsa evrak ve randevu koordinasyonu sunulur. Bu hukuki temsil değildir.",
    },
  ],
  roleTitle: "Rol ayrımı",
  roleUs: {
    label: "POL-TURK",
    body: "Dil özeti, durum takibi, evrak koordinasyonu, idari danışmanlık.",
  },
  roleLawyer: {
    label: "Avukat ortağı",
    body: "Hukuki tavsiye, temsil, sözleşme, noter ve KRS kararı.",
  },
  roleYou: {
    label: "Siz",
    body: "Karar, imza, ödeme ve yetkili mercilere sunulacak asıl evrak.",
  },
  notTitle: "Ne yapmıyoruz",
  notItems: [
    "Avukatlık, dava, hukuki tavsiye veya “sürecinizi yönetiyoruz” vaadi",
    "Şirket tescili, KRS veya vergi kararı",
    "Muhasebe defteri ve beyanname imzası",
    "Onay, süre veya sonuç garantisi",
    "MOS / urząd form otomasyonu",
  ],
  howTitle: "Nasıl çalışır",
  how: [
    "Paket seçilir (tek yazı, aylık takip veya vekaletli idari yürütme).",
    "Müşteri bireysel veya kurumsal bilgilerini doldurur; yazı yüklenir; ödeme Stripe ile alınır.",
    "Operatör özeti hazırlar; sonuç aynı dosyadan indirilir.",
    "Hesabınızda işler ve geçmiş kalır (e-posta ve şifre).",
  ],
  ctaPackages: "Paketler",
  ctaContact: "İletişim",
  packagesHref: "/hizmetler#paketler",
  contactHref: "#iletisim",
};

const pl: AboutContent = {
  metaTitle: "O nas",
  metaDescription:
    "POL-TURK: most administracyjny w Polsce. Wyjaśniamy pisma, śledzimy sprawę. Nie jesteśmy kancelarią.",
  eyebrow: "Tożsamość",
  title: "O nas",
  lead: "POL-TURK to most językowy i biurko śledzenia spraw przy pismach urzędowych w Polsce. Nie jesteśmy kancelarią, biurem rachunkowym ani tłumaczem przysięgłym. Decyzja należy do urzędu i polskiego adwokata-partnera.",
  whoTitle: "Kim jesteśmy",
  who: [
    "Łączymy przedsiębiorców z Turcji z polskimi urzędami linią pisemną i możliwą do odtworzenia.",
    "Ten sam standard dotyczy lokalnych MŚP, logistyki i spraw osób prywatnych: zakres, język, status w teczce.",
    "Języki: turecki, polski, angielski; w razie potrzeby rosyjski i ukraiński.",
  ],
  doTitle: "Co robimy",
  doItems: [
    {
      title: "Wyjaśnienie pisma",
      body: "Czego urząd chce, jaki termin, jaki następny krok — w Waszym języku. To nie jest opinia prawna.",
    },
    {
      title: "Śledzenie",
      body: "Status, dokumenty i wynik zostają na stronie sprawy. Nie wysyłamy akt w załączniku.",
    },
    {
      title: "Koordynacja",
      body: "Między adwokatem, notariuszem, księgowym i Wami. Przy inwestycji i założeniu spółki rysujemy mapę administracyjną i przekazujemy partnerowi — wpisu nie dokonujemy.",
    },
    {
      title: "Towarzyszenie administracyjne",
      body: "Przy pełnomocnictwie notarialnym koordynujemy pisma i terminy. To nie jest zastępstwo procesowe.",
    },
  ],
  roleTitle: "Podział ról",
  roleUs: {
    label: "POL-TURK",
    body: "Streszczenie językowe, tracking, koordynacja dokumentów, doradztwo administracyjne.",
  },
  roleLawyer: {
    label: "Adwokat-partner",
    body: "Porada prawna, reprezentacja, umowa, notariusz i decyzja KRS.",
  },
  roleYou: {
    label: "Państwo",
    body: "Decyzja, podpis, płatność i oryginalne dokumenty dla urzędu.",
  },
  notTitle: "Czego nie robimy",
  notItems: [
    "Kancelaria, spór, porada prawna ani obietnica „prowadzimy sprawę”",
    "Rejestracja spółki, KRS lub decyzja podatkowa",
    "Księgi i podpisywanie deklaracji",
    "Gwarancja decyzji, terminu lub wyniku",
    "Automatyzacja formularzy MOS / urzędu",
  ],
  howTitle: "Jak działamy",
  how: [
    "Wybór pakietu (jedno pismo, opieka miesięczna albo prowadzenie z pełnomocnictwem).",
    "Dane osoby lub firmy, wgranie pisma, płatność Stripe.",
    "Operator przygotowuje wynik; pobieracie go z tej samej teczki.",
    "Sprawy zostają na koncie (e-mail i hasło).",
  ],
  ctaPackages: "Pakiety",
  ctaContact: "Kontakt",
  packagesHref: "/hizmetler#paketler",
  contactHref: "#iletisim",
};

const en: AboutContent = {
  metaTitle: "About us",
  metaDescription:
    "POL-TURK: an administrative bridge in Poland. We explain official letters and track the file. Not a law firm.",
  eyebrow: "Identity",
  title: "About us",
  lead: "POL-TURK is a language bridge and tracking desk for official letters and administrative processes in Poland. We are not a law firm, bookkeeper or sworn translator. Decisions sit with the authority and our Polish lawyer partner.",
  whoTitle: "Who we are",
  who: [
    "We run a written, traceable line between Turkey-based operators and Polish institutions.",
    "The same standard applies to local SMEs, logistics sites and individual office matters: scope, language, status on the file.",
    "Languages: Turkish, Polish, English; Russian and Ukrainian when needed.",
  ],
  doTitle: "What we do",
  doItems: [
    {
      title: "Explain the letter",
      body: "What the office wants, the deadline, the next step — in your language. This is not legal advice.",
    },
    {
      title: "Track the file",
      body: "Status, documents and the result stay on the case page. We do not send files as email attachments.",
    },
    {
      title: "Coordinate",
      body: "Between lawyer, notary, bookkeeper and you. For investment and company set-up we map the admin path and hand the file to the partner — we do not register the company.",
    },
    {
      title: "Admin accompaniment",
      body: "With a notarial power of attorney we coordinate papers and appointments. That is not legal representation.",
    },
  ],
  roleTitle: "Who does what",
  roleUs: {
    label: "POL-TURK",
    body: "Language summary, tracking, document coordination, administrative advisory.",
  },
  roleLawyer: {
    label: "Lawyer partner",
    body: "Legal advice, representation, contracts, notary and KRS decisions.",
  },
  roleYou: {
    label: "You",
    body: "Decisions, signatures, payment and original papers for the authority.",
  },
  notTitle: "What we do not do",
  notItems: [
    "Law practice, litigation, legal advice, or “we run your case” claims",
    "Company registration, KRS or tax rulings",
    "Bookkeeping and signing tax returns",
    "Guarantees of approval, timing or outcome",
    "MOS / office form automation",
  ],
  howTitle: "How it works",
  how: [
    "Choose a package (single letter, monthly tracking, or POA admin execution).",
    "Individual or company details, upload the letter, pay with Stripe.",
    "The operator prepares the result; you download it from the same file.",
    "Work stays on your account (email and password).",
  ],
  ctaPackages: "Packages",
  ctaContact: "Contact",
  packagesHref: "/hizmetler#paketler",
  contactHref: "#iletisim",
};

const catalog: Record<Locale, AboutContent> = { tr, pl, en };

export function getAboutContent(locale: string): AboutContent {
  if (locale === "pl" || locale === "en") return catalog[locale];
  return catalog.tr;
}
