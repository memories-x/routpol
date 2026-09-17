/** POL-TURK kamu landing — ticaret masası (ana) + idari köprü paketleri. BPO denemesi kaldırıldı. */

import { faqEn, faqPl, faqTr, type FaqBlock } from "./faq";
import {
  heroDemoEn,
  heroDemoPl,
  heroDemoTr,
  type HeroDemoContent,
} from "./landing-hero-demo";

export type LandingLocale = "tr" | "pl" | "en";

export type LandingNavItem = {
  id: string;
  label: string;
  /** Path after locale (`/hizmetler`) or hash (`#paketler`) */
  href: string;
};

export type LandingContent = {
  meta: { title: string; description: string };
  brand: { name: string; tagline: string; secondName?: string; secondLineHint?: string };
  nav: LandingNavItem[];
  headerCta: string;
  accountLink: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    valueLine: string;
    ctaPrimary: string;
    /** Hash or path after locale — default `#paketler` */
    ctaPrimaryHref?: string;
    ctaSecondary: string;
    /** Hash or path — default `#hizmetler` */
    ctaSecondaryHref?: string;
    /**
     * Operasyonel destek notu (idari paketler) — birincil CTA ticaret;
     * eşit çift CTA değil.
     */
    supportTrack?: {
      kicker: string;
      title: string;
      body: string;
      ctaLabel: string;
      href: string;
    };
    /** Müşteri dosyası demo — `landing-hero-demo.ts` */
    demo: HeroDemoContent;
  };
  bridge: {
    eyebrow: string;
    title: string;
    intro: string;
    lanes: { id: string; label: string; body: string }[];
    lawyerNote: string;
  };
  audiences: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      points: string[];
      ctaLabel: string;
      href: string;
    }[];
  };
  /** Yerinde eşlik — firma / şahıs (mevcut segmentlerden ayrı) */
  fieldSupport: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      points: string[];
      ctaLabel: string;
      href: string;
    }[];
    disclaimer: string;
    hubCta: string;
    hubHref: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      icon: string;
      title: string;
      body: string;
      packageSlug?: string;
      href: string;
      ctaLabel: string;
      /** Paket | Görüşme */
      badge?: string;
    }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    intro: string;
    applyLabel: string;
    detailLabel: string;
    /** Featured (aylık) mini month story — Attio single scene */
    featuredStory: {
      title: string;
      steps: string[];
    };
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    paidPathTitle: string;
    steps: { title: string; body: string }[];
    consultPathTitle: string;
    consultPathBody: string;
    consultSteps: { title: string; body: string }[];
    ctaPackage: string;
    ctaConsult: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    intro: string;
    tabs: {
      id: string;
      label: string;
      title: string;
      bullets: string[];
      ctaLabel: string;
      href: string;
    }[];
  };
  scope: {
    eyebrow: string;
    title: string;
    includedTitle: string;
    excludedTitle: string;
    included: string[];
    excluded: string[];
  };
  faq: FaqBlock;
  lead: {
    title: string;
    intro: string;
    fullName: string;
    company: string;
    employees: string;
    email: string;
    phone: string;
    process: string;
    processOptions: { value: string; label: string }[];
    privacy: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    fieldError: string;
    modalTitle: string;
    close: string;
  };
  trust: {
    title: string;
    badges: string[];
  };
  footer: {
    disclaimer: string;
    privacy: string;
    rights: string;
    servicesHub: string;
    about: string;
    apply: string;
    accompaniment: string;
    advisory: string;
    formation: string;
    business: string;
    education: string;
    packages: string;
    guide: string;
    faq: string;
    groupServices: string;
    groupBuy: string;
    groupSite: string;
  };
};

