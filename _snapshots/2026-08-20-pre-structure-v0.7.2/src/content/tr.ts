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
  nav: [
    { id: "paketler", label: "Hizmetler", href: "#paketler" },
    { id: "sinirlar", label: "Kapsam", href: "#sinirlar" },
    { id: "surec", label: "Nasıl işler?", href: "#surec" },
    { id: "neden-biz", label: "Neden biz", href: "#neden-biz" },
    { id: "sss", label: "SSS", href: "#sss" },
    { id: "iletisim", label: "İletişim", href: "#iletisim" },
  ],
  hero: {
    title: "Resmi yazıyı dilinizde anlarsınız; süreciniz kaybolmaz",
    subtitle:
      "Kurum evrakını PL / EN / TR açıklarız. Ne istendi, son tarih ve sıradaki adım net kalır.",
    badges: ["Dilinizde özet", "Avukat yürütür · biz takip ederiz"],
    ctaPrimary: "Başvur",
    ctaSecondary: "WhatsApp",
    ctaHeader: "Başvur",
    accountLink: "Hesabım",
    trustLine:
      "POL-TURK avukatlık değildir. Hukuki süreci Polonyalı avukat ortakları yürütür.",
    eyebrow: "Resmi yazı · dilinizde · takipte",
    documentDemo: {
      docLabel: "Özet kart",
      keywords: ["wezwanie", "termin", "załącznik"],
      footnote: "Örnek özet — gerçek dosyanızda alanlar değişir.",
      rows: [
        { label: "Ne istendi", value: "Ek belge + form" },
        { label: "Son tarih", value: "14 gün" },
        { label: "Sıradaki adım", value: "Evrak yükle / avukata ilet" },
      ],
    },
  },
  whatWeDo: {
    eyebrow: "Rol ayrımı",
    title: "Kim ne yapar?",
    intro:
      "Bilgi akışı POL-TURK üzerinden geçer; hukuki karar avukat ortağında kalır — biz avukat değiliz.",
    lanes: {
      lawyer: {
        label: "Avukat ortağı",
        note: "Hukuki karar ve temsil (ayrı şerit)",
      },
      institution: {
        label: "Kurum (urząd / ZUS)",
        action: "Resmi yazı gelir",
      },
      bridge: {
        label: "POL-TURK",
        action: "Açıklar · takip eder · koordine eder",
      },
      you: {
        label: "Siz",
        action: "Ne yapacağınızı bilirsiniz",
      },
    },
  },
  portalSteps: {
    steps: ["Ödeme", "Alındı", "İşleniyor", "Hazır"],
  },
  services: {
    title: "Hizmetler",
    intro: "Şirket, şahıs veya tek yazı — ihtiyacınıza uygun paketi seçin.",
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
        badge: "Şirketler için",
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
        badge: "Şirket / şahıs",
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
        badge: "Şirket veya şahıs",
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
  scope: {
    title: "Kapsam",
    eyebrow: "Sınırlar",
    intro: "Ne yapıyoruz, ne yapmıyoruz — net çizgi.",
    includedTitle: "Yaptığımız",
    excludedTitle: "Yapmadığımız",
    included: [
      "Resmi yazının PL / EN / TR özeti — ne istendi, son tarih, kim ne yapacak",
      "Süreç durumunu takip: ne geldi, sırada ne var",
      "Avukat ortağı, kurum ve siz arasında koordinasyon",
      "Güncel bilgi — özel dosya sayfanızda",
      "İstenirse yeminli tercüman üzerinden resmi tercüme desteği",
    ],
    excluded: [
      "Hukuki sürecin yönetimi (avukat ortağındadır)",
      "Avukatlık, hukuki tavsiye ve dava",
      "Muhasebe ve vergi beyanı",
      "Onay veya süre garantisi",
      "Kendimizi avukat veya yeminli tercüman olarak sunmak",
    ],
    collaboration: {
      title: "Kim ne yapar?",
      body: "Hukuki süreci Polonyalı avukat ortaklarımız yürütür — tavsiye ve temsil onlardadır. POL-TURK avukat değildir: resmi yazıyı dilinizde açıklar, süreci takip eder, taraflar arasında koordinasyon sağlar. Mali iş muhasebecide; resmi yeminli tercüme gerektiğinde yeminli tercümanda kalır.",
    },
  },
  whyUs: {
    title: "Neden POL-TURK?",
    intro:
      "Hukuku avukat yönetir. Siz resmi yazıyı anlar, sürecin nerede olduğunu görürsünüz — şirket ve şahıs aynı standart.",
    concessionTitle: "",
    concessionBody: "",
    compareTitle: "",
    compareThemLabel: "",
    compareUsLabel: "",
    compareRows: [],
    itemsTitle: "",
    items: [
      {
        title: "Resmi yazıyı anlarsınız",
        body: "Kurum evrakını PL / EN / TR özetleriz: talep, son tarih, kim ne yapacak — hukuk jargonu olmadan.",
      },
      {
        title: "Süreci takip edersiniz",
        body: "Avukat, kurum ve siz arasında durum kaybolmaz. Güncel bilgi özel dosya sayfanızda; e-posta ile hatırlatma gelir.",
      },
      {
        title: "Üç dil",
        body: "PL / EN / TR. Resmi yeminli tercüme gerektiğinde yeminli tercüman desteği — ücret ayrıca netleştirilir.",
      },
      {
        title: "Dürüst sınır",
        body: "Onay sözü vermeyiz. Karar kuruma ve avukata / yetkiliye aittir.",
      },
    ],
  },
  process: {
    title: "Nasıl işler?",
    steps: [
      {
        title: "Yazıyı iletin",
        body: "Başvuru formundan evrakı yükleyin veya sürecinizi anlatın. Dilinizi seçin (PL / EN / TR).",
      },
      {
        title: "Dilinizde açıklayalım",
        body: "Ne istendi, son tarih ne, sırada ne var — net özet. Hukuk gerektiriyorsa avukat ortağı devreye girer.",
      },
      {
        title: "Avukat yürütür",
        body: "Hukuki kısım Polonyalı avukat ortağında ilerler; kontrol ve temsil ondadır.",
      },
      {
        title: "Takip ve güncelleme",
        body: "Durum değiştikçe bilgilendiririz. Sonuç hazır olunca özel sayfanızdan indirirsiniz.",
      },
    ],
  },
  faq: {
    title: "Sıkça sorulan sorular",
    items: [
      {
        id: "ne",
        question: "Ne yapıyorsunuz?",
        answer:
          "Kurumdan gelen resmi yazıyı PL / EN / TR açıklarız; ne istendi, son tarih ve sıradaki adımı söyleriz. Süreci takip eder, avukat ortağı ve siz arasında koordinasyon sağlarız. Hukuki süreci yönetmeyiz — bu avukat ortağındadır.",
      },
      {
        id: "kim",
        question: "Kimler için?",
        answer:
          "Polonya’daki yabancı şirketler ve şahıslar. Resmi yazı veya idari süreçte dil desteği ve net takip isteyenler.",
      },
      {
        id: "dil",
        question: "Hangi dillerde çalışıyorsunuz?",
        answer:
          "PL / EN / TR. Resmi yeminli tercüme gerektiğinde yeminli tercümanlarla ilerleriz; ücret ayrıca netleştirilir.",
      },
      {
        id: "muhasebe",
        question: "Muhasebecimiz var. Neden size gelelim?",
        answer:
          "Muhasebeci defteri tutar. Resmi yazı ve idari süreç çoğu zaman yönetim ile avukat arasında kaybolur. Biz yazıyı dilinizde açıklar, takibi tutarız; mali kısım muhasebecide, hukuk avukatta kalır.",
      },
      {
        id: "fiyat",
        question: "Ücret nasıl?",
        answer:
          "Aylık idari takip yazı sayısına göre 160 zł’den. Vekaletli idari yürütme: şirket 1 200 zł, şahıs 650 zł. Tek yazı 50 zł’den. Avukat ücreti ayrıdır. Detay hizmetlerde.",
      },
      {
        id: "vekalet",
        question: "Kuruma gider misiniz?",
        answer:
          "Yalnız vekaletli idari paketinde ve noterden verilen idari vekaletle (idari işler). Hukuki temsil ve süreç yönetimi avukat ortağındadır.",
      },
      {
        id: "sonuc",
        question: "Sonucu nasıl alırım?",
        answer:
          "Üyelik yok. Ödeme sonrası özel link e-postanıza gelir; sonuç hazır olunca ikinci bir e-posta ile aynı link hatırlatılır. Dosyayı o sayfadan indirirsiniz — ek olarak göndermeyiz.",
      },
      {
        id: "garanti",
        question: "Sonuç garanti mi?",
        answer:
          "Hayır. Karar kuruma ve avukata / yetkiliye aittir. Biz açıklama, takip ve koordinasyon sunarız; sonucu vaat etmeyiz.",
      },
      {
        id: "avukat",
        question: "Avukat mısınız? Süreci kim yönetir?",
        answer:
          "Hayır. Hukuki süreci Polonyalı avukat ortaklarımız yürütür. Biz resmi yazıyı dilinizde açıklar ve süreci takip ederiz.",
      },
    ],
  },
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
    form: {
      fullName: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      phoneCode: "Ülke kodu",
      serviceType: "Hizmet",
      message: "Şirket / şahıs, şehir, ihtiyacınız",
      privacy:
        "Kişisel verilerimin iletişim amacıyla işlenmesini kabul ediyorum.",
      submit: "Gönder",
      loading: "Gönderiliyor…",
      success: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
      error: "Gönderilemedi. Lütfen tekrar deneyin.",
      rateLimited: "Çok fazla deneme. Biraz sonra tekrar deneyin.",
      fieldError: "Bu alanı kontrol edin.",
      fileNote: "Yazı yükleyip ödemek için Başvur sayfasını kullanın:",
      otherService: "Diğer",
    },
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
  socialProof: {
    eyebrow: "Şeffaflık",
    title: "Uydurma müşteri sayısı yok — süreci görürsünüz",
    note: "Onay veya süre garantisi vermiyoruz. Karar ilgili Polonya kurumuna aittir.",
    badges: ["PL", "EN", "TR"],
    signals: [],
    flowTitle: "Ödedikten sonra ne görürsünüz?",
    flowNote:
      "Her dosya aynı adımları takip eder — durum portalda ve e-posta linkinde görünür.",
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
    foundationNote: "",
    contentComplete: true,
  },
};
