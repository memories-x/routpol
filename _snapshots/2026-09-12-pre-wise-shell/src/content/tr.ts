import { faqTr } from "./faq";
import type { SiteContent } from "./types";

export const tr: SiteContent = {
  meta: {
    title: "POL-TURK | Resmi yazılarınız dilinizde — süreciniz takipte",
    description:
      "Kurum evrakını PL / EN / TR açıklarız; ne istendi, son tarih ve sıradaki adım net olur. Hukuki süreci Polonyalı avukat ortakları yürütür — biz avukat değiliz.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "Resmi yazıyı anlatırız, süreci takip ederiz",
  },
  portalSteps: {
    steps: ["Ödeme", "Alındı", "İşleniyor", "Hazır"],
  },
  services: {
    title: "Hizmetler",
    intro:
      "Türkiye’deki işletmeciler için Polonya yatırım ve kuruluş danışmanlığı; yereldeki Türk işletmeleri için idari köprü. Sipariş: üç paket (tek yazı, aylık takip, vekaletli yürütme).",
    detailCta: "Başvur",
    detailBack: "Hizmetlere dön",
    includedLabel: "Dahil",
    excludedLabel: "Dahil değil",
    priceLabel: "Ücret",
    items: [
      {
        slug: "aylik-paket",
        icon: "Mail",
        title: "Aylık idari takip",
        badge: "İşletme · takip",
        shortDescription:
          "Ay boyunca gelen resmi yazıları PL / EN / TR açıklarız; ne istendi, son tarih ve sıradaki adım net kalır.",
        detailLabel: "Detay",
        priceFrom: "160 zł’den / ay",
        priceRows: [
          { label: "4 yazı", amount: "160 zł" },
          { label: "6 yazı", amount: "240 zł" },
          { label: "8 yazı", amount: "320 zł" },
          { label: "10 yazı", amount: "400 zł" },
          { label: "12 yazı", amount: "480 zł" },
        ],
        priceNote:
          "Yazı başına 40 zł. Aylık en az 4 yazı. Avukat ücreti ayrıdır. Yabancı şirket ve şahıs başvurabilir.",
        details: [
          "Kurum yazısının PL / EN / TR özeti",
          "Ne istendiği ve son tarih",
          "Sıradaki adım: siz, muhasebeci veya avukat ortağı",
        ],
        notIncluded: [
          "Hukuki tavsiye ve dava (avukat ortağındadır)",
          "Muhasebe",
          "Onay garantisi",
        ],
      },
      {
        slug: "surec-yonetimi",
        icon: "FileSignature",
        title: "Vekaletli idari yürütme",
        badge: "Kuruluş · vekalet",
        shortDescription:
          "Noter idari vekaletiyle evrak ve randevu koordinasyonu. Süreci dilinizde anlatır, avukat ortağıyla iletişimi ve takibi yürütürüz.",
        detailLabel: "Detay",
        priceFrom: "650 zł’den / ay",
        priceRows: [
          { label: "Şirket", amount: "1 200 zł / ay" },
          { label: "Şahıs", amount: "650 zł / ay" },
        ],
        priceNote:
          "Noter ücreti size aittir. Avukat ücreti ayrıdır. Vekalet yalnızca idari işler içindir; hukuki temsil avukattadır.",
        details: [
          "İdari vekalet kapsamında evrak ve randevu koordinasyonu",
          "Süreç durumu PL / EN / TR — ne oldu, sırada ne var",
          "Avukat ortağıyla iletişim ve takip",
        ],
        notIncluded: [
          "Noter ücreti",
          "Avukat ücreti, hukuki tavsiye ve dava",
          "Muhasebe ve vergi imzası",
          "Onay garantisi",
        ],
      },
      {
        slug: "tek-yazi",
        icon: "FileText",
        title: "Tek yazı",
        badge: "Tek seferlik",
        shortDescription:
          "Tek resmi yazı: dilinizde açıklama, net sonraki adım. Hukuk gerekirse avukat ortağına yönlendiririz. Aylık taahhüt yok.",
        detailLabel: "Detay",
        priceFrom: "50 zł’den",
        priceRows: [
          { label: "2 sayfaya kadar", amount: "50 zł" },
          { label: "Her ek sayfa", amount: "+25 zł" },
        ],
        priceNote:
          "Sayfa sayısı dosyadan ölçülür. İlk iki sayfa 50 zł; sonrası +25 zł. Avukat ücreti ayrıdır.",
        details: [
          "Yazının PL / EN / TR açıklaması",
          "Ne istedikleri ve son tarih",
          "Kim ne yapar (siz / muhasebe / avukat)",
        ],
        notIncluded: [
          "Hukuki tavsiye ve temsil",
          "Sürekli takip",
          "Muhasebe",
        ],
      },
    ],
  },
  faq: faqTr,
  contact: {
    title: "İletişim",
    officeLabel: "Görüşme",
    officeValue: "Polonya — randevu ile",
    emailLabel: "E-posta",
    emailValue: "teklif@pol-turk.example",
    phoneLabel: "Telefon",
    phoneValue: "",
    hoursLabel: "Saatler",
    hoursValue: "Pzt–Cum 09:00–17:00 (Europe/Warsaw)",
  },
  footer: {
    disclaimer:
      "POL-TURK avukatlık değildir. Hukuki süreci Polonyalı avukat ortakları yürütür. Resmi yazıyı dilinizde açıklar, süreci takip ederiz; hukuki tavsiye ve temsil avukata aittir. Resmi karar ilgili Polonya kurumuna aittir.",
    privacy: "Gizlilik",
    rights: "© POL-TURK. Tüm hakları saklıdır.",
  },
  privacyPage: {
    title: "Gizlilik (RODO / KVKK)",
    body: "Kişisel verileriniz yalnızca hizmet sunumu, ödeme ve iletişim için işlenir; pazarlama amacıyla satılmaz.",
    sections: [
      {
        title: "Veri sorumlusu",
        paragraphs: [
          "Veri sorumlusu: POL-TURK (Polonya). Unvan, NIP ve adres canlı ortamda env ile doldurulur (NEXT_PUBLIC_OPERATOR_*).",
          "RODO iletişim: sitedeki iletişim e-postası veya posta adresi.",
        ],
      },
      {
        title: "Hangi veriler",
        paragraphs: [
          "Kimlik ve iletişim (ad, e-posta, telefon), firma bilgisi (NIP), başvuru/evrak meta verisi, ödeme referansları (Stripe oturum kimliği — kart numarası saklanmaz).",
        ],
      },
      {
        title: "Amaç ve hukuki dayanak",
        paragraphs: [
          "Sözleşmenin kurulması ve ifası (RODO m.6/1/b), meşru menfaat — güvenlik logları (m.6/1/f).",
          "Avukat ortağı ve muhasebeci ile paylaşım yalnızca hizmet kapsamında ve sözleşme ekleriyle.",
        ],
      },
      {
        title: "Saklama",
        paragraphs: [
          "Ödenmemiş taslak: 30 gün sonra arşiv ve silme. Kapalı dosya: 24 ay sonra meta + dosya baytları silinir.",
          "Silme talebi: 30 gün içinde işlenir (DELETE /api/customer/account veya e-posta).",
        ],
      },
      {
        title: "Haklarınız",
        paragraphs: [
          "Erişim, düzeltme, silme, kısıtlama, itiraz ve taşınabilirlik (uygun olduğunda). Talep: iletişim e-postası.",
          "Şikayet: UODO (Polonya Kişisel Verileri Koruma Kurumu).",
        ],
      },
      {
        title: "Çerezler ve ölçüm",
        paragraphs: [
          "Zorunlu oturum çerezleri (panel, müşteri portalı). Analytics çerezsiz sunucu tarafı olay kaydı — reklam çerezi yok.",
        ],
      },
    ],
  },
  mosGuidePage: {
    title: "MOS hakkında",
    intro:
      "MOS, bazı oturum başvurularının elektronik yapıldığı resmi portaldır. POL-TURK oturum izni çıkarmaz. Şirketinize veya size MOS / urząd yazısı geldiyse PL / EN / TR açıklarız.",
    disclaimer: "Genel bilgilendirme. Hukuki tavsiye veya onay garantisi değildir.",
    sourcesLabel: "Resmi kaynak",
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
    ctaLabel: "Başvur",
    backLabel: "Ana sayfa",
    sections: [
      {
        id: "biz",
        title: "Biz ne yaparız?",
        paragraphs: [
          "Yazı geldiyse seçtiğiniz dilde (PL / EN / TR) açıklarız: ne istendi, son tarih, kim ne yapacak. Başvuruyu sizin yerinize göndermeyiz.",
        ],
      },
    ],
  },
  system: {
    localeSoon: "",
    whatsappPrefill:
      "Merhaba POL-TURK, siteden yazıyorum. Resmi yazı / süreç takibi (şirket veya şahıs) hakkında bilgi istiyorum.",
    whatsappLabel: "WhatsApp",
    foundationNote: "",
    contentComplete: true,
  },
};
