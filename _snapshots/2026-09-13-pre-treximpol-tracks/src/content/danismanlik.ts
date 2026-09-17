/** POL-TURK Danışmanlık — ana iş kolu: Polonya ticaret masası. */

export type DanismanlikContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  pillarNote: string;
  whoTitle: string;
  who: { title: string; body: string }[];
  offerTitle: string;
  offer: { title: string; body: string }[];
  processTitle: string;
  process: { title: string; body: string }[];
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
    title: "POL-TURK Danışmanlık — Polonya ticaret masası",
    description:
      "Ana iş kolu: Polonya pazar / firma / lojistik analizi ve fiyat teklifi aracılığı. Aynı çatıda idari yazı paketleri. Avukat veya taşıyıcı değiliz.",
  },
  eyebrow: "Ana iş kolu · POL-TURK Danışmanlık",
  title: "Polonya ticaret masası",
  lead:
    "Yurtdışındaki Türk şirketlerinin Polonya’ya ürün veya hizmet açılışında dil ve aracı köprü: pazar / firma görünürlüğü, lojistik ürün analizi, fiyat teklifi iletimi ve tanıştırma.",
  pillarNote:
    "Kurumsal çerçeve: ticaret masası ana iş koludur. Resmi yazı özeti, aylık takip, vekalet ve yerinde eşlik aynı çatı altında operasyonel Stripe paketleridir — karıştırılmaz.",
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
    {
      title: "İlk giriş KOBİ",
      body: "“Bu ürün burada kaça, kim satıyor, lojistik nasıl?” sorularına dürüst derleme arayanlar.",
    },
  ],
  offerTitle: "Hizmet menüsü",
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
      body: "Brief → adaylara iletim → gelen tekliflerin dilde derlenmesi. Alım-satım tarafı yok; komisyon yazılı sözleşmeyle.",
    },
    {
      title: "Pazara açılış köprüsü",
      body: "Tanıştırma, görüşme ayarı, dil. Şirket tescili bu hatta değil — gerekirse idari paketler ve avukat ortağı ayrı.",
    },
  ],
  processTitle: "Nasıl çalışır",
  process: [
    {
      title: "1 · Brief",
      body: "Ürün, hedef şehir / kanal, dil, zaman penceresi — iletişim formundan veya e-posta.",
    },
    {
      title: "2 · Kapsam",
      body: "Hangi kalemler (analiz / teklif / tanıştırma), teslim biçimi ve ücret çerçevesi yazılı netleşir.",
    },
    {
      title: "3 · Teslim",
      body: "Derleme notu, kısa liste veya teklif özeti — dilinizde. Sonuç / anlaşma garantisi yoktur.",
    },
  ],
  limitsTitle: "Ne değil",
  limits: [
    "Taşıyıcı / gümrük komisyoncusu değiliz",
    "Alım-satım tarafı veya stok garantisi yok",
    "Yatırım tavsiyesi veya “girin kazanırsınız” vaadi yok",
    "Kamu metinde komisyon oranı yok — yazılı sözleşme sonrası",
    "Şirket tescili / avukatlık bu hatta değil — idari paketler ve avukat ortağı ayrı",
  ],
  ctaPrimary: "Ticaret masası için yazın",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "İdari paketler",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Danışmanlık aracı bilgilendirmedir. Komisyon, sorumluluk ve kapsam yazılı sözleşmeyle kilitlenir. Karar ve sözleşme size aittir.",
};