export const landingTr: LandingContent = {
  meta: {
    title: "POL-TURK | Polonya’da idari takip — Türkiye’den",
    description:
      "Türkiye’deki girişimci ve şirketler için Polonya’da resmi yazı, evrak ve idari süreç takibi. Dilinizde özet. Net adım. Ayrıca ticaret danışmanlığı.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "Polonya’da idari takip",
    secondName: "POL-TURK",
    secondLineHint: "Türkiye · Polonya",
  },
  nav: [
    { id: "hizmetler", label: "Hizmetler", href: "/hizmetler" },
    { id: "paketler", label: "Paketler", href: "/hizmetler#paketler" },
    { id: "danismanlik", label: "Danışmanlık", href: "/danismanlik" },
    { id: "hakkimizda", label: "Hakkımızda", href: "/hakkimizda" },
    { id: "rehber", label: "Rehber", href: "/rehber" },
    { id: "sss", label: "SSS", href: "#sss" },
    { id: "iletisim", label: "İletişim", href: "#iletisim" },
  ],
  headerCta: "Başvur",
  accountLink: "Giriş",
  hero: {
    eyebrow: "Türkiye · Polonya",
    title: "Polonya’daki idari işleriniz, tek noktada.",
    subtitle:
      "Resmi yazıları dilinizde özetler; son tarihi ve sıradaki adımı net tutarız. Evrak ve süreç takibi bizde. Karar sizde.",
    valueLine:
      "Avukat değiliz. Tescil ve hukuki temsil avukat ortağındadır. Ticaret danışmanlığı ayrı bir hizmet hattıdır.",
    ctaPrimary: "Paketleri inceleyin",
    ctaPrimaryHref: "/hizmetler#paketler",
    ctaSecondary: "Ticaret danışmanlığı",
    ctaSecondaryHref: "/danismanlik",
    supportTrack: {
      kicker: "Hizmet hattı",
      title: "Ticaret danışmanlığı",
      body: "Pazar görünürlüğü, karşı taraf haritası, görüşme ve teklif derlemesi. İdari takipten ayrı sunulur.",
      ctaLabel: "İnceleyin",
      href: "/danismanlik",
    },
    demo: heroDemoTr,
  },
  bridge: {
    eyebrow: "Nasıl çalışır",
    title: "Kurum yazar. Biz takip ederiz. Siz karar verirsiniz.",
    intro:
      "Polonya’daki idari dosya tek yerde toplanır. Dil, tarih ve adım kaybolmaz.",
    lanes: [
      {
        id: "kurum",
        label: "Kurum",
        body: "Urząd, ZUS, vergi dairesi veya banka resmi talep gönderir — çoğu zaman Lehçe.",
      },
      {
        id: "pol-turk",
        label: "POL-TURK",
        body: "Yazıyı dilinizde özetleriz. Son tarihi ve sıradaki adımı netleştiririz. Dosyayı takip ederiz.",
      },
      {
        id: "siz",
        label: "Siz",
        body: "Kapsamı onaylarsınız. Belgeyi sağlarsınız. Karar ve imza sizde veya yetkili ortağınızda kalır.",
      },
    ],
    lawyerNote:
      "Hukuki tavsiye, temsil ve tescil avukat ortağındadır. POL-TURK bu hatta girmez.",
  },
  audiences: {
    eyebrow: "Kim için",
    title: "Hizmet hatları",
    intro:
      "Kurumsal yatırım, yereldeki işletme, eğitim idaresi ve şahıs urzęd işleri aynı operasyon standardında yürütülür: yazılı kapsam, dil köprüsü, takip, yetkili ortağa koordinasyon.",
    items: [
      {
        id: "yatirimci",
        icon: "Building2",
        title: "Türkiye’den yatırım ve şirket kuruluşu",
        body: "Türkiye merkezli işletmecilerin Polonya’daki yatırım, sp. z o.o. / şube / faaliyet açılışı ve ilk yıl idaresinde danışmanlık. Süreç haritası, evrak hazırlığı ve avukat–noter–KRS akışına ön ayak oluruz; tescil kararı mercide ve avukat ortağındadır.",
        points: [
          "Karar öncesi: yapı seçeneklerinin idari yükü, sıra, merkez ofis checklist’i",
          "Kuruluş dönemi: avukat ortağı randevusu, eksik evrak, KRS sonrası NIP/REGON/VAT-UE/banka takibi",
          "Faaliyet: kurum yazısı özeti, merkez–Polonya köprüsü, vekaletli idari yürütme",
        ],
        ctaLabel: "Yatırım ve kuruluş danışmanlığı",
        href: "/hizmetler/kurulum",
      },
      {
        id: "isletme",
        icon: "Store",
        title: "Polonya’daki işletmeler (KOBİ / JDG)",
        body: "Yerelde faaliyet gösteren Türk işletmeleri: gastronomi, lojistik, toptan, inşaat. Kurum yazışması, faaliyet evrakı ve muhasebe–avukat koordinasyonu.",
        points: [
          "US / ZUS / KRS ve belediye yazılarının özeti ve son tarih takibi",
          "Lojistik ve saha faaliyetinde randevu / evrak koordinasyonu",
          "Muhasebeye operasyon notu; hukuki dosyada avukat ortağına iletim",
        ],
        ctaLabel: "Kurumsal işletme masası",
        href: "/hizmetler/isletme",
      },
      {
        id: "egitim",
        icon: "GraduationCap",
        title: "Yükseköğretim ve eğitim idaresi",
        body: "Üniversite ve eğitim kurumlarına bağlı idari süreç: evrak düzeni, kurum yazısı özeti, aile–aday–kurum dil köprüsü. Kabul veya vize taahhüdü yoktur.",
        points: [
          "Başvuru ve kayıt evrak listesi",
          "Kurum ve yurt yazışmalarının dilde açıklaması",
          "Aday, veli veya eğitim birimi için aynı raporlama standardı",
        ],
        ctaLabel: "Eğitim idari yönlendirme",
        href: "/hizmetler/egitim",
      },
      {
        id: "sahis",
        icon: "User",
        title: "Şahıs — Polonya’daki Türk vatandaşları",
        body: "Devlet daireleri, oturum kartı, ehliyet ve evrak takibi. Uzaktan, telefonla veya yerinde eşlik. Kurum kararı taahhüt edilmez.",
        points: [
          "Yabancı ehliyetin Polonya ehliyetine çevrilmesi: adımlar, evrak, randevu",
          "Oturum kartı / pobyt: yazı özeti, eksik belge, durum raporu",
          "Çeviri ihtiyacı: dil köprüsü ve yeminli tercümana yönlendirme",
        ],
        ctaLabel: "Şahıs idari hizmetler",
        href: "/hizmetler/eslik#sahis",
      },
    ],
  },
  fieldSupport: {
    eyebrow: "Yerinde eşlik",
    title: "Firma ve şahıs — kurumlar arası idare",
    intro:
      "Yazı paketlerinin yanında: urzęd, banka, PESEL, ehliyet, oturum. Yazılı paketler veya yerinde eşlik için iletişim formu. Diller: TR / PL / EN / RU / UK.",
    items: [
      {
        id: "eslik-firma",
        icon: "Building2",
        title: "Firma / şirket",
        body: "KOBİ ve yatırım kuruluşu işyeri: banka KYC, US/ZUS/KRS, lojistik / faaliyet evrakı, çalışan dosyasında işveren tarafı.",
        points: [
          "Şirket hesabı / KYC ve kurum ziyareti koordinasyonu",
          "Lojistik ve saha faaliyetinde yazı / randevu masası",
          "İstenirse ofiste / bankada / urzędde fiziksel eşlik",
        ],
        ctaLabel: "Firma eşlik detayı",
        href: "/hizmetler/eslik#firma",
      },
      {
        id: "eslik-sahis",
        icon: "User",
        title: "Şahıs / bireysel",
        body: "Polonya’daki Türkler: urzęd, PESEL, ehliyet çevirisi, oturum kartı, sağlık raporu, kişisel banka — uzaktan, telefon veya yerinde.",
        points: [
          "Ehliyet / oturum kartı: checklist, randevu, durum takibi (karar mercidedir)",
          "Telefon ve uzaktan bilgi: ne isteniyor, sıradaki adım",
          "İstenirse birebir eşlik; TR / PL / EN / RU / UK dil köprüsü",
        ],
        ctaLabel: "Şahıs eşlik detayı",
        href: "/hizmetler/eslik#sahis",
      },
    ],
    disclaimer:
      "Hesap açılışı, PESEL, ehliyet veya sağlık sonucu taahhüt edilmez. Hukuki temsil avukat ortağındadır.",
    hubCta: "Yerinde eşlik sayfası",
    hubHref: "/hizmetler/eslik",
  },
  categories: {
    eyebrow: "Hizmet alanları",
    title: "Kurumsal hizmet alanları",
    intro:
      "Ücretli paketler (yazı + yerinde eşlik) ile yatırım/kuruluş danışmanlığı, işletme masası, eğitim idaresi ve şahıs urzęd hattı. Tümü idari danışmanlıktır; hukuki tavsiye, tescil ve vergi imzası dahil değildir.",
    items: [
      {
        id: "yazi-ozeti",
        icon: "FileText",
        title: "Resmi yazı özeti",
        body: "Tek kurum yazısı: dilde açıklama (iletişim TR / PL / EN / RU / UK), son tarih, kim ne yapar.",
        packageSlug: "tek-yazi",
        href: "/hizmetler/tek-yazi",
        ctaLabel: "Tek yazı",
        badge: "Paket",
      },
      {
        id: "evrak-takip",
        icon: "Mail",
        title: "Evrak ve idari takip",
        body: "Ay boyunca gelen yazılar; Stripe abonelik (otomatik yenileme). Dönem ücreti yazı gelmese de alınır. Dosya sayfası / İş masası; aşım net.",
        packageSlug: "aylik-paket",
        href: "/hizmetler/aylik-paket",
        ctaLabel: "Aylık abonelik",
        badge: "Paket",
      },
      {
        id: "vekaletli",
        icon: "FileSignature",
        title: "Vekaletli idari yürütme",
        body: "Noter idari vekaletiyle evrak ve randevu koordinasyonu; avukat ücreti ayrı. Kuruluş ve yoğun dönem için.",
        packageSlug: "surec-yonetimi",
        href: "/hizmetler/surec-yonetimi",
        ctaLabel: "Vekaletli paket",
        badge: "Paket",
      },
      {
        id: "surec-yonlendirme",
        icon: "Map",
        title: "Yatırım, kuruluş ve süreç danışmanlığı",
        body: "Türkiye’deki işletmecilerin Polonya’daki şirket kuruluşu ve faaliyet açılışı: evrak sırası, avukat–noter akışına hazırlık, kayıt sonrası idare. Tescili sizin adınıza yapmayız.",
        href: "/hizmetler/kurulum",
        ctaLabel: "Kuruluş danışmanlığı",
        badge: "Görüşme",
      },
      {
        id: "sahis-idari",
        icon: "User",
        title: "Şahıs — urzęd, ehliyet, oturum",
        body: "Polonya’daki Türkler: evrak takibi, ehliyet çevirisi ve oturum kartı süreci. Onay garantisi yok.",
        href: "/hizmetler/eslik#sahis",
        ctaLabel: "Şahıs hattı",
        badge: "Görüşme",
      },
      {
        id: "egitim-yonlendirme",
        icon: "GraduationCap",
        title: "Üniversite / eğitim yönlendirme",
        body: "Eğitim sürecinde dokümantasyon düzeni, süreç haritası ve kurum yazı takibi — kurumsal bilgilendirme.",
        href: "/hizmetler/egitim",
        ctaLabel: "Eğitim sayfası",
        badge: "Görüşme",
      },
    ],
  },
  packages: {
    eyebrow: "Paketler",
    title: "Sipariş edilebilir paketler",
    intro:
      "Dört paket: Tek yazı, Aylık takip (abonelik), Vekaletli yürütme (abonelik), Yerinde eşlik. Aylık paketler karttan otomatik yenilenir. Ödeme sonrası dosya açılır.",
    applyLabel: "Başvur",
    detailLabel: "Detay",
    featuredStory: {
      title: "Ay boyunca",
      steps: [
        "Gelen resmi yazı dilinizde özetlenir",
        "Son tarih ve sıradaki adım netleşir",
        "Dosya sayfanızdan takip edilir",
      ],
    },
  },
  process: {
    eyebrow: "Nasıl işler",
    title: "İki yol — paket veya görüşme",
    intro:
      "Elinizde kurum yazısı varsa yazı paketini alın. Yerinde eşlik (ofis / banka / urząd) ayrı paket olarak siteden alınır — şehir zorunlu; şehir dışı ulaşım ayrıca. Telefon görüşmesi şu an sunulmuyor.",
    paidPathTitle: "Ücretli paketlerde dört adım",
    steps: [
      {
        title: "Paketi seçin",
        body: "Yazı paketlerinde resmi yazıyı (PDF / fotoğraf) ekleyin. Yerinde eşlikte şehir ve kısa brifing yeter.",
      },
      {
        title: "Ödeme",
        body: "Stripe ile ödeme. Sonra özel dosya linkiniz e-postanıza gelir.",
      },
      {
        title: "Açıklama + takip",
        body: "Ne istendi, son tarih, sıradaki adım — dilinizde. Gerekirse avukat ortağına köprü.",
      },
      {
        title: "Sonuç",
        body: "Hazır özeti dosya sayfanızdan indirirsiniz. Mail eki yok; link aynı kalır.",
      },
    ],
    consultPathTitle: "Yerinde eşlik (ofis / banka / urząd)",
    consultPathBody:
      "Yarı gün paket: 450 zł, 1 kurum / 1 randevu. Polonya geneli taban ücret; şehir dışı ulaşım ayrıca netleştirilir. Onay veya süre garantisi yoktur. Yoğun idari dönem için vekaletli paket ayrıdır.",
    consultSteps: [
      {
        title: "Paketi seçin",
        body: "Başvuruda Yerinde eşlik; şehir ve ziyaret konusu yazın.",
      },
      {
        title: "Ödeme",
        body: "450 zł yarı gün — Stripe. Operatör randevuyu teyit eder.",
      },
      {
        title: "Eşlik günü",
        body: "Ofis / banka / urząd’da dil köprüsü; hukuki temsil değildir.",
      },
      {
        title: "Durum notu",
        body: "Ne oldu, sıradaki adım — dosya sayfanızda.",
      },
    ],
    ctaPackage: "Paketlere git",
    ctaConsult: "Yerinde eşlik başvurusu",
  },
  cases: {
    eyebrow: "Örnek durumlar",
    title: "Sık gelen işler",
    intro: "Sonuç veya hukuki karar garantisi değildir.",
    tabs: [
      {
        id: "us-zus",
        label: "US / ZUS yazısı",
        title: "Vergi veya ZUS yazısı geldi",
        bullets: [
          "Yazıyı yükleyin (tek yazı veya aylık paket)",
          "Özet: ne isteniyor, son tarih, ekler",
          "Muhasebeciye iletilecek net not",
          "Hukuk gerekirse avukat ortağına yönlendirme",
        ],
        ctaLabel: "Tek yazı / aylık paket",
        href: "/hizmetler#paketler",
      },
      {
        id: "krs",
        label: "KRS / şirket",
        title: "KRS veya şirket değişikliği",
        bullets: [
          "Adres, yönetim, sermaye — evrak sırası bilgilendirmesi",
          "Noter / kurum randevu koordinasyonu (vekaletli pakette)",
          "Durum takibi dilinizde",
          "Karar ve imza avukat / yetkilide",
        ],
        ctaLabel: "Vekaletli paket",
        href: "/hizmetler/surec-yonetimi",
      },
      {
        id: "calisan",
        label: "Çalışan oturum",
        title: "İşveren tarafı — oturum dosyası",
        bullets: [
          "İşveren tarafı evrak checklist’i (tek yazı veya aylık takip)",
          "Eksik evrak kontrolü",
          "Rehber: kurum yazısı, paket seçimi, kuruluş, şahıs, MOS",
          "Hukuki temsil avukat ortağında",
        ],
        ctaLabel: "İşletme hizmetleri",
        href: "/hizmetler/isletme",
      },
      {
        id: "kurulum",
        label: "Yatırım / kuruluş",
        title: "Türkiye’den Polonya’ya şirket ve faaliyet",
        bullets: [
          "Karar öncesi idari sıra ve merkez ofis evrak listesi",
          "Avukat ortağı ve noter akışına hazırlık; KRS sonrası NIP / REGON / VAT-UE / banka takibi",
          "İlk 90 gün kurum yazılarının özeti ve merkez–Polonya köprüsü",
          "Tescil ve hukuki sonuç taahhüdü yoktur",
        ],
        ctaLabel: "Kuruluş danışmanlığı",
        href: "/hizmetler/kurulum",
      },
      {
        id: "egitim",
        label: "Üniversite",
        title: "Üniversite / eğitim yazışması",
        bullets: [
          "Kurum yazısını yükleyin veya görüşme formu",
          "Ne isteniyor, son tarih, eksik evrak",
          "Aile / aday / kurum arasında dil köprüsü",
          "Kabul veya vize garantisi yok",
        ],
        ctaLabel: "Eğitim yönlendirmesi",
        href: "/hizmetler/egitim",
      },
      {
        id: "eslik",
        label: "Yerinde eşlik",
        title: "Ehliyet, oturum, urzęd — şahıs",
        bullets: [
          "Firma veya şahıs hattı",
          "Ehliyet çevirisi / oturum kartı: checklist, randevu, durum takibi",
          "Uzaktan, telefon veya istenirse yerinde; TR / PL / EN / RU / UK",
          "Onay / kart / ehliyet sonucu garantisi yok",
        ],
        ctaLabel: "Eşlik hizmeti",
        href: "/hizmetler/eslik",
      },
    ],
  },
  scope: {
    eyebrow: "Sınırlar",
    title: "Ne yapıyoruz / ne yapmıyoruz",
    includedTitle: "Yaptığımız",
    excludedTitle: "Yapmadığımız",
    included: [
      "Türkiye’deki girişimci ve şirketler için Polonya’da evrak ve idari süreç takibi",
      "Resmi yazının dilde özeti; iletişim TR / PL / EN / RU / UK",
      "Türkiye’deki işletmeciler: Polonya yatırım, şirket kuruluşu ve faaliyet — idari danışmanlık ve süreç başlatma (tescil bizde değil)",
      "Son tarih ve sıradaki adımın net tutulması",
      "Eğitim / üniversite sürecinde idari yönlendirme",
      "KOBİ ve lojistik faaliyet evrakı takibi; avukat ortağına köprü",
      "Şahıs: urzęd, ehliyet çevirisi, oturum kartı durumu — uzaktan / telefon / yerinde",
      "Yerinde eşlik (istenirse fiziksel danışman)",
      "Evrak / randevu koordinasyonu (vekaletli pakette)",
      "Avukat ortağı ve muhasebeci ile köprü",
      "Ödeme sonrası dosya sayfası / İş masası’nda güncel durum",
    ],
    excluded: [
      "Şirketi sizin adınıza tescil etmek; KRS / vergi kararı almak",
      "Avukatlık, hukuki tavsiye ve dava",
      "Üniversite kabulü, burs veya vize / oturum garantisi",
      "Banka hesabı, PESEL, ehliyet veya sağlık sonucu garantisi",
      "Muhasebe ve vergi beyanı / imza",
      "Onay veya süre garantisi",
      "MOS / urząd form otomasyonu",
      "Kendimizi avukat, eğitim aracısı veya yeminli tercüman olarak sunmak",
    ],
  },
  faq: faqTr,
  lead: {
    title: "İletişim",
    intro:
      "İdari takip veya paket için yazın. Acil yazı: üst menüden Başvur. Dönüş genelde bir iş günü.",
    fullName: "Ad Soyad",
    company: "Şirket / unvan (isteğe bağlı)",
    employees: "Çalışan sayısı (isteğe bağlı)",
    email: "E-posta",
    phone: "Telefon",
    process: "İlgilendiğiniz hizmet",
    processOptions: [
      {
        value: "ticaret-masasi",
        label: "Ticaret danışmanlığı — Polonya",
      },
      { value: "tek-yazi", label: "Tek yazı özeti" },
      { value: "aylik-paket", label: "Aylık idari takip" },
      { value: "surec-yonetimi", label: "Vekaletli idari yürütme" },
      { value: "yatirimci", label: "TR işletmeci — Polonya yatırım / şirket kuruluşu" },
      { value: "isletme", label: "KOBİ / lojistik — evrak ve faaliyet masası" },
      {
        value: "egitim",
        label: "Üniversite / eğitim süreç yönlendirme",
      },
      { value: "eslik-firma", label: "Firma — urzęd / yerinde eşlik" },
      { value: "eslik-sahis", label: "Şahıs — ehliyet, oturum, urzęd" },
      { value: "diger", label: "Diğer / emin değilim" },
    ],
    privacy: "Kişisel verilerimin iletişim amacıyla işlenmesini kabul ediyorum.",
    submit: "Gönder",
    loading: "Gönderiliyor…",
    success:
      "Talebiniz alındı. Ekibimiz e-posta ile dönüş yapacak (genelde 1 iş günü).",
    error: "Gönderilemedi. Lütfen tekrar deneyin.",
    fieldError: "Bu alanı kontrol edin.",
    modalTitle: "İletişim / ön görüşme",
    close: "Kapat",
  },
  trust: {
    title: "Güven",
    badges: [
      "Avukat değiliz",
      "RODO / gizlilik",
      "Stripe ödeme",
      "Dosya linki (mail eki yok)",
    ],
  },
  footer: {
    disclaimer:
      "POL-TURK avukatlık veya mali müşavirlik değildir. Hukuki tavsiye ve temsil Polonyalı avukat ortağındadır. Onay veya süre garantisi vermeyiz.",
    privacy: "Gizlilik",
    rights: "© POL-TURK. Tüm hakları saklıdır.",
    servicesHub: "Tüm hizmetler",
    about: "Hakkımızda",
    apply: "Başvur",
    accompaniment: "Yerinde eşlik",
    advisory: "Danışmanlık",
    formation: "Yatırım / kuruluş",
    business: "İşletme hizmetleri",
    education: "Eğitim süreçleri",
    packages: "Paketler",
    guide: "Rehber",
    faq: "SSS",
    groupServices: "Hizmetler",
    groupBuy: "Başvuru",
    groupSite: "Site",
  },
};

