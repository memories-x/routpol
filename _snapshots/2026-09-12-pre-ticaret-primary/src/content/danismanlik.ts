/** POL-TURK Danışmanlık — ikinci hat (ticaret aracılığı). Yazı paketlerinden ayrı. */

export type DanismanlikContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  separateNote: string;
  whoTitle: string;
  who: { title: string; body: string }[];
  offerTitle: string;
  offer: { title: string; body: string }[];
  limitsTitle: string;
  limits: string[];
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  disclaimer: string;
};

const tr: DanismanlikContent = {
  meta: {
    title: "POL-TURK Danışmanlık — Polonya ticaret aracılığı",
    description:
      "Yurtdışındaki Türk şirketlerine Polonya pazar / firma analizi, lojistik ürün analizi ve fiyat teklifi köprüsü. Yazı paketlerinden ayrı ikinci hat.",
  },
  eyebrow: "İkinci hat · paketlerden ayrı",
  title: "Polonya ticaret masası",
  lead:
    "Yurtdışındaki Türk şirketlerinin Polonya’ya ürün veya hizmet açılışında dil ve aracı köprü: pazar / firma görünürlüğü, lojistik ürün analizi, fiyat teklifi iletimi.",
  separateNote:
    "Bu hat yazı özeti ve idari takip paketlerinden ayrıdır. Ana gelir hattımız şu an resmi yazı paketleridir; ticaret masası görüşme / lead ile ilerler.",
  whoTitle: "Kim için",
  who: [
    {
      title: "Türkiye merkezli şirket",
      body: "Polonya’da satış, dağıtım veya tedarik arayan üretici / toptancı / marka.",
    },
    {
      title: "Yurtdışında Türk işletmesi",
      body: "AB veya üçüncü ülkede yerleşik, Polonya kanalı veya partner arayan firmalar.",
    },
  ],
  offerTitle: "Ne sunuyoruz",
  offer: [
    {
      title: "Pazar / kanal görünürlüğü",
      body: "Ürün veya kategori için PL’de tipik kanal ve regülasyon kaynaklarının derlemesi — uydurma pazar payı yok.",
    },
    {
      title: "Firma analizi (kısa liste)",
      body: "İlgili toptancı / üretici / dağıtıcı aday özeti. Due diligence veya kredi notu vaadi yok.",
    },
    {
      title: "Lojistik ürün analizi",
      body: "Ürüne göre tipik taşıma / depolama seçenekleri ve partner teklif özeti. Navlun işletmeciliği değiliz.",
    },
    {
      title: "Fiyat teklifi aracılığı",
      body: "Brief → adaylara iletim → gelen tekliflerin dilde derlenmesi. Alım-satım tarafı veya sonuç garantisi yok.",
    },
  ],
  limitsTitle: "Ne değil",
  limits: [
    "Taşıyıcı / gümrük komisyoncusu değiliz",
    "Alım-satım tarafı veya stok garantisi yok",
    "Yatırım tavsiyesi veya “girin kazanırsınız” vaadi yok",
    "Şirket tescili / avukatlık bu hatta değil — çekirdek paketler ve avukat ortağı ayrı",
  ],
  ctaPrimary: "Ticaret masası için yazın",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Yazı paketlerine bak",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Danışmanlık idari ve aracı bilgilendirmedir; komisyon modeli yazılı netleşmeden kamu vaadi verilmez. Karar ve sözleşme size aittir.",
};