const pl: DanismanlikContent = {
  meta: {
    title: "POL-TURK Doradztwo — biurko handlowe Polska",
    description:
      "Główna linia: analiza rynku / firm / logistyki i most wyceny w PL. Pod tym samym dachem pakiety administracyjne. Nie jesteśmy kancelarią ani przewoźnikiem.",
  },
  eyebrow: "Główna linia · POL-TURK Doradztwo",
  title: "Biurko handlowe Polska",
  lead:
    "Most językowy i pośrednictwo dla tureckich firm za granicą: widoczność rynku / firm, analiza logistyki produktu, przekaz wycen i przedstawienia.",
  pillarNote:
    "Ramy firmowe: biurko handlowe jest główną linią. Streszczenia pism, opieka miesięczna, POA i towarzyszenie — osobna linia Stripe pod tym samym dachem.",
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
    {
      title: "Pierwsze wejście MŚP",
      body: "Pytania: „za ile tu, kto sprzedaje, jaka logistyka?” — uczciwe zestawienie.",
    },
  ],
  offerTitle: "Menu usług",
  offer: [
    {
      title: "Widoczność rynku / kanału",
      body: "Typowe kanały i źródła regulacji — bez wymyślonych udziałów w rynku.",
    },
    {
      title: "Analiza firm (krótka lista)",
      body: "Kandydaci hurt / producent / dystrybutor. Bez gwarancji due diligence.",
    },
    {
      title: "Analiza logistyki produktu",
      body: "Typowe opcje transportu / magazynu i streszczenie ofert. Nie jesteśmy operatorem frachtu.",
    },
    {
      title: "Pośrednictwo w wycenie",
      body: "Brief → przekaz → streszczenie odpowiedzi. Bez strony transakcji; prowizja po umowie.",
    },
    {
      title: "Most wejścia na rynek",
      body: "Przedstawienia, spotkania, język. Rejestracja spółki — osobna linia (pakiety + adwokat).",
    },
  ],
  processTitle: "Jak pracujemy",
  process: [
    {
      title: "1 · Brief",
      body: "Produkt, miasto / kanał, język, okno czasowe — formularz lub e-mail.",
    },
    {
      title: "2 · Zakres",
      body: "Które pozycje, forma dostawy i ramy opłaty — na piśmie.",
    },
    {
      title: "3 · Dostawa",
      body: "Notatka, krótka lista lub streszczenie wycen — w Waszym języku. Bez gwarancji transakcji.",
    },
  ],
  limitsTitle: "Czego nie robimy",
  limits: [
    "Nie jesteśmy przewoźnikiem ani agencją celną",
    "Bez gwarancji zakupu / sprzedaży / zapasu",
    "Bez porad inwestycyjnych",
    "Bez publicznej stawki prowizji — po umowie pisemnej",
    "Rejestracja spółki / adwokatura — osobna linia",
  ],
  ctaPrimary: "Napisz w sprawie handlu",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Pakiety administracyjne",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Doradztwo to most informacyjny. Prowizja i odpowiedzialność — w umowie pisemnej. Decyzja należy do Państwa.",
};

const en: DanismanlikContent = {
  meta: {
    title: "POL-TURK Advisory — Poland trade desk",
    description:
      "Primary line: Poland market / company / logistics analysis and price-quote bridging. Under the same roof: admin letter packages. Not a law firm or carrier.",
  },
  eyebrow: "Primary line · POL-TURK Advisory",
  title: "Poland trade desk",
  lead:
    "Language and intermediary bridge for Turkish companies abroad: market / company visibility, logistics product analysis, price-quote relay and introductions.",
  pillarNote:
    "Corporate frame: the trade desk is the primary line. Letter summaries, monthly tracking, POA and on-site accompaniment are operational Stripe packages under the same roof — not mixed into trade promises.",
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
    {
      title: "First-entry SME",
      body: "Honest compilation for “what price here, who sells, what logistics?”",
    },
  ],
  offerTitle: "Service menu",
  offer: [
    {
      title: "Market / channel visibility",
      body: "Typical PL channels and regulation sources — no invented market share.",
    },
    {
      title: "Company shortlist",
      body: "Candidate wholesalers / makers / distributors. No due-diligence guarantee.",
    },
    {
      title: "Logistics product analysis",
      body: "Typical transport / storage options and partner-quote summaries. Not a freight operator.",
    },
    {
      title: "Price-quote bridging",
      body: "Brief → relay → summarise replies. Not a deal party; commission only after a written agreement.",
    },
    {
      title: "Market-entry bridge",
      body: "Introductions, meeting setup, language. Company registration is a separate line (packages + lawyer partner).",
    },
  ],
  processTitle: "How it works",
  process: [
    {
      title: "1 · Brief",
      body: "Product, city / channel, language, timing — contact form or email.",
    },
    {
      title: "2 · Scope",
      body: "Which items, delivery format and fee frame — in writing.",
    },
    {
      title: "3 · Delivery",
      body: "Briefing note, shortlist or quote summary — in your language. No deal guarantee.",
    },
  ],
  limitsTitle: "What we are not",
  limits: [
    "Not a carrier or customs broker",
    "No buy/sell or stock guarantee",
    "No investment advice",
    "No public commission rate — after a written agreement",
    "Company registration / legal advice — separate line",
  ],
  ctaPrimary: "Contact about trade desk",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Admin packages",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Advisory is informational bridging. Commission and liability are locked in a written agreement. Decisions stay with you.",
};

export function getDanismanlikContent(locale: string): DanismanlikContent {
  if (locale === "pl") return pl;
  if (locale === "en") return en;
  return tr;
}
