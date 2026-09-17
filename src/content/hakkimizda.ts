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
    "ROUTEPOL: Türkiye’deki işletmeciler ve Polonya’daki Türk ile yabancı şirketler için idari takip. Resmi yazı özeti, dosya izleme, kurumsal koordinasyon. Avukatlık değildir.",
  eyebrow: "Kurumsal kimlik",
  title: "Hakkımızda",
  lead: "ROUTEPOL — Polonya’da yol gösteren rota. Resmi yazışma ve idari süreçlerde dil köprüsü ile dosya takibi sunan operasyon masasıdır. Avukatlık, mali müşavirlik veya yeminli tercümanlık yürütmeyiz. Karar yetkisi ilgili mercide ve sözleşmeli Polonyalı avukat ortağındadır.",
  whoTitle: "Hizmet kapsamı",
  who: [
    "Hizmet iki ana kitleye yöneliktir: Türkiye’de yerleşik işletmeciler ile Polonya’da faaliyet gösteren Türk ve yabancı sermayeli şirketler. Her iki grup için Polonya kurumlarıyla yazılı ve izlenebilir bir idari operasyon hattı kurulur.",
    "Aynı operasyon standardı yereldeki KOBİ’ler, lojistik işletmeleri ve şahıs düzeyindeki urząd süreçleri için geçerlidir: kapsam net tanımlanır, dil açık tutulur, dosya durumu tek noktada izlenir.",
    "Çalışma dilleri: Türkçe, Lehçe ve İngilizce; gerektiğinde Rusça ve Ukraynaca.",
  ],
  doTitle: "Hizmetlerimiz",
  doItems: [
    {
      title: "Resmi yazı özeti",
      body: "Kurum yazısının talebini, süresini ve sıradaki adımı müşterinin dilinde özetleriz. Bu metin hukuki mütalaa değildir.",
    },
    {
      title: "Dosya takibi",
      body: "Durum, evrak ve sonuç dosya sayfasında tek noktada tutulur. Evrak e-posta eki olarak iletilmez.",
    },
    {
      title: "Kurumsal koordinasyon",
      body: "Avukat, noter, muhasebeci ve müşteri arasında bilgi akışını düzenleriz. Yatırım ve şirket kuruluşunda idari süreç haritası çıkarılır; dosya yetkili ortağa iletilir. Tescil işlemi tarafımızca yapılmaz.",
    },
    {
      title: "İdari eşlik",
      body: "Noter onaylı idari vekalet bulunması halinde evrak ve randevu koordinasyonu sağlanır. Bu hizmet hukuki temsil niteliği taşımaz.",
    },
  ],
  roleTitle: "Rol ayrımı",
  roleUs: {
    label: "ROUTEPOL",
    body: "Dil özeti, dosya takibi, evrak koordinasyonu ve idari danışmanlık.",
  },
  roleLawyer: {
    label: "Avukat ortağı",
    body: "Hukuki tavsiye, temsil, sözleşme, noter işlemleri ve KRS kararı.",
  },
  roleYou: {
    label: "Müşteri",
    body: "Karar, imza, ödeme ve yetkili mercilere sunulacak asıl evrak.",
  },
  notTitle: "Kapsam dışı",
  notItems: [
    "Avukatlık, dava, hukuki tavsiye veya hukuki süreç yönetimi iddiası",
    "Şirket tescili, KRS veya vergi kararı alınması",
    "Muhasebe defteri tutulması ve beyanname imzası",
    "Onay, süre veya sonuç garantisi",
    "MOS / urząd form otomasyonu",
  ],
  howTitle: "Çalışma modeli",
  how: [
    "Uygun paket seçilir (tek yazı; veya aylık / vekaletli Stripe aboneliği).",
    "Bireysel veya kurumsal bilgiler tamamlanır; ilgili yazı yüklenir; ödeme Stripe üzerinden alınır. Aylık paketlerde karttan otomatik yenileme uygulanır.",
    "Operasyon ekibi özeti hazırlar; sonuç aynı dosya üzerinden indirilir.",
    "İşler ve geçmiş hesapta tutulur (e-posta ve şifre ile erişim).",
  ],
  ctaPackages: "Paketler",
  ctaContact: "İletişim",
  packagesHref: "/hizmetler#paketler",
  contactHref: "#iletisim",
};