export const landingPl: LandingContent = {
  ...landingTr,
  meta: {
    title: "POL-TURK | Tracking administracyjny w PL — z Turcji",
    description:
      "Dla przedsiębiorców i firm z Turcji: pisma, dokumenty i procesy administracyjne w Polsce. Streszczenie w Waszym języku. Jasny kolejny krok. Dodatkowo doradztwo handlowe.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "Tracking administracyjny w Polsce",
    secondName: "POL-TURK",
    secondLineHint: "Turcja · Polska",
  },
  nav: [
    { id: "hizmetler", label: "Usługi", href: "/hizmetler" },
    { id: "paketler", label: "Pakiety", href: "/hizmetler#paketler" },
    { id: "danismanlik", label: "Doradztwo", href: "/danismanlik" },
    { id: "hakkimizda", label: "O nas", href: "/hakkimizda" },
    { id: "rehber", label: "Przewodnik", href: "/rehber" },
    { id: "sss", label: "FAQ", href: "#sss" },
    { id: "iletisim", label: "Kontakt", href: "#iletisim" },
  ],
  headerCta: "Złóż wniosek",
  accountLink: "Logowanie",
  hero: {
    eyebrow: "Turcja · Polska",
    title: "Sprawy administracyjne w PL — w jednym miejscu.",
    subtitle:
      "Streszczamy pisma urzędowe w Waszym języku. Termin i kolejny krok pozostają jasne. Tracking dokumentów u nas. Decyzja u Państwa.",
    valueLine:
      "Nie jesteśmy kancelarią. Wpis i reprezentacja u adwokata-partnera. Doradztwo handlowe to osobna linia usług.",
    ctaPrimary: "Zobacz pakiety",
    ctaPrimaryHref: "/hizmetler#paketler",
    ctaSecondary: "Doradztwo handlowe",
    ctaSecondaryHref: "/danismanlik",
    supportTrack: {
      kicker: "Linia usług",
      title: "Doradztwo handlowe",
      body: "Widoczność rynku, mapa kontrahentów, spotkania i zestawienie ofert. Osobno od trackingu administracyjnego.",
      ctaLabel: "Zobacz",
      href: "/danismanlik",
    },
    demo: heroDemoPl,
  },
  bridge: {
    eyebrow: "Jak to działa",
    title: "Instytucja pisze. My śledzimy. Państwo decydujecie.",
    intro:
      "Teczka administracyjna w PL zbiera się w jednym miejscu. Język, termin i krok nie giną.",
    lanes: [
      {
        id: "kurum",
        label: "Instytucja",
        body: "Urząd, ZUS, urząd skarbowy lub bank wysyła oficjalne wezwanie — zwykle po polsku.",
      },
      {
        id: "pol-turk",
        label: "POL-TURK",
        body: "Streszczamy pismo w Waszym języku. Ujasniamy termin i kolejny krok. Prowadzimy teczkę.",
      },
      {
        id: "siz",
        label: "Państwo",
        body: "Zatwierdzacie zakres. Dostarczacie dokumenty. Decyzja i podpis zostają u Państwa lub u uprawnionego partnera.",
      },
    ],
    lawyerNote:
      "Porada prawna, reprezentacja i wpis pozostają u adwokata-partnera. POL-TURK w tę linię nie wchodzi.",
  },
  audiences: {
    eyebrow: "Dla kogo",
    title: "Linie usług",
    intro:
      "Inwestycja korporacyjna, lokalna działalność, administracja edukacyjna i sprawy urzędowe osób — ten sam standard operacyjny: zakres na piśmie, most językowy, tracking, koordynacja z partnerem uprawnionym.",
    items: [
      {
        id: "yatirimci",
        icon: "Building2",
        title: "Inwestycja i założenie spółki z Turcji",
        body: "Podmioty z Turcji: inwestycja w Polsce, sp. z o.o. / oddział / działalność oraz pierwszy rok administracji. Mapa procesu, przygotowanie teczki i inicjacja ścieżki adwokat–notariusz–KRS. Decyzja wpisu pozostaje u urzędu i adwokata-partnera.",
        points: [
          "Przed decyzją: obciążenie administracyjne struktur, kolejność, checklist centrali",
          "Okres założenia: wizyta u adwokata-partnera, braki dokumentów, po KRS: NIP/REGON/VAT-UE/bank",
          "Działalność: streszczenia pism, most centrala–Polska, prowadzenie z POA",
        ],
        ctaLabel: "Doradztwo inwestycyjne i założenie",
        href: "/hizmetler/kurulum",
      },
      {
        id: "isletme",
        icon: "Store",
        title: "Tureckie MŚP / JDG w PL",
        body: "Gastronomia, logistyka / transport, hurt, budowa — US/ZUS/KRS i dokumenty działalności; most do adwokata-partnera.",
        points: [
          "Pismo: żądanie, termin",
          "Logistyka / teren — pisma i wizyty",
          "Notatka do księgowego; prawo u adwokata-partnera (nie my doradzamy)",
        ],
        ctaLabel: "Usługi dla firm",
        href: "/hizmetler/isletme",
      },
      {
        id: "egitim",
        icon: "GraduationCap",
        title: "Uczelnia i procesy edukacyjne",
        body: "Guidance administracyjny przy rekrutacji i korespondencji uczelni. Most językowy rodzina–instytucja. Bez gwarancji przyjęcia.",
        points: [
          "Checklist dokumentów",
          "Streszczenie pism uczelni / akademika",
          "Dla kandydata, rodziny lub jednostki edukacyjnej",
        ],
        ctaLabel: "Guidance edukacyjny",
        href: "/hizmetler/egitim",
      },
      {
        id: "sahis",
        icon: "User",
        title: "Turcy w PL — osoby prywatne",
        body: "Urzędy: tracking dokumentów, informacja zdalna / telefoniczna, karta pobytu i prawo jazdy. Bez gwarancji decyzji.",
        points: [
          "Wymiana prawa jazdy na polskie — kroki, dokumenty, wizyta (decyzja urzędu)",
          "Karta pobytu: streszczenie pism, braki, status",
          "Tłumaczenia: most językowy; przysięgły — kierujemy, nie wykonujemy",
        ],
        ctaLabel: "Wsparcie dla osób",
        href: "/hizmetler/eslik#sahis",
      },
    ],
  },
  fieldSupport: {
    eyebrow: "Towarzyszenie na miejscu",
    title: "Wsparcie urzędowe dla firm i osób",
    intro:
      "Obok pakietów: urzędy, bank, PESEL, prawo jazdy. Pakiety pisemne i towarzyszenie na miejscu — formularz kontaktowy. Języki: TR / PL / EN / RU / UK.",
    items: [
      {
        id: "eslik-firma",
        icon: "Building2",
        title: "Firma / spółka",
        body: "MŚP i spółki z inwestycji TR: KYC, US/ZUS/KRS, dokumenty logistyki, strona pracodawcy.",
        points: [
          "Konto firmowe / KYC i wizyty",
          "Logistyka — pisma i terminy",
          "Opcjonalnie towarzyszenie w urzędzie / banku",
        ],
        ctaLabel: "Towarzyszenie — firma",
        href: "/hizmetler/eslik#firma",
      },
      {
        id: "eslik-sahis",
        icon: "User",
        title: "Osoba prywatna",
        body: "Turcy w PL: urząd, PESEL, wymiana prawa jazdy, karta pobytu — zdalnie, telefon lub na miejscu.",
        points: [
          "Prawo jazdy / karta pobytu: checklist, wizyta, status (decyzja urzędu)",
          "Informacja telefoniczna i zdalna",
          "Opcjonalnie towarzyszenie; TR / PL / EN / RU / UK",
        ],
        ctaLabel: "Towarzyszenie — osoba",
        href: "/hizmetler/eslik#sahis",
      },
    ],
    disclaimer:
      "Bez gwarancji konta, PESEL, prawa jazdy ani orzeczenia. Prawo u adwokata-partnera.",
    hubCta: "Strona towarzyszenia",
    hubHref: "/hizmetler/eslik",
  },
  categories: {
    eyebrow: "Obszary",
    title: "Korporacyjne obszary usług",
    intro:
      "Trzy pakiety płatne oraz doradztwo inwestycyjne/założenie, biurko firmy, administracja edukacyjna i linia urzędowa osób. Całość to doradztwo administracyjne — bez porad prawnych, wpisu KRS i podpisu podatkowego.",
    items: [
      {
        id: "yazi-ozeti",
        icon: "FileText",
        title: "Streszczenie pisma",
        body: "Jedno pismo: wyjaśnienie PL / EN / TR, termin, kto co robi.",
        packageSlug: "tek-yazi",
        href: "/hizmetler/tek-yazi",
        ctaLabel: "Jedno pismo",
        badge: "Pakiet",
      },
      {
        id: "evrak-takip",
        icon: "Mail",
        title: "Tracking administracyjny",
        body: "Pisma w miesiącu; abonament Stripe (odnowienie automatyczne). Opłata okresowa także bez pism. Status na stronie sprawy / Koncie; overage jasny.",
        packageSlug: "aylik-paket",
        href: "/hizmetler/aylik-paket",
        ctaLabel: "Abonament miesięczny",
        badge: "Pakiet",
      },
      {
        id: "vekaletli",
        icon: "FileSignature",
        title: "Prowadzenie z pełnomocnictwem",
        body: "Koordynacja dokumentów i wizyt z pełnomocnictwem notarialnym. Rejestracja i okres intensywny.",
        packageSlug: "surec-yonetimi",
        href: "/hizmetler/surec-yonetimi",
        ctaLabel: "Pakiet z POA",
        badge: "Pakiet",
      },
      {
        id: "surec-yonlendirme",
        icon: "Map",
        title: "Inwestycja, założenie i doradztwo procesowe",
        body: "Przedsiębiorcy z Turcji: założenie spółki i uruchomienie działalności w PL — kolejność dokumentów, przygotowanie ścieżki adwokat–notariusz, administracja po wpisie. Nie wpisujemy spółki za Państwa.",
        href: "/hizmetler/kurulum",
        ctaLabel: "Doradztwo założenia",
        badge: "Konsultacja",
      },
      {
        id: "sahis-idari",
        icon: "User",
        title: "Osoby — urząd, prawo jazdy, pobyt",
        body: "Turcy w PL: tracking dokumentów, wymiana prawa jazdy, karta pobytu. Bez gwarancji decyzji.",
        href: "/hizmetler/eslik#sahis",
        ctaLabel: "Linia osób",
        badge: "Konsultacja",
      },
      {
        id: "egitim-yonlendirme",
        icon: "GraduationCap",
        title: "Guidance uczelniany / edukacyjny",
        body: "Porządek dokumentacji i mapa procesu przy ścieżkach edukacyjnych.",
        href: "/hizmetler/egitim",
        ctaLabel: "Strona edukacji",
        badge: "Konsultacja",
      },
    ],
  },
  packages: {
    eyebrow: "Pakiety",
    title: "Pakiety do zamówienia",
    intro:
      "Cztery pakiety: Jedno pismo, Opieka miesięczna (abonament), Prowadzenie z POA (abonament), Towarzyszenie na miejscu. Pakiety miesięczne odnawiają się kartą automatycznie. Po płatności otwiera się sprawa.",
    applyLabel: "Złóż wniosek",
    detailLabel: "Szczegóły",
    featuredStory: {
      title: "W ciągu miesiąca",
      steps: [
        "Pismo streszczane w Waszym języku",
        "Termin i kolejny krok jasne",
        "Śledzenie na stronie sprawy",
      ],
    },
  },
  process: {
    eyebrow: "Jak działa",
    title: "Dwie ścieżki — pakiet lub wizyta",
    intro:
      "Macie pismo — pakiet pisemny. Towarzyszenie na miejscu (urząd / bank / biuro) to osobny pakiet na stronie — miasto obowiązkowe; dojazd poza miastem osobno. Konsultacja telefoniczna nie jest obecnie dostępna.",
    paidPathTitle: "Cztery kroki w pakietach płatnych",
    steps: [
      {
        title: "Wybierzcie pakiet",
        body: "Przy pismach — PDF / zdjęcie. Przy towarzyszeniu — miasto i krótki briefing.",
      },
      {
        title: "Płatność",
        body: "Stripe. Link do sprawy na e-mail.",
      },
      {
        title: "Wyjaśnienie + tracking",
        body: "Czego żądają, termin, kolejny krok — w Waszym języku.",
      },
      {
        title: "Wynik",
        body: "Pobieracie ze strony sprawy. Bez załącznika w mailu.",
      },
    ],
    consultPathTitle: "Towarzyszenie na miejscu (urząd / bank)",
    consultPathBody:
      "Pakiet pół dnia: 450 zł, 1 urząd / 1 wizyta. Stawka bazowa na całą Polskę; dojazd poza miastem osobno. Bez gwarancji decyzji. Intensywny okres administracyjny — osobny pakiet z POA.",
    consultSteps: [
      {
        title: "Wybierzcie pakiet",
        body: "We wniosku: Towarzyszenie na miejscu; miasto i cel wizyty.",
      },
      {
        title: "Płatność",
        body: "450 zł pół dnia — Stripe. Operator potwierdza termin.",
      },
      {
        title: "Dzień wizyty",
        body: "Most językowy w urzędzie / banku / biurze; to nie reprezentacja prawna.",
      },
      {
        title: "Notatka",
        body: "Co się stało, co dalej — na stronie sprawy.",
      },
    ],
    ctaPackage: "Do pakietów",
    ctaConsult: "Wniosek — towarzyszenie",
  },
  cases: {
    eyebrow: "Przykłady",
    title: "Typowe sprawy",
    intro: "Bez gwarancji decyzji urzędu ani wyniku prawnego.",
    tabs: [
      {
        id: "us-zus",
        label: "US / ZUS",
        title: "Pismo US lub ZUS",
        bullets: [
          "Wgrajcie pismo (jedno pismo lub pakiet miesięczny)",
          "Streszczenie: żądanie, termin, załączniki",
          "Notatka do księgowego",
          "W razie potrzeby most do adwokata",
        ],
        ctaLabel: "Pakiety",
        href: "/hizmetler#paketler",
      },
      {
        id: "krs",
        label: "KRS",
        title: "Zmiany KRS / spółki",
        bullets: [
          "Kolejność dokumentów",
          "Koordynacja wizyt (pakiet z POA)",
          "Status w Waszym języku",
          "Decyzja u adwokata / uprawnionego",
        ],
        ctaLabel: "Pakiet z POA",
        href: "/hizmetler/surec-yonetimi",
      },
      {
        id: "calisan",
        label: "Pobyt pracownika",
        title: "Strona pracodawcy",
        bullets: [
          "Checklist pracodawcy (jedno pismo / opieka miesięczna)",
          "Kontrola braków",
          "Przewodnik: pismo, pakiety, założenie, osoba, MOS",
          "Reprezentacja u adwokata",
        ],
        ctaLabel: "Usługi dla firm",
        href: "/hizmetler/isletme",
      },
      {
        id: "kurulum",
        label: "Inwestycja / założenie",
        title: "Z Turcji do Polski — spółka i działalność",
        bullets: [
          "Przed decyzją: kolejność administracyjna i lista dokumentów centrali",
          "Przygotowanie ścieżki adwokat–notariusz; po KRS: NIP / REGON / VAT-UE / bank",
          "Pierwsze 90 dni: streszczenia pism i most centrala–Polska",
          "Bez gwarancji wpisu ani wyniku prawnego",
        ],
        ctaLabel: "Doradztwo założenia",
        href: "/hizmetler/kurulum",
      },
      {
        id: "egitim",
        label: "Uczelnia",
        title: "Korespondencja uczelniana / edukacyjna",
        bullets: [
          "Wgrajcie pismo lub formularz konsultacji",
          "Żądanie, termin, braki dokumentów",
          "Most językowy rodzina / kandydat / instytucja",
          "Bez gwarancji przyjęcia ani wizy",
        ],
        ctaLabel: "Guidance edukacyjny",
        href: "/hizmetler/egitim",
      },
      {
        id: "eslik",
        label: "Towarzyszenie",
        title: "Prawo jazdy, pobyt, urząd — osoby",
        bullets: [
          "Linia firma lub osoba",
          "Wymiana prawa jazdy / karta pobytu: checklist, wizyta, status",
          "Zdalnie, telefon lub na miejscu; TR / PL / EN / RU / UK",
          "Bez gwarancji karty / prawa jazdy / decyzji",
        ],
        ctaLabel: "Towarzyszenie",
        href: "/hizmetler/eslik",
      },
    ],
  },
  scope: {
    eyebrow: "Granice",
    title: "Co robimy / czego nie",
    includedTitle: "Robimy",
    excludedTitle: "Nie robimy",
    included: [
      "Streszczenie pism; kontakt TR / PL / EN / RU / UK",
      "Przedsiębiorcy z TR: inwestycja, założenie spółki i działalność w PL — doradztwo administracyjne i inicjacja procesu (wpis KRS nie u nas)",
      "Termin i kolejny krok",
      "Guidance administracyjny przy procesie edukacyjnym / uczelni",
      "MŚP i logistyka — tracking pism; most do adwokata-partnera",
      "Osoby: urząd, wymiana prawa jazdy, karta pobytu — zdalnie / telefon / na miejscu",
      "Towarzyszenie na życzenie",
      "Koordynacja dokumentów / wizyt (z POA)",
      "Most do adwokata i księgowego",
      "Po płatności status na stronie sprawy / Koncie",
    ],
    excluded: [
      "Wpis spółki za Państwa; decyzja KRS / podatkowa",
      "Porady prawne i procesy sądowe",
      "Gwarancja przyjęcia na uczelnię, stypendium lub wizy / pobytu",
      "Gwarancja konta, PESEL, prawa jazdy lub orzeczenia",
      "Księgowość i podpis podatkowy",
      "Gwarancja decyzji / terminu",
      "Automatyzacja formularzy MOS / urząd",
      "Podawanie się za adwokata / agencję edukacyjną / tłumacza przysięgłego",
    ],
  },
  faq: faqPl,
  lead: {
    title: "Kontakt",
    intro:
      "Tracking administracyjny lub pakiet: napiszcie. Pilne pismo: menu «Złóż wniosek». Odpowiedź zwykle w jeden dzień roboczy.",
    fullName: "Imię i nazwisko",
    company: "Firma / tytuł (opcjonalnie)",
    employees: "Liczba pracowników (opcjonalnie)",
    email: "E-mail",
    phone: "Telefon",
    process: "Usługa",
    processOptions: [
      {
        value: "ticaret-masasi",
        label: "Doradztwo handlowe — Polska",
      },
      { value: "tek-yazi", label: "Jedno pismo" },
      { value: "aylik-paket", label: "Opieka miesięczna" },
      { value: "surec-yonetimi", label: "Prowadzenie z pełnomocnictwem" },
      { value: "yatirimci", label: "Przedsiębiorca TR — inwestycja / założenie spółki w PL" },
      { value: "isletme", label: "MŚP / logistyka — dokumenty działalności" },
      { value: "egitim", label: "Uczelnia / guidance edukacyjny" },
      { value: "eslik-firma", label: "Firma — urząd / towarzyszenie" },
      { value: "eslik-sahis", label: "Osoba — prawo jazdy, pobyt, urząd" },
      { value: "diger", label: "Inne" },
    ],
    privacy: "Akceptuję przetwarzanie danych w celu kontaktu.",
    submit: "Wyślij",
    loading: "Wysyłanie…",
    success:
      "Otrzymaliśmy zgłoszenie. Odezwiemy się e-mailem (zwykle 1 dzień roboczy).",
    error: "Nie udało się. Spróbuj ponownie.",
    fieldError: "Sprawdź to pole.",
    modalTitle: "Kontakt",
    close: "Zamknij",
  },
  trust: {
    title: "Zaufanie",
    badges: [
      "Nie jesteśmy kancelarią",
      "RODO",
      "Płatność Stripe",
      "Link do sprawy (bez załącznika)",
    ],
  },
  footer: {
    disclaimer:
      "POL-TURK nie świadczy usług adwokackich ani księgowych. Porady prawne u polskiego partnera. Bez gwarancji decyzji.",
    privacy: "Prywatność",
    rights: "© POL-TURK. Wszelkie prawa zastrzeżone.",
    servicesHub: "Wszystkie usługi",
    about: "O nas",
    apply: "Złóż wniosek",
    accompaniment: "Towarzyszenie",
    advisory: "Doradztwo",
    formation: "Inwestycja / założenie",
    business: "Usługi dla firm",
    education: "Procesy edukacyjne",
    packages: "Pakiety",
    guide: "Przewodnik",
    faq: "FAQ",
    groupServices: "Usługi",
    groupBuy: "Wniosek",
    groupSite: "Serwis",
  },
};

