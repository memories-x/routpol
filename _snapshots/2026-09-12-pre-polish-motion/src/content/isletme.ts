import type { ServiceDetailContent } from "@/content/service-detail-types";

/** Polonya’daki Türk KOBİ / JDG — idari evrak masası (kanon paketlere bağlı). */

export const isletmeTr: ServiceDetailContent = {
  meta: {
    title: "İşletme hizmetleri — Polonya’daki Türk KOBİ",
    description:
      "US, ZUS, KRS ve diğer kurum yazılarının özeti, aylık takip ve idari koordinasyon. Avukatlık veya muhasebe değildir.",
  },
  eyebrow: "İşletme · evrak masası",
  title: "İşletme hizmetleri",
  lead:
    "Polonya’da faaliyet gösteren Türk restoran, lojistik / taşıma, toptan, inşaat veya JDG her ay kurum yazısı alır. Asıl ihtiyaç: ne istendiğini anlamak, son tarihi kaçırmamak, muhasebeye net not ve hukuk dosyasında avukat ortağına köprü. POL-TURK bu masayı dilinizde tutar.",
  positioning:
    "Defteri tutmayız, vergi beyanı imzalamayız, hukuki temsil etmeyiz. Paketler: Tek yazı, Aylık idari takip, Vekaletli idari yürütme. “İşletme hizmetleri” bu paketlerin KOBİ kullanım yoludur.",
  whoTitle: "Kimler için?",
  who: [
    {
      title: "Küçük ve orta işletmeler",
      body: "Gastronomi, TIR / lojistik, toptan, inşaat, perakende — US / ZUS / belediye ve faaliyet evrakı olan firmalar.",
    },
    {
      title: "JDG / şahıs işletmeleri",
      body: "Tek yazı veya düşük kotayla başlamak isteyen sahipler; aylık taahhüt şart değil.",
    },
    {
      title: "İşveren (çalışan dosyası)",
      body: "Çalışana gelen oturum / kurum yazısının işveren tarafında anlaşılması ve evrak listesi (bilgilendirme; oturum garantisi yok).",
    },
  ],
  pillarsTitle: "Günlük işte ne sunulur?",
  pillars: [
    {
      title: "Yazı özeti",
      body: "Gelen resmi yazı: ne istendi, son tarih, ekler, sıradaki adım (siz / księgowy / avukat). Tek yazı paketinde tek sefer; aylık pakette kota kadar.",
    },
    {
      title: "Takip ve portal",
      body: "Ödeme sonrası dosya sayfası + Hesabım. Aylık pakette dönem kotası, aşım 40 zł; yeni yazı Hesabım’dan yüklenir.",
    },
    {
      title: "Avukat ortağı köprüsü",
      body: "Hukuki tavsiye vermeyiz. Dosya avukat ortağına tutarlı iletilir; ücret ve temsil avukattadır.",
    },
  ],
  deliverablesTitle: "Teslimatlar",
  deliverables: [
    "Kurum yazısının PL / EN / TR yapılandırılmış özeti",
    "Son tarih ve “kim ne yapar” netliği",
    "Muhasebeciye / avukata iletilecek kısa not",
    "Dosya sayfasında durum adımları ve sonuç indirme",
    "Aylık pakette dönem kotası; aşım ayrıca ücretlendirilir",
  ],
  processTitle: "Operasyon akışı",
  processIntro:
    "Site üzerindeki gerçek sipariş döngüsü budur — kurgusal ticket sistemi yoktur.",
  process: [
    {
      title: "1 · Başvuru",
      body: "Paket seçin, resmi yazıyı (PDF / fotoğraf) yükleyin, ödemeyi tamamlayın.",
    },
    {
      title: "2 · Dosya linki",
      body: "E-postada bu dosyanın linki + Hesabım (e-posta ve şifre). Şifre unutulursa e-posta ile sıfırlama.",
    },
    {
      title: "3 · Özet / takip",
      body: "Operatör özeti hazırlar; gerekirse paylaşılan not. Durum dosya sayfasında görünür.",
    },
    {
      title: "4 · Sonuç",
      body: "Hazır PDF’i dosya sayfasından indirirsiniz. Aylıkta yeni yazı = kota veya aşım.",
    },
  ],
  packagesTitle: "Paket eşlemesi",
  packagesIntro:
    "Fiyatlar hizmet detay / başvuru sayfalarındadır. Aşağıdaki eşleme operasyonel gerçeği yansıtır.",
  packages: [
    {
      slug: "aylik-paket",
      title: "Aylık idari takip",
      role: "Düzenli yazı alan işletmeler için ana ürün (min. 4 yazı / ay, yazı başı 40 zł).",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Tek yazı",
      role: "Seyrek yazı veya acil tek evrak — taahhütsüz giriş.",
      href: "/hizmetler/tek-yazi",
    },
    {
      slug: "surec-yonetimi",
      title: "Vekaletli idari yürütme",
      role: "Yoğun idari dönem: randevu / evrak koordinasyonu (şirket veya şahıs fiyatı).",
      href: "/hizmetler/surec-yonetimi",
    },
  ],
  includedTitle: "Kapsama giren",
  included: [
    "Kurum yazılarının dilde açıklaması",
    "Son tarih ve sıradaki adım",
    "Aylık dönemde portal üzerinden yeni yazı yükleme (kota)",
    "İşveren tarafı yazı özeti (oturum garantisi olmadan)",
    "Gerekirse avukat ortağına yönlendirme",
  ],
  excludedTitle: "Kapsam dışı",
  excluded: [
    "Muhasebe, bordro ve vergi beyanı",
    "Hukuki tavsiye ve dava",
    "Oturum / çalışma izni çıkarma garantisi",
    "MOS veya urząd form otomasyonu",
    "Onay veya süre garantisi",
  ],
  engagementTitle: "Nasıl başlanır?",
  engagementBody:
    "Düzenli yazınız varsa Aylık takip. Tek yazı siteden. Yoğun koordinasyon: Vekaletli yürütme. Telefon görüşmesi şu an sunulmuyor. Paket seçimi belirsizse formdan “Polonya’daki işletme”.",
  ctaConsult: "İşletme görüşmesi",
  ctaPrimaryPackage: {
    label: "Aylık takip — başvur",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaSecondaryPackage: {
    label: "Tek yazı — başvur",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Tüm hizmetlere dön",
  disclaimer:
    "İdari köprü ve dil özetidir. Muhasebe, avukatlık veya izin garantisi değildir. Karar kurumlara ve yetkili kişilere aittir.",
};

export const isletmePl: ServiceDetailContent = {
  ...isletmeTr,
  meta: {
    title: "Usługi dla firm — tureckie MŚP w Polsce",
    description:
      "Streszczenie pism US/ZUS/KRS, tracking miesięczny i koordynacja administracyjna. Nie jest księgowością ani kancelarią.",
  },
  eyebrow: "Firma · biurko dokumentów",
  title: "Usługi dla firm",
  lead:
    "Tureckie firmy w PL (gastronomia, logistyka, hurt, budowa, JDG) co miesiąc dostają pisma. Potrzeba: żądanie, termin, notatka do księgowego / most do adwokata-partnera. POL-TURK prowadzi to biurko.",
  positioning:
    "Nie prowadzimy ksiąg i nie reprezentujemy prawnie. Pakiety: Jedno pismo, Opieka miesięczna, Prowadzenie z POA. Konsultacja telefoniczna nie jest obecnie dostępna. „Usługi dla firm” to sposób korzystania z tych pakietów.",
  whoTitle: "Dla kogo?",
  who: [
    {
      title: "MŚP",
      body: "Gastronomia, transport, hurt, budowa, handel — regularna korespondencja US/ZUS.",
    },
    {
      title: "JDG",
      body: "Start od jednego pisma lub niskiego limitu — bez wymogu abonamentu.",
    },
    {
      title: "Pracodawca",
      body: "Pisma dotyczące pracownika — strona pracodawcy, lista dokumentów (bez gwarancji pobytu).",
    },
  ],
  pillarsTitle: "Co w praktyce?",
  pillars: [
    {
      title: "Streszczenie pisma",
      body: "Czego żądają, termin, załączniki, kto działa — w pakiecie jedno pismo lub miesięcznym.",
    },
    {
      title: "Tracking i portal",
      body: "Strona sprawy + Konto. Limit miesięczny, overage 40 zł; kolejne pisma z Konta.",
    },
    {
      title: "Intensywna koordynacja",
      body: "Pakiet z POA przy wizytach / dokumentach — honorarium adwokata osobno.",
    },
  ],
  deliverablesTitle: "Dostawy",
  deliverables: [
    "Uporządkowane streszczenie PL / EN / TR",
    "Termin i „kto co robi”",
    "Krótka notatka do księgowego / adwokata",
    "Status i pobranie wyniku na stronie sprawy",
    "Limit okresu; nadwyżka płatna osobno",
  ],
  processTitle: "Przepływ operacyjny",
  processIntro: "To realny cykl zamówienia na stronie — bez fikcyjnego ticketingu.",
  process: [
    {
      title: "1 · Wniosek",
      body: "Pakiet, wgranie pisma, płatność.",
    },
    {
      title: "2 · Link",
      body: "Link do sprawy + Konto (e-mail i hasło). Reset hasła na e-mail.",
    },
    {
      title: "3 · Streszczenie",
      body: "Operator przygotowuje wynik; status na stronie sprawy.",
    },
    {
      title: "4 · Wynik",
      body: "Pobranie PDF. Kolejne pismo w limicie lub overage.",
    },
  ],
  packagesTitle: "Mapowanie pakietów",
  packagesIntro: "Ceny na stronach pakietów / wniosku.",
  packages: [
    {
      slug: "aylik-paket",
      title: "Opieka miesięczna",
      role: "Główny produkt przy regularnych pismach (min. 4, 40 zł / pismo).",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Jedno pismo",
      role: "Rzadkie lub pilne pojedyncze pismo.",
      href: "/hizmetler/tek-yazi",
    },
    {
      slug: "surec-yonetimi",
      title: "Prowadzenie z POA",
      role: "Intensywna koordynacja administracyjna.",
      href: "/hizmetler/surec-yonetimi",
    },
  ],
  includedTitle: "W zakresie",
  included: [
    "Wyjaśnienie pism urzędowych",
    "Termin i kolejny krok",
    "Wgrywanie kolejnych pism w okresie (limit)",
    "Streszczenie po stronie pracodawcy (bez gwarancji pobytu)",
    "Most do adwokata-partnera w razie potrzeby",
  ],
  excludedTitle: "Poza zakresem",
  excluded: [
    "Księgowość i płace",
    "Porady prawne i procesy",
    "Gwarancja pobytu / zezwolenia na pracę",
    "Automatyzacja MOS / urząd",
    "Gwarancja decyzji",
  ],
  engagementTitle: "Jak zacząć?",
  engagementBody:
    "Regularne pisma — opieka miesięczna. Jedno pismo na stronie. Intensywnie — POA. Konsultacja telefoniczna nie jest obecnie dostępna. Wątpliwość — formularz „Firma w PL”.",
  ctaConsult: "Konsultacja dla firm",
  ctaPrimaryPackage: {
    label: "Pakiet miesięczny — wniosek",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaSecondaryPackage: {
    label: "Jedno pismo — wniosek",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Wróć do usług",
  disclaimer:
    "Most administracyjny i streszczenie językowe. Nie jest księgowością ani kancelarią. Decyzje należą do urzędów i osób uprawnionych.",
};

export const isletmeEn: ServiceDetailContent = {
  ...isletmeTr,
  meta: {
    title: "Business services — Turkish SMEs in Poland",
    description:
      "Summaries of US/ZUS/KRS letters, monthly tracking and admin coordination. Not bookkeeping or legal practice.",
  },
  eyebrow: "Business · document desk",
  title: "Business services",
  lead:
    "Turkish restaurants, logistics / transport, wholesale, construction firms and sole traders in Poland receive official letters every month. They need to understand the request, keep the deadline, hand a clear note to the accountant, and — if legal — a bridge to the lawyer partner. POL-TURK runs that desk in your language.",
  positioning:
    "We do not keep books or act as counsel. Packages: Single letter, Monthly admin tracking, Admin execution with POA. Phone consultation is not available right now. “Business services” is how SMEs use those packages.",
  whoTitle: "Who it is for",
  who: [
    {
      title: "SMEs",
      body: "Hospitality, transport, wholesale, construction, retail — regular US/ZUS correspondence.",
    },
    {
      title: "Sole traders (JDG)",
      body: "Start with one letter or a low quota — no mandatory subscription.",
    },
    {
      title: "Employers",
      body: "Employee-related letters on the employer side — informational checklist (no residence guarantee).",
    },
  ],
  pillarsTitle: "What day-to-day delivery looks like",
  pillars: [
    {
      title: "Letter summary",
      body: "What is asked, deadline, annexes, who acts — via Single letter or Monthly quota.",
    },
    {
      title: "Tracking & portal",
      body: "Case page + Account. Monthly quota, 40 zł overage; more letters from Account.",
    },
    {
      title: "Heavy coordination",
      body: "POA package for appointments / documents — lawyer fees separate.",
    },
  ],
  deliverablesTitle: "Deliverables",
  deliverables: [
    "Structured letter summary PL / EN / TR",
    "Deadline and who-does-what clarity",
    "Short note for accountant / lawyer",
    "Status steps and result download on the case page",
    "Period quota; overage billed separately",
  ],
  processTitle: "Operational flow",
  processIntro: "This is the real order cycle on the site.",
  process: [
    {
      title: "1 · Apply",
      body: "Pick a package, upload the letter, pay.",
    },
    {
      title: "2 · Links",
      body: "Case link + Account (email and password). Forgot password = email reset.",
    },
    {
      title: "3 · Summary",
      body: "Operator prepares the result; status on the case page.",
    },
    {
      title: "4 · Result",
      body: "Download the PDF. Next letter uses quota or overage.",
    },
  ],
  packagesTitle: "Package mapping",
  packagesIntro: "Prices live on package / application pages.",
  packages: [
    {
      slug: "aylik-paket",
      title: "Monthly admin tracking",
      role: "Primary product for regular letters (min. 4 / month, 40 zł per letter).",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Single letter",
      role: "Rare or urgent one-off — no monthly commitment.",
      href: "/hizmetler/tek-yazi",
    },
    {
      slug: "surec-yonetimi",
      title: "Admin execution with POA",
      role: "Intensive admin period — appointments / documents.",
      href: "/hizmetler/surec-yonetimi",
    },
  ],
  includedTitle: "In scope",
  included: [
    "Explanation of official letters",
    "Deadline and next step",
    "Uploading further letters in-period (quota)",
    "Employer-side letter summary (no residence guarantee)",
    "Referral to the lawyer partner when needed",
  ],
  excludedTitle: "Out of scope",
  excluded: [
    "Bookkeeping and payroll",
    "Legal advice and litigation",
    "Residence / work-permit guarantees",
    "MOS / office form automation",
    "Decision or timeline guarantees",
  ],
  engagementTitle: "How to start",
  engagementBody:
    "Regular letters — Monthly tracking. One letter on the site. Heavy coordination — POA package. Phone consultation is not available right now. Unsure which — contact form “Business in PL”.",
  ctaConsult: "Business consultation",
  ctaPrimaryPackage: {
    label: "Monthly plan — apply",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaSecondaryPackage: {
    label: "Single letter — apply",
    href: "/basvuru?paket=tek-yazi",
  },
  ctaBack: "Back to all services",
  disclaimer:
    "Admin bridge and language summary only. Not bookkeeping or legal practice. Decisions stay with authorities and authorised persons.",
};

export function getIsletmeContent(locale: string): ServiceDetailContent {
  if (locale === "pl") return isletmePl;
  if (locale === "en") return isletmeEn;
  return isletmeTr;
}
