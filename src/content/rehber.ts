/**
 * Kamu rehber — bilgilendirme. Hukuki tavsiye / otomasyon / onay garantisi yok.
 */

export type RehberLocale = "tr" | "pl" | "en";

export type RehberArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type RehberArticle = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  disclaimer: string;
  sections: RehberArticleSection[];
  sourcesLabel?: string;
  sources?: { label: string; url: string }[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export type RehberHub = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  disclaimer: string;
  cards: {
    slug: string;
    title: string;
    body: string;
    badge?: string;
  }[];
  backHome: string;
  readCta: string;
};

const hubTr: RehberHub = {
  meta: {
    title: "Rehber — Polonya idari süreçler",
    description:
      "Kurum yazısı, paket seçimi, şirket kuruluş sırası, şahıs idaresi ve MOS hakkında genel bilgi. Hukuki tavsiye değildir.",
  },
  eyebrow: "Bilgilendirme",
  title: "Rehber",
  intro:
    "Polonya’daki idari süreçlerde sık sorulan konulara kısa, dürüst cevaplar. Amaç: neyin ne olduğunu anlamak ve doğru pakete yönelmek. Hukuki tavsiye, tescil veya onay garantisi değildir.",
  disclaimer:
    "Bu sayfalar genel bilgilendirmedir. Karar mercilere ve yetkili kişilere aittir. ROUTEPOL avukat veya mali müşavir değildir.",
  cards: [
    {
      slug: "kurum-yazisi",
      title: "Kurum yazısı geldi — ne yapmalı?",
      body: "Son tarih, ne istendiği, kim ne yapar. Tek yazı mı aylık takip mi?",
      badge: "Sık",
    },
    {
      slug: "paket-secimi",
      title: "Hangi paketi seçmeliyim?",
      body: "Tek yazı, aylık takip, vekaletli yürütme — ne zaman hangisi.",
      badge: "Paket",
    },
    {
      slug: "sirket-kurulusu",
      title: "Polonya’da şirket / faaliyet — sıra",
      body: "Türkiye’den yatırım ve kuruluşta tipik idari sıra (tescil vaadi yok).",
      badge: "Kurumsal",
    },
    {
      slug: "sahis-idari",
      title: "Şahıs — urząd, ehliyet, oturum",
      body: "Bireysel idari işlerde dil köprüsü, takip ve yerinde eşlik hattı.",
      badge: "Şahıs",
    },
    {
      slug: "mos",
      title: "MOS nedir?",
      body: "Oturum başvurularında kullanılan resmi portal — otomasyon yok.",
      badge: "Portal",
    },
  ],
  backHome: "Ana sayfa",
  readCta: "Oku",
};

