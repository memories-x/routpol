import type { ServiceDetailContent } from "@/content/service-detail-types";

/**
 * Yerinde eşlik / kurumlar arası idari destek — firma ve şahıs.
 * Kanon: dil + koordinasyon + (istenirse) fiziksel eşlik; onay/izin/hesap garantisi yok.
 */

export const eslikTr: ServiceDetailContent = {
  meta: {
    title: "Yerinde eşlik ve kurum süreç desteği",
    description:
      "Banka, PESEL, ehliyet, oturum kartı, sağlık raporu ve urzęd randevularında dil köprüsü; uzaktan, telefon veya yerinde. Firma ve şahıs. Onay garantisi değildir.",
  },
  eyebrow: "Yerinde eşlik · firma & şahıs",
  title: "Kurumlar arası süreçte yanınızdayız",
  lead:
    "KOBİ ve şahıs işlerinde yazı özeti yetmeyebilir: lojistik evrakı, banka, PESEL, ehliyetin Polonya ehliyetine çevrilmesi, oturum kartı, urzęd. Uzaktan, telefonla veya yerinde eşlik. Diller: Türkçe, Lehçe, İngilizce, Rusça, Ukraynaca.",
  positioning:
    "Biz avukat, yeminli tercüman veya banka/sağlık kurumu değiliz. Karar ilgili mercidedir. POL-TURK aracı danışmandır: evrak sırası, randevu, dilde bilgi, avukat ortağına köprü ve — istenirse — yerinde eşlik.",
  whoTitle: "İki hat — firma ve şahıs",
  who: [
    {
      id: "firma",
      title: "Firma / şirket",
      body: "Polonya’daki işletme veya Türkiye ana şirket: banka KYC, lojistik / faaliyet evrakı, US/ZUS/KRS, çalışan dosyasında işveren tarafı.",
    },
    {
      id: "sahis",
      title: "Şahıs / bireysel",
      body: "Polonya’daki Türkler: PESEL, oturum kartı, ehliyet çevirisi, sağlık raporu, urzęd — uzaktan, telefon veya yerinde.",
    },
  ],
  workstreamsTitle: "Tipik iş kalemleri (örnekler)",
  workstreamsIntro:
    "Liste bilgilendirme amaçlıdır; her dosya kuruma göre değişir. Sonuç taahhüt edilmez. Yoğun veya vekaletli işlerde Vekaletli idari yürütme paketi kullanılır.",
  workstreams: [
    {
      title: "Firma hattı",
      body: "Şirket ve işveren tarafı idari süreçler.",
      items: [
        "Şirket / iş banka hesabı başvurusu — KYC evrak listesi ve randevu koordinasyonu",
        "US / ZUS / KRS ziyaretleri: ne götürülür, kim imzalar, dilde özet",
        "Lojistik / taşıma / saha faaliyetinde kurum yazısı ve randevu masası",
        "Çalışan oturum dosyasında işveren evrak ve randevu köprüsü (garanti yok)",
        "Hukuk gerekirse avukat ortağına köprü (tavsiyeyi biz vermeyiz)",
        "İstenirse: danışmanın ofiste / bankada fiziksel eşliği",
      ],
    },
    {
      title: "Şahıs hattı",
      body: "Kişisel idari ve kurum randevuları.",
      items: [
        "PESEL başvurusu — evrak checklist ve randevu sırası (bilgilendirme)",
        "Yabancı ehliyetin Polonya ehliyetine çevrilmesi — adımlar, evrak, urzęd (karar mercidedir)",
        "Oturum kartı / pobyt: yazı özeti, eksik evrak, durum takibi (kart garantisi yok)",
        "Çeviri ihtiyacı: dil köprüsü; yeminli tercümana yönlendirme (işlemi biz yapmayız)",
        "Uzaktan ve telefonla bilgi: ne istendi, sıradaki adım",
        "Sağlık raporu / muayene randevusu koordinasyonu (tıbbi karar bizde değildir)",
        "Kişisel banka / belediye / konsolosluk randevularında eşlik (kapsam görüşmede)",
        "İstenirse: birebir danışman eşliği (TR / PL / EN / RU / UK)",
      ],
    },
    {
      title: "Ortak değer",
      body: "Firma ve şahıs hatlarında aynı standart.",
      items: [
        "Önce kapsam: hangi kurum, hangi şehir, kim imza atacak",
        "Evrak eksik görünürlüğü — belge uydurma yok",
        "Kurum yazısı geldiyse Tek yazı / Aylık takip ile özet",
        "Yoğun dönem: Vekaletli idari yürütme (noter ücreti size aittir)",
      ],
    },
  ],
  pillarsTitle: "Nasıl çalışır?",
  pillars: [
    {
      title: "Uzaktan ve telefon",
      body: "Checklist, randevu notu, yazı özeti, telefonla bilgi — ofise gitmeden.",
    },
    {
      title: "Yerinde eşlik (istenirse)",
      body: "Danışman fiziksel olarak yanınızda: dil köprüsü, sıradaki adım. Hukuki temsil değildir.",
    },
    {
      title: "Paketle bağlama",
      body: "Yazı varsa paketler; eşlik ve randevu yoğunluğu iletişim formu + Vekaletli paket ile yürür.",
    },
  ],
  deliverablesTitle: "Teslimatlar",
  deliverables: [
    "Kapsam notu: firma mı şahıs mı, hangi kurumlar, şehir",
    "Evrak / randevu checklist’i (bilgilendirme)",
    "Kurum yazısı özeti (pakete göre)",
    "Eşlik günü için kısa brifing (ne sorulabilir, ne götürülür)",
    "Sonrası: durum notu — ne oldu, sıradaki adım",
  ],
  processTitle: "Çalışma modeli",
  processIntro:
    "Önce görüşme ile hat (firma/şahıs) ve eşlik ihtiyacı kilitlenir. Garanti dili kullanılmaz.",
  process: [
    {
      title: "1 · Keşif",
      body: "Firma veya şahıs, hedef kurumlar, tarihler, dil ihtiyacı, fiziksel eşlik isteniyor mu.",
    },
    {
      title: "2 · Kapsam",
      body: "Uzaktan mı, yerinde mi; hangi paket (tek yazı / aylık / vekaletli); yazılı ayrım.",
    },
    {
      title: "3 · Yürütme",
      body: "Checklist, randevu, yazı özetleri; eşlik gününde dil köprüsü.",
    },
    {
      title: "4 · Kapanış notu",
      body: "Ne tamamlandı, ne açık, kim devam eder (siz / avukat / muhasebe).",
    },
  ],
  packagesTitle: "Hangi paket ne zaman?",
  packagesIntro:
    "Satılan ürünler üç pakettir. Telefon görüşmesi şu an sunulmuyor. Yerinde eşlik: form + uygun paket.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Vekaletli idari yürütme",
      role: "Yoğun randevu / evrak / eşlik dönemleri — noter idari vekaletiyle koordinasyon.",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Aylık idari takip",
      role: "Sürekli gelen yazılar ve durum takibi.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Tek yazı",
      role: "Tek kurum yazısı özeti — eşlik öncesi veya sonrası.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "Kapsama giren",
  included: [
    "Kurumlar arası idari süreç bilgilendirmesi (banka, PESEL, ehliyet, sağlık raporu randevusu vb.)",
    "Evrak sırası ve eksik görünürlüğü",
    "Dil köprüsü (iletişim TR / PL / EN / RU / UK; yerinde eşlik talep halinde)",
    "Uzaktan ve telefonla durum / sıradaki adım bilgisi",
    "İstenirse fiziksel danışman eşliği (kapsam ve ücret görüşmede)",
    "Avukat / muhasebeci ile koordinasyon notu",
  ],
  excludedTitle: "Kapsam dışı",
  excluded: [
    "Hesap açılışı, PESEL, ehliyet, sağlık raporu veya herhangi bir onay garantisi",
    "Hukuki tavsiye, dava, sözleşme kaleme alma",
    "Tıbbi teşhis / rapor içeriği kararı",
    "Banka kredi / KYC sonucu taahhüdü",
    "Yeminli tercüman veya noter işleminin kendisi (ücret ve işlem size / notere aittir)",
  ],
  engagementTitle: "Nasıl başlanır?",
  engagementBody:
    "Yazınız varsa Başvur (tek yazı / aylık). Telefon görüşmesi şu an sunulmuyor; yazılı paketler veya yerinde eşlik için iletişim formu. Yerinde eşlik: formdan “eşlik — firma/şahıs”, şehir ve işlem. Yoğun randevu: vekaletli paket.",
  ctaConsult: "Eşlik görüşmesi",
  ctaPrimaryPackage: {
    label: "Vekaletli paket — başvur",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Tek yazı — başvur",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Tüm hizmetlere dön",
  disclaimer:
    "İdari koordinasyon, dil köprüsü ve istenirse yerinde eşlik hizmetidir. Kurum kararı, hesap, PESEL, ehliyet veya sağlık sonucu taahhüt edilmez. POL-TURK avukat veya mali müşavir değildir.",
};

export const eslikPl: ServiceDetailContent = {
  ...eslikTr,
  meta: {
    title: "Towarzyszenie na miejscu i wsparcie urzędowe",
    description:
      "Bank, PESEL, prawo jazdy, orzeczenie lekarskie, wizyty w urzędzie — most językowy i opcjonalne towarzyszenie. Firma i osoba. Bez gwarancji decyzji.",
  },
  eyebrow: "Towarzyszenie · firma i osoba",
  title: "Przy procesach między urzędami jesteśmy z Państwem",
  lead:
    "Samo streszczenie pisma bywa za mało: konto bankowe, PESEL, prawo jazdy, orzeczenie, wizyta w urzędzie. POL-TURK koordynuje te kroki; na życzenie konsultant towarzyszy fizycznie z mostem językowym PL.",
  positioning:
    "Nie jesteśmy kancelarią ani bankiem/przychodnią. Decyzje należą do urzędu. My: checklist, koordynacja, język — i opcjonalnie towarzyszenie na miejscu.",
  whoTitle: "Dwie linie — firma i osoba",
  who: [
    {
      id: "firma",
      title: "Firma / spółka",
      body: "Konto firmowe, US/ZUS/KRS, strona pracodawcy przy pobycie pracownika.",
    },
    {
      id: "sahis",
      title: "Osoba prywatna",
      body: "PESEL, karta pobytu, wymiana prawa jazdy, orzeczenie, urząd — zdalnie, telefon lub na miejscu.",
    },
  ],
  workstreamsTitle: "Typowe pozycje",
  workstreamsIntro:
    "Lista informacyjna. Bez gwarancji wyniku. Intensywnie — pakiet z POA.",
  workstreams: [
    {
      title: "Linia firma",
      body: "Procesy pracodawcy / spółki.",
      items: [
        "Konto firmowe — KYC i wizyty",
        "US / ZUS / KRS — dokumenty i język",
        "Logistyka / działalność — pisma i wizyty",
        "Pobyt pracownika — strona pracodawcy",
        "Most do adwokata-partnera (bez porad prawnych z naszej strony)",
        "Opcjonalnie: towarzyszenie w banku / urzędzie",
      ],
    },
    {
      title: "Linia osoba",
      body: "Sprawy osobiste.",
      items: [
        "PESEL — checklist i kolejność",
        "Wymiana prawa jazdy na polskie — kroki i urząd (decyzja urzędu)",
        "Karta pobytu: streszczenie, braki, status",
        "Tłumaczenia: most językowy; przysięgły — kierujemy",
        "Informacja zdalna i telefoniczna",
        "Orzeczenie / wizyta medyczna (bez decyzji medycznej)",
        "Opcjonalnie: indywidualne towarzyszenie (TR / PL / EN / RU / UK)",
      ],
    },
    {
      title: "Wspólny standard",
      body: "Ten sam most.",
      items: [
        "Zakres: urząd, miasto, podpis",
        "Widoczność braków",
        "Pisma — pakiet Jedno pismo / miesięczny",
        "Intensywnie — pakiet z POA",
      ],
    },
  ],
  pillarsTitle: "Jak działamy?",
  pillars: [
    {
      title: "Most zdalny",
      body: "Checklist, wizyty, streszczenia — bez stałego biura w PL.",
    },
    {
      title: "Towarzyszenie (na życzenie)",
      body: "Konsultant na miejscu — język PL, kolejność kroków. To nie reprezentacja prawna.",
    },
    {
      title: "Pakiety",
      body: "Pakiety + formularz kontaktowy. Bez osobnego produktu „wszystko w jednym”.",
    },
  ],
  deliverablesTitle: "Dostawy",
  deliverables: [
    "Notatka zakresu (firma / osoba)",
    "Checklist dokumentów / wizyt",
    "Streszczenie pism (wg pakietu)",
    "Briefing przed wizytą",
    "Notatka po: co dalej",
  ],
  processTitle: "Model",
  processIntro: "Najpierw linia i potrzeba towarzyszenia — na piśmie, bez gwarancji.",
  process: [
    {
      title: "1 · Discovery",
      body: "Firma czy osoba, urzędy, terminy, język, towarzyszenie?",
    },
    {
      title: "2 · Zakres",
      body: "Zdalnie / na miejscu; pakiet.",
    },
    {
      title: "3 · Realizacja",
      body: "Checklist, wizyty, język.",
    },
    {
      title: "4 · Zamknięcie",
      body: "Status i kolejny krok.",
    },
  ],
  packagesTitle: "Pakiety",
  packagesIntro: "Trzy pakiety na stronie. Konsultacja telefoniczna nie jest obecnie dostępna. Towarzyszenie na miejscu = formularz + pakiet.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Prowadzenie z POA",
      role: "Okres intensywny — koordynacja z POA.",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Opieka miesięczna",
      role: "Regularne pisma.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Jedno pismo",
      role: "Pojedyncze pismo.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "W zakresie",
  included: [
    "Guidance administracyjny (bank, PESEL, prawo jazdy, orzeczenie…)",
    "Kolejność i braki dokumentów",
    "Most językowy; opcjonalnie towarzyszenie na miejscu",
    "Notatki do adwokata / księgowego",
  ],
  excludedTitle: "Poza zakresem",
  excluded: [
    "Gwarancja konta, PESEL, prawa jazdy, orzeczenia",
    "Porady prawne",
    "Decyzje medyczne",
    "Wynik KYC bankowego",
    "Sama czynność notarialna / tłumacz przysięgły (koszt Państwa)",
  ],
  engagementTitle: "Jak zacząć?",
  engagementBody:
    "Macie pismo — wniosek (jedno pismo / miesięczny). Konsultacja telefoniczna nie jest obecnie dostępna; pakiety pisemne lub formularz kontaktowy. Towarzyszenie na miejscu: formularz „towarzyszenie — firma/osoba”. Intensywnie — POA.",
  ctaConsult: "Konsultacja towarzyszenia",
  ctaPrimaryPackage: {
    label: "Pakiet z POA — wniosek",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Jedno pismo — wniosek",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Wróć do usług",
  disclaimer:
    "Koordynacja i język. Bez gwarancji decyzji urzędu. POL-TURK nie jest kancelarią.",
};

export const eslikEn: ServiceDetailContent = {
  ...eslikTr,
  meta: {
    title: "On-site accompaniment & inter-office admin support",
    description:
      "Bank, PESEL, driving licence, medical certificate, office visits — language bridge and optional physical accompaniment. Company and individual. No decision guarantees.",
  },
  eyebrow: "On-site accompaniment · company & individual",
  title: "We stay with you through inter-office processes",
  lead:
    "A letter summary is not always enough: bank account, PESEL, licence change, medical certificate, office appointments. POL-TURK coordinates these steps; on request a consultant accompanies you in person with a Polish language bridge.",
  positioning:
    "We are not a law firm, bank or clinic. Decisions stay with the authority. POL-TURK: checklists, coordination, language — and optional on-site accompaniment.",
  whoTitle: "Two tracks — company and individual",
  who: [
    {
      id: "firma",
      title: "Company",
      body: "Business bank KYC, tax/ZUS/KRS visits, employer-side employee files.",
    },
    {
      id: "sahis",
      title: "Individual",
      body: "PESEL, residence card, licence exchange, medical certificate, offices — remote, phone or on site.",
    },
  ],
  workstreamsTitle: "Typical work items",
  workstreamsIntro:
    "Informational list. No outcome promises. Heavy periods use the POA package.",
  workstreams: [
    {
      title: "Company track",
      body: "Employer / company admin.",
      items: [
        "Business bank account — KYC list and appointments",
        "US / ZUS / KRS visits — documents and language",
        "Logistics / field activity letters and appointments",
        "Employee residence — employer side",
        "Bridge to the lawyer partner (we do not give legal advice)",
        "Optional: on-site accompaniment at bank / office",
      ],
    },
    {
      title: "Individual track",
      body: "Personal admin.",
      items: [
        "PESEL — checklist and sequence",
        "Exchange to a Polish driving licence — steps and office (decision is the office’s)",
        "Residence card: letter summary, gaps, status tracking",
        "Translation need: language bridge; sworn translator referred",
        "Remote and phone information",
        "Medical certificate appointment (no medical decisions)",
        "Optional: one-to-one accompaniment (TR / PL / EN / RU / UK)",
      ],
    },
    {
      title: "Shared standard",
      body: "Same bridge.",
      items: [
        "Scope: office, city, signatory",
        "Gap visibility",
        "Letters via Single letter / Monthly tracking",
        "Intensive work via POA package",
      ],
    },
  ],
  pillarsTitle: "How we work",
  pillars: [
    {
      title: "Remote bridge",
      body: "Checklists, appointments, summaries — without a permanent Polish desk.",
    },
    {
      title: "On-site (on request)",
      body: "Consultant beside you — Polish language bridge, next-step clarity. Not legal representation.",
    },
    {
      title: "Package binding",
      body: "Packages + contact form. No separate all-in-one product.",
    },
  ],
  deliverablesTitle: "Deliverables",
  deliverables: [
    "Scope note (company / individual)",
    "Document / appointment checklist",
    "Letter summary (by package)",
    "Pre-visit briefing",
    "After-note: what’s next",
  ],
  processTitle: "Operating model",
  processIntro: "Lock track and accompaniment need in writing — no guarantees.",
  process: [
    {
      title: "1 · Discovery",
      body: "Company or individual, offices, dates, language, on-site?",
    },
    {
      title: "2 · Scope",
      body: "Remote / on-site; which package.",
    },
    {
      title: "3 · Delivery",
      body: "Checklists, visits, language bridge.",
    },
    {
      title: "4 · Close-out",
      body: "Status and next owner.",
    },
  ],
  packagesTitle: "Packages",
  packagesIntro:
    "Three packages on the site. Phone consultation is not available right now. On-site accompaniment = form + the right package.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Admin execution with POA",
      role: "Intensive appointment / accompaniment periods.",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Monthly admin tracking",
      role: "Ongoing letters.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Single letter",
      role: "One letter before/after accompaniment.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "In scope",
  included: [
    "Admin guidance (bank, PESEL, licence, medical appointment…)",
    "Document sequence and gap visibility",
    "Language bridge; optional on-site accompaniment",
    "Notes for lawyer / accountant",
  ],
  excludedTitle: "Out of scope",
  excluded: [
    "Guarantees of account, PESEL, licence or medical outcome",
    "Legal advice",
    "Medical decisions",
    "Bank KYC outcome promises",
    "Notary act / sworn translation itself (your cost)",
  ],
  engagementTitle: "How to start",
  engagementBody:
    "Have a letter — Apply (single letter / monthly). Phone consultation is not currently sold; written packages or the contact form. On-site accompaniment: form “accompaniment — company/individual”. Heavy calendar — POA.",
  ctaConsult: "Accompaniment consult",
  ctaPrimaryPackage: {
    label: "POA package — apply",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Single letter — apply",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Back to all services",
  disclaimer:
    "Admin coordination and language only. No authority decision is promised. POL-TURK is not a law firm or tax office.",
};

export function getEslikContent(locale: string): ServiceDetailContent {
  if (locale === "pl") return eslikPl;
  if (locale === "en") return eslikEn;
  return eslikTr;
}