export const landingEn: LandingContent = {
  ...landingTr,
  meta: {
    title: "POL-TURK | Poland admin tracking — from Turkey",
    description:
      "For Turkish entrepreneurs and companies: official letters, documents and admin process tracking in Poland. Summarised in your language. Clear next step. Also: trade advisory.",
  },
  brand: {
    name: "POL-TURK",
    tagline: "Poland admin tracking",
    secondName: "POL-TURK",
    secondLineHint: "Turkey · Poland",
  },
  nav: [
    { id: "hizmetler", label: "Services", href: "/hizmetler" },
    { id: "paketler", label: "Packages", href: "/hizmetler#paketler" },
    { id: "danismanlik", label: "Advisory", href: "/danismanlik" },
    { id: "hakkimizda", label: "About", href: "/hakkimizda" },
    { id: "rehber", label: "Guide", href: "/rehber" },
    { id: "sss", label: "FAQ", href: "#sss" },
    { id: "iletisim", label: "Contact", href: "#iletisim" },
  ],
  headerCta: "Apply",
  accountLink: "Sign in",
  hero: {
    eyebrow: "Turkey · Poland",
    title: "Poland admin, in one place.",
    subtitle:
      "We summarise official letters in your language. Deadlines and next steps stay clear. Document tracking with us. Decisions with you.",
    valueLine:
      "We are not a law firm. Registration and legal representation stay with the lawyer partner. Trade advisory is a separate service line.",
    ctaPrimary: "View packages",
    ctaPrimaryHref: "/hizmetler#paketler",
    ctaSecondary: "Trade advisory",
    ctaSecondaryHref: "/danismanlik",
    supportTrack: {
      kicker: "Service line",
      title: "Trade advisory",
      body: "Market visibility, counterparty mapping, meetings and quote compilation. Offered separately from admin tracking.",
      ctaLabel: "Explore",
      href: "/danismanlik",
    },
    demo: heroDemoEn,
  },
  bridge: {
    eyebrow: "How it works",
    title: "The authority writes. We track. You decide.",
    intro:
      "Poland admin files gather in one place. Language, deadline and next step do not get lost.",
    lanes: [
      {
        id: "kurum",
        label: "Authority",
        body: "An office, ZUS, tax office or bank sends an official request — usually in Polish.",
      },
      {
        id: "pol-turk",
        label: "POL-TURK",
        body: "We summarise the letter in your language. We clarify the deadline and next step. We keep the file moving.",
      },
      {
        id: "siz",
        label: "You",
        body: "You approve scope. You supply documents. Decisions and signatures stay with you or your authorised partner.",
      },
    ],
    lawyerNote:
      "Legal advice, representation and registration stay with the lawyer partner. POL-TURK does not enter that line.",
  },
  audiences: {
    eyebrow: "Who it’s for",
    title: "Service lines",
    intro:
      "Corporate investment, local operations, education administration and individual office matters run to the same operating standard: written scope, language bridge, tracking, coordination with the authorised partner.",
    items: [
      {
        id: "yatirimci",
        icon: "Building2",
        title: "Investment and company formation from Turkey",
        body: "Turkish operators investing in Poland: limited company / branch / activity and first-year administration. Process map, file preparation and initiation of the lawyer–notary–KRS track. Registration remains with the authority and the lawyer partner.",
        points: [
          "Pre-decision: administrative load of structures, sequence, HQ checklist",
          "Formation period: lawyer-partner appointment, document gaps, post-KRS NIP/REGON/VAT-UE/bank",
          "Operations: letter summaries, HQ–Poland bridge, admin execution under POA",
        ],
        ctaLabel: "Investment and formation advisory",
        href: "/hizmetler/kurulum",
      },
      {
        id: "isletme",
        icon: "Store",
        title: "Turkish SMEs / sole traders in PL",
        body: "Hospitality, logistics / transport, wholesale, construction — US/ZUS/KRS and activity papers; bridge to the lawyer partner.",
        points: [
          "What is requested and by when",
          "Logistics / field activity letters and appointments",
          "Clear note for the accountant; legal advice stays with the lawyer partner",
        ],
        ctaLabel: "Business services",
        href: "/hizmetler/isletme",
      },
      {
        id: "egitim",
        icon: "GraduationCap",
        title: "University & education processes",
        body: "Administrative guidance around higher-education correspondence: document order, letter summaries, family–institution language bridge. Not an admission guarantee.",
        points: [
          "Enrolment document checklist",
          "University / dorm letter explanation",
          "Same standard for applicants, families or education units",
        ],
        ctaLabel: "Education guidance",
        href: "/hizmetler/egitim",
      },
      {
        id: "sahis",
        icon: "User",
        title: "Turks in Poland — individuals",
        body: "Government offices: document tracking, remote / phone information, residence card and driving-licence processes. No decision guarantee.",
        points: [
          "Exchange to a Polish driving licence — steps, papers, appointment (decision is the office’s)",
          "Residence card: letter summary, missing papers, status tracking",
          "Translation need: language bridge; sworn translator referred, not performed by us",
        ],
        ctaLabel: "Individual admin support",
        href: "/hizmetler/eslik#sahis",
      },
    ],
  },
  fieldSupport: {
    eyebrow: "On-site accompaniment",
    title: "Inter-office support for companies and individuals",
    intro:
      "Alongside letter packages: offices, bank, PESEL, licence. Written packages and on-site accompaniment via the contact form. Languages: TR / PL / EN / RU / UK.",
    items: [
      {
        id: "eslik-firma",
        icon: "Building2",
        title: "Company",
        body: "SMEs and TR investment companies: bank KYC, US/ZUS/KRS, logistics paperwork, employer-side files.",
        points: [
          "Business account / KYC and office visits",
          "Logistics activity letters and appointments",
          "Optional accompaniment at the office / bank",
        ],
        ctaLabel: "Company accompaniment",
        href: "/hizmetler/eslik#firma",
      },
      {
        id: "eslik-sahis",
        icon: "User",
        title: "Individual",
        body: "Turks in Poland: offices, PESEL, licence exchange, residence card — remote, phone or on site.",
        points: [
          "Licence / residence card: checklist, appointment, status (decision is the office’s)",
          "Phone and remote information",
          "Optional accompaniment; TR / PL / EN / RU / UK",
        ],
        ctaLabel: "Individual accompaniment",
        href: "/hizmetler/eslik#sahis",
      },
    ],
    disclaimer:
      "No guarantee of account, PESEL, licence or medical outcome. Legal work stays with the lawyer partner.",
    hubCta: "Accompaniment page",
    hubHref: "/hizmetler/eslik",
  },
  categories: {
    eyebrow: "Service areas",
    title: "Corporate service areas",
    intro:
      "Three paid packages plus investment/formation advisory, the business desk, education administration and the individual office line. All of it is administrative advisory — not legal advice, KRS registration or a tax signature.",
    items: [
      {
        id: "yazi-ozeti",
        icon: "FileText",
        title: "Official letter summary",
        body: "One letter: PL / EN / TR explanation, deadline, who does what.",
        packageSlug: "tek-yazi",
        href: "/hizmetler/tek-yazi",
        ctaLabel: "Single letter",
        badge: "Package",
      },
      {
        id: "evrak-takip",
        icon: "Mail",
        title: "Document & admin tracking",
        body: "Letters through the month; Stripe subscription (auto-renew). Period fee applies even with no letters. Status on the case page / Account; clear overage.",
        packageSlug: "aylik-paket",
        href: "/hizmetler/aylik-paket",
        ctaLabel: "Monthly subscription",
        badge: "Package",
      },
      {
        id: "vekaletli",
        icon: "FileSignature",
        title: "Admin execution with POA",
        body: "Document and appointment coordination under notarial admin POA. Formation and intensive periods.",
        packageSlug: "surec-yonetimi",
        href: "/hizmetler/surec-yonetimi",
        ctaLabel: "POA package",
        badge: "Package",
      },
      {
        id: "surec-yonlendirme",
        icon: "Map",
        title: "Investment, formation and process advisory",
        body: "Turkish operators: Polish company formation and activity launch — document sequence, preparation of the lawyer–notary track, post-registration administration. We do not register the company in your name.",
        href: "/hizmetler/kurulum",
        ctaLabel: "Formation advisory",
        badge: "Consult",
      },
      {
        id: "sahis-idari",
        icon: "User",
        title: "Individuals — offices, licence, residence",
        body: "Turks in Poland: tracking, phone, licence exchange, residence card. No decision guarantee.",
        href: "/hizmetler/eslik#sahis",
        ctaLabel: "Individual track",
        badge: "Consult",
      },
      {
        id: "egitim-yonlendirme",
        icon: "GraduationCap",
        title: "University / education guidance",
        body: "Documentation order and process map for education paths.",
        href: "/hizmetler/egitim",
        ctaLabel: "Education page",
        badge: "Consult",
      },
    ],
  },
  packages: {
    eyebrow: "Packages",
    title: "Orderable packages",
    intro:
      "Four packages: Single letter, Monthly tracking (subscription), POA execution (subscription), On-site accompaniment. Monthly packages renew on the card automatically. A case opens after payment.",
    applyLabel: "Apply",
    detailLabel: "Details",
    featuredStory: {
      title: "Through the month",
      steps: [
        "Incoming letters summarised in your language",
        "Deadline and next step clarified",
        "Tracked on your case page",
      ],
    },
  },
  process: {
    eyebrow: "How it works",
    title: "Two paths — package or visit",
    intro:
      "Have a letter — buy a letter package. On-site accompaniment (office / bank / urząd) is a separate package on the site — city required; travel outside the city is separate. Phone consultation is not available right now.",
    paidPathTitle: "Four steps for paid packages",
    steps: [
      {
        title: "Pick a package",
        body: "Letter packages: PDF / photo. On-site: city and a short briefing.",
      },
      {
        title: "Payment",
        body: "Stripe. Your private case link arrives by email.",
      },
      {
        title: "Explain + track",
        body: "What was asked, deadline, next step — in your language.",
      },
      {
        title: "Result",
        body: "Download from your case page. No file attached to email.",
      },
    ],
    consultPathTitle: "On-site accompaniment (office / bank)",
    consultPathBody:
      "Half-day package: 450 zł, one office / one visit. Poland-wide base fee; out-of-city travel agreed separately. No decision guarantee. Heavy admin periods use the separate POA package.",
    consultSteps: [
      {
        title: "Pick the package",
        body: "On the application: On-site accompaniment; city and visit purpose.",
      },
      {
        title: "Payment",
        body: "450 zł half day — Stripe. Operator confirms the slot.",
      },
      {
        title: "Visit day",
        body: "Language bridge at the office / bank / urząd; not legal representation.",
      },
      {
        title: "Status note",
        body: "What happened, what is next — on your case page.",
      },
    ],
    ctaPackage: "Go to packages",
    ctaConsult: "Apply — on-site",
  },
  cases: {
    eyebrow: "Examples",
    title: "Common situations",
    intro: "Not a guarantee of an official decision or legal outcome.",
    tabs: [
      {
        id: "us-zus",
        label: "Tax / ZUS",
        title: "Tax office or ZUS letter",
        bullets: [
          "Upload the letter (single letter or monthly plan)",
          "Summary: request, deadline, annexes",
          "Clear note for your accountant",
          "Lawyer bridge if needed",
        ],
        ctaLabel: "Packages",
        href: "/hizmetler#paketler",
      },
      {
        id: "krs",
        label: "Company register",
        title: "KRS / company changes",
        bullets: [
          "Document sequence",
          "Appointment coordination (POA package)",
          "Status in your language",
          "Decisions stay with lawyer / authorised person",
        ],
        ctaLabel: "POA package",
        href: "/hizmetler/surec-yonetimi",
      },
      {
        id: "calisan",
        label: "Employee stay",
        title: "Employer-side residence file",
        bullets: [
          "Employer-side checklist (single letter or monthly tracking)",
          "Missing-document check",
          "Guides: letters, packages, formation, individuals, MOS",
          "Representation with the lawyer partner",
        ],
        ctaLabel: "Business services",
        href: "/hizmetler/isletme",
      },
      {
        id: "kurulum",
        label: "Investment / formation",
        title: "From Turkey to Poland — company and activity",
        bullets: [
          "Pre-decision administrative sequence and HQ document list",
          "Lawyer–notary track preparation; post-KRS NIP / REGON / VAT-UE / bank",
          "First 90 days: letter summaries and HQ–Poland bridge",
          "No incorporation or legal-outcome guarantee",
        ],
        ctaLabel: "Formation advisory",
        href: "/hizmetler/kurulum",
      },
      {
        id: "egitim",
        label: "University",
        title: "University / education correspondence",
        bullets: [
          "Upload the letter or use the consult form",
          "What is requested, deadline, missing documents",
          "Language bridge family / applicant / institution",
          "No admission or visa guarantee",
        ],
        ctaLabel: "Education guidance",
        href: "/hizmetler/egitim",
      },
      {
        id: "eslik",
        label: "On-site",
        title: "Licence, residence, offices — individuals",
        bullets: [
          "Company or individual track",
          "Licence exchange / residence card: checklist, appointment, status",
          "Remote, phone or on site; TR / PL / EN / RU / UK",
          "No card / licence / outcome guarantee",
        ],
        ctaLabel: "Accompaniment service",
        href: "/hizmetler/eslik",
      },
    ],
  },
  scope: {
    eyebrow: "Boundaries",
    title: "What we do / don’t",
    includedTitle: "We do",
    excludedTitle: "We don’t",
    included: [
      "Letter summaries; contact in TR / PL / EN / RU / UK",
      "Turkish operators: Poland investment, company formation and activity — administrative advisory and process initiation (registration is not ours)",
      "Deadline and next-step clarity",
      "Administrative guidance for education / university processes",
      "SME and logistics activity papers; bridge to the lawyer partner",
      "Individuals: offices, licence exchange, residence-card status — remote / phone / on site",
      "On-site accompaniment on request",
      "Document / appointment coordination (POA package)",
      "Bridge to lawyer partner and accountant",
      "After payment: status on the case page / Account",
    ],
    excluded: [
      "Registering the company in your name; obtaining KRS or tax decisions",
      "Legal advice and litigation",
      "University admission, scholarship or visa / residence guarantees",
      "Bank account, PESEL, licence or medical outcome guarantees",
      "Accounting and tax filing signatures",
      "Decision or timeline guarantees",
      "MOS / office form automation",
      "Presenting ourselves as lawyers, education agents or sworn translators",
    ],
  },
  faq: faqEn,
  lead: {
    title: "Contact",
    intro:
      "Admin tracking or a package: write to us. Urgent letter: header Apply. Reply usually within one business day.",
    fullName: "Full name",
    company: "Company / title (optional)",
    employees: "Headcount (optional)",
    email: "Email",
    phone: "Phone",
    process: "Service of interest",
    processOptions: [
      {
        value: "ticaret-masasi",
        label: "Trade advisory — Poland",
      },
      { value: "tek-yazi", label: "Single letter" },
      { value: "aylik-paket", label: "Monthly admin tracking" },
      { value: "surec-yonetimi", label: "Admin execution with POA" },
      { value: "yatirimci", label: "TR operator — Poland investment / company formation" },
      { value: "isletme", label: "SME / logistics — activity papers" },
      { value: "egitim", label: "University / education process guidance" },
      { value: "eslik-firma", label: "Company — offices / accompaniment" },
      { value: "eslik-sahis", label: "Individual — licence, residence, offices" },
      { value: "diger", label: "Other" },
    ],
    privacy: "I agree to processing of my data for contact purposes.",
    submit: "Send",
    loading: "Sending…",
    success:
      "Request received. We’ll reply by email (usually within 1 business day).",
    error: "Could not send. Please try again.",
    fieldError: "Check this field.",
    modalTitle: "Contact",
    close: "Close",
  },
  trust: {
    title: "Trust",
    badges: [
      "Not a law firm",
      "GDPR / RODO",
      "Stripe payments",
      "Case link (no email attachment)",
    ],
  },
  footer: {
    disclaimer:
      "POL-TURK is not a law firm or tax office. Legal advice sits with our Polish lawyer partner. No decision or timeline guarantees.",
    privacy: "Privacy",
    rights: "© POL-TURK. All rights reserved.",
    servicesHub: "All services",
    about: "About us",
    apply: "Apply",
    accompaniment: "On-site support",
    advisory: "Advisory",
    formation: "Investment / formation",
    business: "Business services",
    education: "Education processes",
    packages: "Packages",
    guide: "Guides",
    faq: "FAQ",
    groupServices: "Services",
    groupBuy: "Apply",
    groupSite: "Site",
  },
};

export function getLandingContent(locale: string): LandingContent {
  if (locale === "pl") return landingPl;
  if (locale === "en") return landingEn;
  return landingTr;
}