const articlesTr: RehberArticle[] = [
  {
    slug: "kurum-yazisi",
    title: "Kurum yazısı geldi — ne yapmalı?",
    description:
      "US, ZUS, belediye veya başka bir kurumdan yazı aldığınızda kontrol listesi. Bilgilendirme.",
    eyebrow: "Rehber · kurum yazısı",
    disclaimer:
      "Genel bilgilendirme. Hukuki tavsiye veya süre/onay garantisi değildir.",
    sections: [
      {
        id: "ilk",
        title: "1) İlk kontrol",
        paragraphs: [
          "Yazıyı saklayın (PDF veya net fotoğraf). Gönderen kurum, tarih, sizin veya şirketinizin adı, varsa dosya / referans numarası ve son yanıt tarihine bakın.",
        ],
        bullets: [
          "Son tarih var mı? Takvime işleyin (Varşova saati).",
          "Ne isteniyor: bilgi, ek belge, ödeme, randevu, itiraz süresi?",
          "Kime hitap: şahıs mı, şirket mi, işveren tarafı mı?",
        ],
      },
      {
        id: "anla",
        title: "2) Anlamak",
        paragraphs: [
          "Lehçe resmi dil çoğu zaman net değildir. ROUTEPOL yazıyı PL / EN / TR özetler: ne istendi, son tarih, kim ne yapmalı (siz, muhasebe, avukat ortağı).",
          "Biz kurum adına karar vermeyiz; başvuruyu sizin yerinize göndermeyiz.",
        ],
      },
      {
        id: "paket",
        title: "3) Hangi ürün?",
        paragraphs: [
          "Tek kritik yazı için Tek yazı (abonelik yok). Ay boyunca birden fazla yazı geliyorsa Aylık abonelik (karttan otomatik yenilenir). Yoğun randevu / evrak koordinasyonu ve noter idari vekaleti gerekiyorsa Vekaletli abonelik.",
        ],
      },
      {
        id: "sonra",
        title: "4) Ödeme sonrası",
        paragraphs: [
          "Dosya sayfanız ve Hesabım üzerinden durum görünür. Sonuç hazır olunca aynı yerden indirilir — evrak genelde mail eki olarak gitmez.",
        ],
      },
    ],
    ctaPrimary: { label: "Tek yazı — başvur", href: "/basvuru?paket=tek-yazi" },
    ctaSecondary: { label: "Tüm paketler", href: "/hizmetler#paketler" },
  },
  {
    slug: "paket-secimi",
    title: "Hangi paketi seçmeliyim?",
    description:
      "Üç paket: Tek yazı, Aylık abonelik, Vekaletli abonelik. Kısa karar ağacı.",
    eyebrow: "Rehber · paketler",
    disclaimer:
      "Ürün açıklaması bilgilendirmedir. Fiyat ve kota paket sayfalarında günceldir.",
    sections: [
      {
        id: "uc",
        title: "Üç ürün",
        paragraphs: ["Siteden sipariş edilen paketler şunlardır:"],
        bullets: [
          "Tek yazı — tek evrak özeti; sayfa sayısına göre ücret.",
          "Aylık idari takip — Stripe abonelik (otomatik yenileme); dönem ücreti yazı gelmese de; kota, portalda ek yazı, aşım 40 zł / yazı; kota iadesi yok.",
          "Vekaletli idari yürütme — Stripe abonelik (otomatik yenileme); noter idari vekaletiyle evrak/randevu koordinasyonu (hukuki temsil değil).",
        ],
      },
      {
        id: "sec",
        title: "Nasıl seçilir?",
        paragraphs: [
          "Elinizde bir yazı var ve devamı belirsizse: Tek yazı ile başlayın.",
          "Her ay düzenli yazı geliyorsa (US/ZUS/KRS): Aylık abonelik (karttan otomatik yenilenir).",
          "Kuruluş dönemi veya yoğun urząd/noter koordinasyonu: Vekaletli abonelik + gerekirse avukat ortağı (ücreti ayrı).",
        ],
      },
      {
        id: "degil",
        title: "Diğer hizmetler nasıl alınır?",
        paragraphs: [
          "Telefon görüşmesi şu an sunulmuyor. Yazılı paketler veya iletişim formu ile ilerleyin.",
          "Yerinde eşlik için iletişim formunu doldurun; kapsam netleştikten sonra uygun paket önerilir.",
          "Yatırım ve kuruluş danışmanlığı için /hizmetler/kurulum sayfası ve iletişim formu; ücretli yürütme paketler üzerinden yürür.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Paketlere git",
      href: "/hizmetler#paketler",
    },
    ctaSecondary: { label: "Hizmet merkezi", href: "/hizmetler" },
  },
  {
    slug: "sirket-kurulusu",
    title: "Polonya’da şirket / faaliyet — tipik sıra",
    description:
      "Türkiye’den yatırım ve kuruluşta idari çerçeve. Tescil veya hukuki sonuç vaadi değildir.",
    eyebrow: "Rehber · kuruluş",
    disclaimer:
      "Genel çerçeve. Yapı seçimi, sözleşme ve KRS kararı avukat ortağındadır. ROUTEPOL şirketi sizin adınıza kurmaz.",
    sections: [
      {
        id: "sira",
        title: "Tipik idari sıra",
        paragraphs: [
          "Gerçek sıra işinize ve avukatınıza göre değişir. Sık görülen çerçeve:",
        ],
        bullets: [
          "Yapı: sp. z o.o. / şube / JDG — idari yük farkı",
          "Noter / şirket sözleşmesi → KRS başvurusu",
          "NIP / REGON → VAT / VAT-UE → banka → księgowy bağlantısı",
          "Kayıt sonrası: US / ZUS / banka KYC yazılarının takibi",
        ],
      },
      {
        id: "rol",
        title: "Kim ne yapar?",
        paragraphs: [
          "Avukat ortağı: hukuki seçim, sözleşme, noter, KRS, temsil.",
          "ROUTEPOL: süreç haritası, eksik evrak görünürlüğü, dil köprüsü, dosyayı ortağa iletme, kayıt sonrası yazı özeti.",
          "Muhasebe: defter, beyan, imza — bizde değildir.",
        ],
      },
      {
        id: "basla",
        title: "Nasıl başlanır?",
        paragraphs: [
          "Kapsamı netleştirmek için `/hizmetler/kurulum` ve iletişim formunda “TR işletmeci — Polonya yatırım / şirket kuruluşu”. Yoğun dönemde vekaletli paket; düzenli yazıda aylık takip.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Kuruluş danışmanlığı",
      href: "/hizmetler/kurulum",
    },
    ctaSecondary: {
      label: "İletişim formu",
      href: "#iletisim",
    },
  },
  {
    slug: "sahis-idari",
    title: "Şahıs — urząd, ehliyet, oturum kartı",
    description:
      "Polonya’daki Türk vatandaşları için idari dil köprüsü ve takip. Onay garantisi yok.",
    eyebrow: "Rehber · şahıs",
    disclaimer:
      "Bilgilendirme. Oturum, ehliyet veya sağlık sonucu vaat edilmez. Hukuki tavsiye avukat ortağındadır.",
    sections: [
      {
        id: "ne",
        title: "Ne tür işler?",
        paragraphs: [
          "Devlet dairesi (urząd) yazışması, ehliyet çevirisi süreci, oturum kartı / pobyt yazıları, eksik belge listesi, durum takibi.",
        ],
      },
      {
        id: "nasil",
        title: "Nasıl ilerler?",
        paragraphs: [
          "Kurum yazısı varsa: Tek yazı veya aylık paket ile özet ve takip.",
          "Yerinde eşlik gerekiyorsa: iletişim formundan “eşlik — şahıs”; kapsam sonrası uygun paket.",
          "MOS üzerinden elektronik başvuru: /rehber/mos — başvuruyu sizin yerinize göndermeyiz.",
        ],
      },
      {
        id: "sinir",
        title: "Sınırlar",
        paragraphs: [
          "MOS / urząd form otomasyonu yok. Giriş bilgilerinizi kimseyle paylaşmayın. Karar mercidedir.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Şahıs / eşlik hattı",
      href: "/hizmetler/eslik",
    },
    ctaSecondary: {
      label: "Tek yazı — başvur",
      href: "/basvuru?paket=tek-yazi",
    },
  },
  {
    slug: "mos",
    title: "MOS nedir?",
    description:
      "Bazı oturum başvurularının elektronik yapıldığı resmi portal. ROUTEPOL oturum çıkarmaz.",
    eyebrow: "Rehber · MOS",
    disclaimer:
      "Genel bilgilendirme. Hukuki tavsiye, otomasyon veya onay garantisi değildir. Mevzuat değişebilir — resmi kaynakları kontrol edin.",
    sections: [
      {
        id: "nedir",
        title: "1) MOS nedir?",
        paragraphs: [
          "MOS (Moduł Obsługi Spraw Cudzoziemców), Polonya’da bazı yabancıların oturum / ilgili başvurularını elektronik iletebildiği resmi bir portaldır. Hesap, başvuru ve UPO (onay makbuzu) sizin sorumluluğunuzdadır.",
        ],
      },
      {
        id: "biz",
        title: "2) ROUTEPOL ne yapar / yapmaz?",
        paragraphs: [
          "Yapar: MOS veya urząd’dan gelen yazıyı dilinizde açıklar; ne istendi, son tarih, kim ne yapacak; süreç durumunu takip eder (pakete göre).",
          "Yapmaz: Sizin adınıza MOS’a giriş, form otomasyonu, oturum izni çıkarma, karar garantisi.",
        ],
      },
      {
        id: "yazi",
        title: "3) Yazı geldiyse",
        paragraphs: [
          "Şirketinize veya size MOS / urząd yazısı geldiyse evrakı yükleyip uygun paketi seçin. Özet ve sıradaki adım dosya sayfanızda görünür.",
        ],
      },
      {
        id: "guvenlik",
        title: "4) Güvenlik",
        paragraphs: [
          "MOS giriş bilgilerinizi operatörle veya üçüncü kişilerle paylaşmayın. Resmi işlem kendi hesabınızdan yapılmalıdır.",
        ],
      },
    ],
    sourcesLabel: "Resmi kaynak",
    sources: [
      {
        label: "UDSC — MOS bilgisi",
        url: "https://www.gov.pl/web/udsc/info-mos",
      },
      {
        label: "MOS portal",
        url: "https://mos.cudzoziemcy.gov.pl",
      },
    ],
    ctaPrimary: {
      label: "Yazı özeti — başvur",
      href: "/basvuru?paket=tek-yazi",
    },
    ctaSecondary: { label: "Rehber ana sayfa", href: "/rehber" },
  },
];

const hubPl: RehberHub = {
  meta: {
    title: "Przewodnik — administracja w PL",
    description:
      "Pismo urzędowe, wybór pakietu, założenie spółki, sprawy osób i MOS. To nie porada prawna.",
  },
  eyebrow: "Informacja",
  title: "Przewodnik",
  intro:
    "Krótkie, uczciwe odpowiedzi na częste pytania o procesy administracyjne w Polsce. Cel: zrozumieć sprawę i wybrać właściwy pakiet. Bez porad prawnych i gwarancji decyzji.",
  disclaimer:
    "Treści ogólne. Decyzje należą do urzędów i osób uprawnionych. ROUTEPOL nie jest kancelarią ani biurem rachunkowym.",
  cards: [
    {
      slug: "kurum-yazisi",
      title: "Przyszło pismo — co robić?",
      body: "Termin, czego żądają, kto działa. Jedno pismo czy opieka miesięczna?",
      badge: "Częste",
    },
    {
      slug: "paket-secimi",
      title: "Który pakiet wybrać?",
      body: "Jedno pismo, opieka miesięczna, prowadzenie z POA.",
      badge: "Pakiet",
    },
    {
      slug: "sirket-kurulusu",
      title: "Spółka / działalność — kolejność",
      body: "Ramowy przebieg inwestycji z TR (bez gwarancji wpisu).",
      badge: "Firma",
    },
    {
      slug: "sahis-idari",
      title: "Osoba — urząd, prawo jazdy, pobyt",
      body: "Most językowy, tracking i towarzyszenie na miejscu.",
      badge: "Osoba",
    },
    {
      slug: "mos",
      title: "Czym jest MOS?",
      body: "Portal wniosków o pobyt — bez automatyzacji.",
      badge: "Portal",
    },
  ],
  backHome: "Strona główna",
  readCta: "Czytaj",
};

const articlesPl: RehberArticle[] = [
  {
    slug: "kurum-yazisi",
    title: "Przyszło pismo urzędowe — co robić?",
    description:
      "Checklista przy piśmie z US, ZUS lub innego urzędu. Informacyjnie.",
    eyebrow: "Przewodnik · pismo",
    disclaimer: "Informacja ogólna. Bez porad prawnych i gwarancji terminu.",
    sections: [
      {
        id: "ilk",
        title: "1) Pierwszy przegląd",
        paragraphs: [
          "Zachowajcie pismo (PDF / czytelne zdjęcie). Sprawdźcie nadawcę, datę, dane adresata, numer sprawy i termin odpowiedzi.",
        ],
        bullets: [
          "Czy jest termin? Wpiszcie do kalendarza (czas warszawski).",
          "Czego żądają: informacje, załączniki, opłata, wizyta?",
          "Adresat: osoba, firma, strona pracodawcy?",
        ],
      },
      {
        id: "anla",
        title: "2) Zrozumienie",
        paragraphs: [
          "ROUTEPOL streści pismo PL / EN / TR: czego żądają, termin, kto działa. Nie podejmujemy decyzji za urząd i nie składamy wniosku w Państwa imieniu.",
        ],
      },
      {
        id: "paket",
        title: "3) Który produkt?",
        paragraphs: [
          "Jedno pismo — pojedyncze pismo. Opieka miesięczna — regularny napływ. POA — intensywna koordynacja z pełnomocnictwem administracyjnym notarialnym.",
        ],
      },
      {
        id: "sonra",
        title: "4) Po płatności",
        paragraphs: [
          "Status na stronie sprawy / Koncie. Wynik do pobrania tam — zwykle bez załącznika e-mail.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Jedno pismo — wniosek",
      href: "/basvuru?paket=tek-yazi",
    },
    ctaSecondary: { label: "Pakiety", href: "/hizmetler#paketler" },
  },
  {
    slug: "paket-secimi",
    title: "Który pakiet wybrać?",
    description: "Trzy pakiety — krótkie drzewo decyzji.",
    eyebrow: "Przewodnik · pakiety",
    disclaimer: "Opis produktowy. Aktualne ceny na stronach pakietów.",
    sections: [
      {
        id: "uc",
        title: "Trzy produkty",
        paragraphs: ["Na stronie sprzedajemy:"],
        bullets: [
          "Jedno pismo — streszczenie jednego pisma.",
          "Opieka miesięczna — abonament Stripe (odnowienie automatyczne); opłata także bez pism; limit, portal; nadwyżka 40 zł; limit bez zwrotu.",
          "Prowadzenie z POA — abonament Stripe (odnowienie automatyczne); koordynacja administracyjna (nie reprezentacja prawna).",
        ],
      },
      {
        id: "sec",
        title: "Jak wybrać?",
        paragraphs: [
          "Jedno pismo i niejasna kontynuacja → Jedno pismo.",
          "Regularne pisma → abonament miesięczny (odnowienie kartą automatyczne).",
          "Rejestracja / intensywna koordynacja → abonament z POA (+ adwokat osobno).",
        ],
      },
      {
        id: "degil",
        title: "Jak wziąć inne usługi?",
        paragraphs: [
          "Konsultacja telefoniczna nie jest obecnie dostępna. Wybierzcie pakiet pisemny lub formularz kontaktowy.",
          "Towarzyszenie na miejscu: formularz kontaktowy, potem zakres i właściwy pakiet.",
          "Doradztwo inwestycyjne / założenie: strona usług i formularz; płatna realizacja przez pakiety.",
        ],
      },
    ],
    ctaPrimary: { label: "Pakiety", href: "/hizmetler#paketler" },
    ctaSecondary: { label: "Centrum usług", href: "/hizmetler" },
  },
  {
    slug: "sirket-kurulusu",
    title: "Spółka / działalność w PL — typowa kolejność",
    description:
      "Ramy administracyjne inwestycji z TR. Bez gwarancji wpisu KRS.",
    eyebrow: "Przewodnik · założenie",
    disclaimer:
      "Ramy ogólne. Wybór formy i decyzja KRS u adwokata-partnera. Nie zakładamy spółki za Państwa.",
    sections: [
      {
        id: "sira",
        title: "Typowa kolejność",
        paragraphs: ["Rzeczywista ścieżka zależy od sprawy i adwokata:"],
        bullets: [
          "Forma: sp. z o.o. / oddział / JDG",
          "Notariusz / umowa → KRS",
          "NIP / REGON → VAT / VAT-UE → bank → księgowy",
          "Po wpisie: pisma US / ZUS / KYC banku",
        ],
      },
      {
        id: "rol",
        title: "Kto co robi?",
        paragraphs: [
          "Adwokat: wybór prawny, umowa, notariusz, KRS, reprezentacja.",
          "ROUTEPOL: mapa procesu, braki, język, przekazanie teczki, streszczenia po rejestracji.",
          "Księgowość: poza naszym zakresem.",
        ],
      },
      {
        id: "basla",
        title: "Jak zacząć?",
        paragraphs: [
          "`/hizmetler/kurulum` oraz formularz „Przedsiębiorca TR — inwestycja”. Intensywnie — abonament z POA; regularne pisma — abonament miesięczny (odnowienie automatyczne).",
        ],
      },
    ],
    ctaPrimary: {
      label: "Doradztwo założenia",
      href: "/hizmetler/kurulum",
    },
    ctaSecondary: { label: "Kontakt", href: "#iletisim" },
  },
  {
    slug: "sahis-idari",
    title: "Osoba — urząd, prawo jazdy, karta pobytu",
    description:
      "Most językowy i tracking dla obywateli TR w PL. Bez gwarancji decyzji.",
    eyebrow: "Przewodnik · osoba",
    disclaimer:
      "Informacja. Bez gwarancji pobytu, prawa jazdy ani wyniku zdrowotnego.",
    sections: [
      {
        id: "ne",
        title: "Jakie sprawy?",
        paragraphs: [
          "Korespondencja urzędowa, wymiana prawa jazdy, pisma o kartę pobytu, braki dokumentów, tracking.",
        ],
      },
      {
        id: "nasil",
        title: "Jak działamy?",
        paragraphs: [
          "Pismo → Jedno pismo / opieka miesięczna.",
          "Towarzyszenie na miejscu → formularz „towarzyszenie — osoba”.",
          "Wniosek w MOS → `/rehber/mos` — nie logujemy się za Państwa.",
        ],
      },
      {
        id: "sinir",
        title: "Granice",
        paragraphs: [
          "Bez automatyzacji MOS / urzędu. Nie udostępniajcie loginów. Decyzja należy do urzędu.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Towarzyszenie / osoba",
      href: "/hizmetler/eslik",
    },
    ctaSecondary: {
      label: "Jedno pismo",
      href: "/basvuru?paket=tek-yazi",
    },
  },
  {
    slug: "mos",
    title: "Czym jest MOS?",
    description:
      "Portal elektronicznych wniosków o pobyt. ROUTEPOL nie załatwia pobytu.",
    eyebrow: "Przewodnik · MOS",
    disclaimer:
      "Informacja ogólna. Prawo się zmienia — sprawdzajcie źródła oficjalne.",
    sections: [
      {
        id: "nedir",
        title: "1) Czym jest MOS?",
        paragraphs: [
          "MOS to oficjalny portal do niektórych wniosków cudzoziemców. Konto, wniosek i UPO są Państwa odpowiedzialnością.",
        ],
      },
      {
        id: "biz",
        title: "2) Co robimy / czego nie?",
        paragraphs: [
          "Robimy: wyjaśniamy pismo MOS / urzędu; termin; kto działa; tracking (wg pakietu).",
          "Nie robimy: logowania za Państwa, automatyzacji formularzy, gwarancji decyzji.",
        ],
      },
      {
        id: "yazi",
        title: "3) Gdy przyszło pismo",
        paragraphs: [
          "Wgrajcie pismo i wybierzcie pakiet. Streszczenie i kolejny krok na stronie sprawy.",
        ],
      },
      {
        id: "guvenlik",
        title: "4) Bezpieczeństwo",
        paragraphs: [
          "Nie udostępniajcie danych logowania MOS. Składajcie wniosek na własnym koncie.",
        ],
      },
    ],
    sourcesLabel: "Źródła oficjalne",
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
    ctaPrimary: {
      label: "Streszczenie pisma",
      href: "/basvuru?paket=tek-yazi",
    },
    ctaSecondary: { label: "Przewodnik", href: "/rehber" },
  },
];

const hubEn: RehberHub = {
  meta: {
    title: "Guides — Poland admin processes",
    description:
      "Official letters, package choice, company setup overview, individuals and MOS. Not legal advice.",
  },
  eyebrow: "Information",
  title: "Guides",
  intro:
    "Short, honest answers to common admin questions in Poland. Goal: understand the issue and pick the right package. Not legal advice; no decision guarantees.",
  disclaimer:
    "General information only. Decisions stay with authorities and authorised persons. ROUTEPOL is not a law firm or tax office.",
  cards: [
    {
      slug: "kurum-yazisi",
      title: "An official letter arrived — what next?",
      body: "Deadline, what is asked, who acts. Single letter or monthly?",
      badge: "Common",
    },
    {
      slug: "paket-secimi",
      title: "Which package should I choose?",
      body: "Single letter, monthly tracking, POA execution.",
      badge: "Package",
    },
    {
      slug: "sirket-kurulusu",
      title: "Company / activity — typical sequence",
      body: "Admin framework for investment from TR (no incorporation promise).",
      badge: "Corporate",
    },
    {
      slug: "sahis-idari",
      title: "Individuals — offices, licence, residence",
      body: "Language bridge, tracking and on-site accompaniment.",
      badge: "Individual",
    },
    {
      slug: "mos",
      title: "What is MOS?",
      body: "Official residence-filing portal — no automation.",
      badge: "Portal",
    },
  ],
  backHome: "Home",
  readCta: "Read",
};

const articlesEn: RehberArticle[] = [
  {
    slug: "kurum-yazisi",
    title: "An official letter arrived — what next?",
    description:
      "Checklist when US, ZUS or another office writes to you. Informational.",
    eyebrow: "Guide · official letter",
    disclaimer: "General information. Not legal advice; no timeline guarantee.",
    sections: [
      {
        id: "ilk",
        title: "1) First check",
        paragraphs: [
          "Keep the letter (PDF or clear photo). Note the sender, date, addressee, case number and response deadline.",
        ],
        bullets: [
          "Is there a deadline? Put it in your calendar (Warsaw time).",
          "What is asked: information, annexes, payment, appointment?",
          "Addressee: individual, company, employer side?",
        ],
      },
      {
        id: "anla",
        title: "2) Understanding",
        paragraphs: [
          "ROUTEPOL summarises the letter in PL / EN / TR: what is asked, deadline, who acts. We do not decide for the office or file on your behalf.",
        ],
      },
      {
        id: "paket",
        title: "3) Which product?",
        paragraphs: [
          "Single letter for one-off. Monthly tracking for regular inflow. POA package for intensive admin coordination under notarial admin POA.",
        ],
      },
      {
        id: "sonra",
        title: "4) After payment",
        paragraphs: [
          "Status on the case page / Account. Download the result there — usually no email attachment.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Single letter — apply",
      href: "/basvuru?paket=tek-yazi",
    },
    ctaSecondary: { label: "All packages", href: "/hizmetler#paketler" },
  },
  {
    slug: "paket-secimi",
    title: "Which package should I choose?",
    description: "Three packages — short decision tree.",
    eyebrow: "Guide · packages",
    disclaimer: "Product description. Live prices on package pages.",
    sections: [
      {
        id: "uc",
        title: "Three products",
        paragraphs: ["On the site we sell:"],
        bullets: [
          "Single letter — one-letter summary.",
          "Monthly admin tracking — Stripe subscription (auto-renew); fee even with no letters; period quota, portal; 40 zł per extra letter; unused quota not refunded.",
          "Admin execution with POA — Stripe subscription (auto-renew); admin coordination (not legal representation).",
        ],
      },
      {
        id: "sec",
        title: "How to choose",
        paragraphs: [
          "One letter, unclear follow-up → Single letter.",
          "Regular letters → monthly subscription (card renews automatically).",
          "Formation / heavy coordination → POA subscription (+ lawyer separately).",
        ],
      },
      {
        id: "degil",
        title: "How other services work",
        paragraphs: [
          "Phone consultation is not available right now. Use a written package or the contact form.",
          "On-site accompaniment: contact form first, then scope and the right package.",
          "Investment / formation advisory: services page and form; paid delivery runs through the packages.",
        ],
      },
    ],
    ctaPrimary: { label: "Packages", href: "/hizmetler#paketler" },
    ctaSecondary: { label: "Services hub", href: "/hizmetler" },
  },
  {
    slug: "sirket-kurulusu",
    title: "Company / activity in PL — typical sequence",
    description:
      "Admin framework for investment from Turkey. No KRS incorporation promise.",
    eyebrow: "Guide · formation",
    disclaimer:
      "General framework. Structure and KRS decision sit with the lawyer partner. We do not incorporate for you.",
    sections: [
      {
        id: "sira",
        title: "Typical sequence",
        paragraphs: ["The real path depends on your case and lawyer:"],
        bullets: [
          "Form: sp. z o.o. / branch / JDG",
          "Notary / articles → KRS filing",
          "NIP / REGON → VAT / VAT-UE → bank → accountant",
          "After registration: US / ZUS / bank KYC letters",
        ],
      },
      {
        id: "rol",
        title: "Who does what?",
        paragraphs: [
          "Lawyer: legal choice, contract, notary, KRS, representation.",
          "ROUTEPOL: process map, gaps, language, handoff, post-registration summaries.",
          "Bookkeeping: out of scope.",
        ],
      },
      {
        id: "basla",
        title: "How to start",
        paragraphs: [
          "`/hizmetler/kurulum` and the contact form “TR operator — Poland investment”. Intensive period — POA; regular letters — monthly plan.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Formation advisory",
      href: "/hizmetler/kurulum",
    },
    ctaSecondary: { label: "Contact", href: "#iletisim" },
  },
  {
    slug: "sahis-idari",
    title: "Individuals — offices, licence, residence card",
    description:
      "Language bridge and tracking for Turkish nationals in Poland. No decision guarantee.",
    eyebrow: "Guide · individual",
    disclaimer:
      "Information only. No residence, driving-licence or medical-outcome promise.",
    sections: [
      {
        id: "ne",
        title: "What kinds of matters?",
        paragraphs: [
          "Office correspondence, driving-licence conversion, residence-card letters, missing-document lists, tracking.",
        ],
      },
      {
        id: "nasil",
        title: "How it works",
        paragraphs: [
          "Letter → Single letter / monthly package.",
          "On-site accompaniment → form “accompaniment — individual”.",
          "MOS filing → `/rehber/mos` — we do not log in for you.",
        ],
      },
      {
        id: "sinir",
        title: "Limits",
        paragraphs: [
          "No MOS / office form automation. Do not share logins. Decisions stay with the office.",
        ],
      },
    ],
    ctaPrimary: {
      label: "Individual / accompaniment",
      href: "/hizmetler/eslik",
    },
    ctaSecondary: {
      label: "Single letter",
      href: "/basvuru?paket=tek-yazi",
    },
  },
  {
    slug: "mos",
    title: "What is MOS?",
    description:
      "Official portal for some residence filings. ROUTEPOL does not obtain residence.",
    eyebrow: "Guide · MOS",
    disclaimer:
      "General information. Rules change — check official sources.",
    sections: [
      {
        id: "nedir",
        title: "1) What is MOS?",
        paragraphs: [
          "MOS is an official portal for some foreigners’ residence-related filings. Account, application and UPO are your responsibility.",
        ],
      },
      {
        id: "biz",
        title: "2) What we do / do not do",
        paragraphs: [
          "We do: explain MOS / office letters; deadline; who acts; tracking (by package).",
          "We do not: log in for you, automate forms, or guarantee decisions.",
        ],
      },
      {
        id: "yazi",
        title: "3) If a letter arrives",
        paragraphs: [
          "Upload the letter and pick a package. Summary and next step appear on the case page.",
        ],
      },
      {
        id: "guvenlik",
        title: "4) Security",
        paragraphs: [
          "Do not share MOS credentials. File on your own account.",
        ],
      },
    ],
    sourcesLabel: "Official sources",
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
    ctaPrimary: {
      label: "Letter summary — apply",
      href: "/basvuru?paket=tek-yazi",
    },
    ctaSecondary: { label: "Guides home", href: "/rehber" },
  },
];

const hubs: Record<RehberLocale, RehberHub> = {
  tr: hubTr,
  pl: hubPl,
  en: hubEn,
};

const articlesByLocale: Record<RehberLocale, RehberArticle[]> = {
  tr: articlesTr,
  pl: articlesPl,
  en: articlesEn,
};

export const rehberSlugs = articlesTr.map((a) => a.slug);

export function getRehberHub(locale: string): RehberHub {
  if (locale === "pl") return hubs.pl;
  if (locale === "en") return hubs.en;
  return hubs.tr;
}

export function getRehberArticles(locale: string): RehberArticle[] {
  if (locale === "pl") return articlesByLocale.pl;
  if (locale === "en") return articlesByLocale.en;
  return articlesByLocale.tr;
}

export function getRehberArticle(
  locale: string,
  slug: string,
): RehberArticle | null {
  const list = getRehberArticles(locale);
  return list.find((a) => a.slug === slug) ?? null;
}