const pl: AboutContent = {
  metaTitle: "O nas",
  metaDescription:
    "ROUTEPOL: tracking administracyjny dla przedsiębiorców z Turcji oraz firm tureckich i zagranicznych w Polsce. Streszczenie pism, monitoring teczki, koordynacja. Nie jesteśmy kancelarią.",
  eyebrow: "Tożsamość",
  title: "O nas",
  lead: "ROUTEPOL — Trasa, która prowadzi w Polsce. Stanowisko operacyjne zapewniające most językowy i monitoring spraw przy pismach urzędowych oraz procesach administracyjnych w Polsce. Nie prowadzimy kancelarii, biura rachunkowego ani tłumaczeń przysięgłych. Decyzja należy do właściwego organu oraz polskiego adwokata-partnera.",
  whoTitle: "Zakres usług",
  who: [
    "Usługa obejmuje dwie główne grupy: przedsiębiorców z siedzibą w Turcji oraz firmy tureckie i zagraniczne działające w Polsce. Dla obu grup tworzymy pisemną, odtwarzalną linię operacyjną wobec polskich instytucji.",
    "Ten sam standard obowiązuje lokalne MŚP, podmioty logistyczne oraz sprawy osób prywatnych przed urzędem: zakres jest jasno określony, język komunikatu precyzyjny, status sprawy widoczny w jednej teczce.",
    "Języki robocze: turecki, polski i angielski; w razie potrzeby rosyjski i ukraiński.",
  ],
  doTitle: "Nasze usługi",
  doItems: [
    {
      title: "Streszczenie pisma urzędowego",
      body: "Przedstawiamy żądanie organu, termin oraz kolejny krok w języku klienta. Tekst nie stanowi opinii prawnej.",
    },
    {
      title: "Monitoring teczki",
      body: "Status, dokumenty i wynik pozostają na stronie sprawy. Akt nie są przesyłane jako załączniki e-mail.",
    },
    {
      title: "Koordynacja instytucjonalna",
      body: "Uporządkowujemy przepływ informacji między adwokatem, notariuszem, księgowym a klientem. Przy inwestycji i założeniu spółki przygotowujemy mapę procesu administracyjnego i przekazujemy teczkę partnerowi. Nie dokonujemy wpisu spółki.",
    },
    {
      title: "Towarzyszenie administracyjne",
      body: "Przy notarialnym pełnomocnictwie administracyjnym zapewniamy koordynację pism i terminów. Usługa nie stanowi reprezentacji procesowej.",
    },
  ],
  roleTitle: "Podział ról",
  roleUs: {
    label: "ROUTEPOL",
    body: "Streszczenie językowe, monitoring sprawy, koordynacja dokumentów i doradztwo administracyjne.",
  },
  roleLawyer: {
    label: "Adwokat-partner",
    body: "Porada prawna, reprezentacja, umowy, czynności notarialne oraz decyzja KRS.",
  },
  roleYou: {
    label: "Klient",
    body: "Decyzja, podpis, płatność oraz oryginalne dokumenty dla organu.",
  },
  notTitle: "Poza zakresem",
  notItems: [
    "Usługi kancelaryjne, spory, porada prawna ani twierdzenie o prowadzeniu procesu prawnego",
    "Rejestracja spółki, decyzja KRS lub podatkowa",
    "Prowadzenie ksiąg i podpisywanie deklaracji",
    "Gwarancja decyzji, terminu lub wyniku",
    "Automatyzacja formularzy MOS / urzędu",
  ],
  howTitle: "Model współpracy",
  how: [
    "Wybór odpowiedniego pakietu (jedno pismo albo abonament miesięczny / z POA w Stripe).",
    "Uzupełnienie danych osoby lub firmy, wgranie pisma, płatność przez Stripe. Pakiety miesięczne odnawiają się automatycznie kartą.",
    "Zespół operacyjny przygotowuje wynik; pobranie następuje z tej samej teczki.",
    "Historia spraw pozostaje na koncie klienta (logowanie e-mail i hasło).",
  ],
  ctaPackages: "Pakiety",
  ctaContact: "Kontakt",
  packagesHref: "/hizmetler#paketler",
  contactHref: "#iletisim",
};

const en: AboutContent = {
  metaTitle: "About us",
  metaDescription:
    "ROUTEPOL: administrative tracking for Turkey-based operators and Turkish or foreign companies in Poland. Letter summaries, file monitoring, institutional coordination. Not a law firm.",
  eyebrow: "Identity",
  title: "About us",
  lead: "ROUTEPOL — The route that guides you in Poland. An operations desk providing a language bridge and file monitoring for official correspondence and administrative processes in Poland. We do not practise law, bookkeeping or sworn translation. Decisions rest with the competent authority and our contracted Polish lawyer partner.",
  whoTitle: "Service scope",
  who: [
    "The service addresses two primary audiences: operators established in Turkey, and Turkish or foreign-capital companies already active in Poland. For both, we establish a written, auditable administrative operations line with Polish institutions.",
    "The same operating standard applies to local SMEs, logistics businesses and individual urząd matters: scope is defined clearly, language is kept precise, and case status is monitored in a single file.",
    "Working languages: Turkish, Polish and English; Russian and Ukrainian when required.",
  ],
  doTitle: "Our services",
  doItems: [
    {
      title: "Official letter summary",
      body: "We summarise the authority's request, the deadline and the next step in the client's language. This text is not a legal opinion.",
    },
    {
      title: "File monitoring",
      body: "Status, documents and the outcome remain on the case page. Files are not sent as email attachments.",
    },
    {
      title: "Institutional coordination",
      body: "We organise information flow among the lawyer, notary, bookkeeper and the client. For investment and company formation we prepare an administrative process map and hand the file to the authorised partner. We do not register the company.",
    },
    {
      title: "Administrative accompaniment",
      body: "Where a notarial administrative power of attorney is in place, we coordinate papers and appointments. This service is not legal representation.",
    },
  ],
  roleTitle: "Role separation",
  roleUs: {
    label: "ROUTEPOL",
    body: "Language summary, file monitoring, document coordination and administrative advisory.",
  },
  roleLawyer: {
    label: "Lawyer partner",
    body: "Legal advice, representation, contracts, notarial acts and KRS decisions.",
  },
  roleYou: {
    label: "Client",
    body: "Decisions, signatures, payment and original documents for the authority.",
  },
  notTitle: "Out of scope",
  notItems: [
    "Legal practice, litigation, legal advice, or claims of running a legal case",
    "Company registration, KRS or tax rulings",
    "Bookkeeping and signing tax returns",
    "Guarantees of approval, timing or outcome",
    "MOS / office form automation",
  ],
  howTitle: "Operating model",
  how: [
    "The appropriate package is selected (single letter, or monthly / POA Stripe subscription).",
    "Individual or corporate details are completed; the letter is uploaded; payment is taken via Stripe. Monthly packages renew automatically on the card.",
    "The operations team prepares the result; download is from the same file.",
    "Work history remains on the client account (email and password access).",
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