const pl: DanismanlikContent = {
  meta: {
    title: "POL-TURK Doradztwo — pośrednictwo handlowe w Polsce",
    description:
      "Analiza rynku / firm, logistyka produktu i most wyceny dla tureckich firm za granicą. Druga linia — osobno od pakietów pism.",
  },
  eyebrow: "Druga linia · osobno od pakietów",
  title: "Biurko handlowe Polska",
  lead:
    "Most językowy i pośrednictwo dla tureckich firm za granicą wchodzących na PL: widoczność rynku / firm, analiza logistyki produktu, przekaz wycen.",
  separateNote:
    "Ta linia jest osobna od pakietów streszczeń pism i trackingu. Główny przychód na start: pakiety pism; handel — lead / kontakt.",
  whoTitle: "Dla kogo",
  who: [
    {
      title: "Firma z siedzibą w TR",
      body: "Producent / hurt / marka szukająca sprzedaży, dystrybucji lub dostaw w PL.",
    },
    {
      title: "Turecka firma za granicą",
      body: "Siedziba w UE lub innym kraju — kanał lub partner w Polsce.",
    },
  ],
  offerTitle: "Co oferujemy",
  offer: [
    {
      title: "Widoczność rynku / kanału",
      body: "Zestawienie typowych kanałów i źródeł regulacji — bez wymyślonych udziałów w rynku.",
    },
    {
      title: "Analiza firm (krótka lista)",
      body: "Kandydaci: hurt, producent, dystrybutor. Bez gwarancji due diligence.",
    },
    {
      title: "Analiza logistyki produktu",
      body: "Typowe opcje transportu / magazynu i streszczenie ofert. Nie jesteśmy operatorem frachtu.",
    },
    {
      title: "Pośrednictwo w wycenie",
      body: "Brief → przekaz do kandydatów → streszczenie odpowiedzi. Bez gwarancji transakcji.",
    },
  ],
  limitsTitle: "Czego nie robimy",
  limits: [
    "Nie jesteśmy przewoźnikiem ani agencją celną",
    "Bez gwarancji zakupu / sprzedaży / zapasu",
    "Bez porad inwestycyjnych",
    "Rejestracja spółki / adwokatura — osobna linia (pakiety + partner adwokacki)",
  ],
  ctaPrimary: "Napisz w sprawie handlu",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Pakiety pism",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Doradztwo to informacja i most — model prowizji musi być spisany przed publicznymi obietnicami. Decyzja i umowa należą do Państwa.",
};

const en: DanismanlikContent = {
  meta: {
    title: "POL-TURK Advisory — Poland trade intermediary",
    description:
      "Market / company analysis, logistics product analysis and price-quote bridging for Turkish companies abroad. Second track — separate from letter packages.",
  },
  eyebrow: "Second track · separate from packages",
  title: "Poland trade desk",
  lead:
    "Language and intermediary bridge for Turkish companies abroad entering Poland: market / company visibility, logistics product analysis, price-quote relay.",
  separateNote:
    "This track is separate from letter-summary and admin-tracking packages. Near-term revenue focus remains letter packages; the trade desk runs via contact / lead.",
  whoTitle: "Who it is for",
  who: [
    {
      title: "Turkey-based company",
      body: "Manufacturer / wholesaler / brand seeking sales, distribution or supply in Poland.",
    },
    {
      title: "Turkish company abroad",
      body: "Based in the EU or elsewhere — looking for a Poland channel or partner.",
    },
  ],
  offerTitle: "What we offer",
  offer: [
    {
      title: "Market / channel visibility",
      body: "Typical PL channels and regulation sources for a product category — no invented market share.",
    },
    {
      title: "Company shortlist",
      body: "Candidate wholesalers / makers / distributors with a short profile. No due-diligence guarantee.",
    },
    {
      title: "Logistics product analysis",
      body: "Typical transport / storage options and partner-quote summaries. We are not a freight operator.",
    },
    {
      title: "Price-quote bridging",
      body: "Brief → relay to candidates → summarise replies in your language. No deal guarantee.",
    },
  ],
  limitsTitle: "What we are not",
  limits: [
    "Not a carrier or customs broker",
    "No buy/sell or stock guarantee",
    "No investment advice",
    "Company registration / legal advice — separate core packages and lawyer partner",
  ],
  ctaPrimary: "Contact about trade desk",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Letter packages",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Advisory is informational bridging — commission terms must be written before public promises. Decisions and contracts stay with you.",
};

export function getDanismanlikContent(locale: string): DanismanlikContent {
  if (locale === "pl") return pl;
  if (locale === "en") return en;
  return tr;
}
