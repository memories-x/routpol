/** POL-TURK Danışmanlık — ana iş kolu: Polonya ticaret masası (satış + satın alma). */

export type DanismanlikTrackItem = { title: string; body: string };

export type DanismanlikTrack = {
  id: "sales" | "procurement";
  title: string;
  lead: string;
  items: DanismanlikTrackItem[];
};

export type DanismanlikContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  pillarNote: string;
  whoTitle: string;
  who: { title: string; body: string }[];
  tracksTitle: string;
  tracks: DanismanlikTrack[];
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
    title: "POL-TURK Danışmanlık — satış ve satın alma köprüsü",
    description:
      "Polonya ticaret masası: satış-pazarlama ve satın alma hatlarında pazar / firma görünürlüğü, teklif aracılığı ve dil köprüsü. Taşıyıcı veya alım-satım tarafı değiliz.",
  },
  eyebrow: "Ana iş kolu · POL-TURK Danışmanlık",
  title: "Polonya ticaret masası",
  lead:
    "Türkiye merkezli veya yurtdışındaki Türk şirketleri için dil ve aracı köprü: Polonya’da satış-pazarlama desteği veya uluslararası satın alma görünürlüğü — analiz, teklif iletimi ve tanıştırma.",
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
      body: "“Bu ürün burada kaça, kim satıyor / kimden alınır, lojistik nasıl?” sorularına dürüst derleme arayanlar.",
    },
  ],
  tracksTitle: "İki hat",
  tracks: [
    {
      id: "sales",
      title: "Satış ve pazarlama desteği",
      lead:
        "Polonya tarafında alıcı / kanal görünürlüğünden teklif iletimine — anlaşma veya sevkiyat işletmeciliği değil; dil ve aracı köprü.",
      items: [
        {
          title: "Pazar ve alıcı profili",
          body: "Ürün veya kategori için tipik kanal, alıcı tipi ve regülasyon kaynaklarının derlemesi — uydurma pazar payı yok.",
        },
        {
          title: "İlk temas ve tanıştırma",
          body: "Aday firmalara brief iletimi, dilde özet ve görüşme ayarı. Müzakereyi sizin adınıza sonuçlandırmayız.",
        },
        {
          title: "Teklif aracılığı",
          body: "Brief → adaylara iletim → gelen tekliflerin dilde derlenmesi. Alım-satım tarafı yok; komisyon yazılı sözleşmeyle.",
        },
        {
          title: "Lojistik ürün notu",
          body: "Ürüne göre tipik taşıma / depolama seçenekleri ve partner teklif özeti. Navlun veya gümrük işletmeciliği değiliz.",
        },
      ],
    },
    {
      id: "procurement",
      title: "Satın alma desteği",
      lead:
        "Tedarikçi araştırmasından teklif karşılaştırmasına — stok, kalite garantisi veya sözleşme avukatlığı değil; görünürlük ve dil köprüsü.",
      items: [
        {
          title: "Ürün ve tedarik ihtiyacı",
          body: "Brief’te ürün tanımı, miktar bandı, kalite beklentisi ve hedef pazarın netleştirilmesi.",
        },
        {
          title: "Tedarikçi kısa listesi",
          body: "İlgili üretici / toptancı aday özeti. Due diligence veya kredi notu vaadi yok.",
        },
        {
          title: "Teklif karşılaştırma özeti",
          body: "Gelen tekliflerin dilde derlenmesi ve karşılaştırma notu. Fiyat / stok garantisi yok.",
        },
        {
          title: "Numune ve teslimat koordinasyon notu",
          body: "Numune / sevkiyat adımlarının kimde olduğu yazılı özet — kalite kontrol laboratuvarı veya taşıyıcı değiliz.",
        },
      ],
    },
  ],
  processTitle: "Nasıl çalışır",
  process: [
    {
      title: "1 · Brief",
      body: "Satış mı satın alma mı, ürün, hedef şehir / kanal, dil, zaman penceresi — iletişim formundan veya e-posta.",
    },
    {
      title: "2 · Kapsam",
      body: "Hangi kalemler (görünürlük / teklif / tanıştırma), teslim biçimi ve ücret çerçevesi yazılı netleşir.",
    },
    {
      title: "3 · Teslim",
      body: "Derleme notu, kısa liste veya teklif özeti — dilinizde. Sonuç / anlaşma garantisi yoktur.",
    },
  ],
  limitsTitle: "Ne değil",
  limits: [
    "Taşıyıcı / gümrük komisyoncusu değiliz",
    "Alım-satım tarafı, stok veya kalite garantisi yok",
    "Anlaşma müzakeresini sizin adınıza sonuçlandırmayız",
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
    title: "POL-TURK Doradztwo — most sprzedaży i zakupów",
    description:
      "Biurko handlowe PL: widoczność rynku / firm, most wyceny i językowy na ścieżkach sprzedaży i zakupów. Nie jesteśmy przewoźnikiem ani stroną transakcji.",
  },
  eyebrow: "Główna linia · POL-TURK Doradztwo",
  title: "Biurko handlowe Polska",
  lead:
    "Most językowy i pośrednictwo dla tureckich firm: wsparcie sprzedaży-marketingu w PL albo widoczność zakupów międzynarodowych — analiza, przekaz wycen i przedstawienia.",
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
      body: "Pytania: „za ile tu, kto sprzedaje / od kogo kupić, jaka logistyka?” — uczciwe zestawienie.",
    },
  ],
  tracksTitle: "Dwie ścieżki",
  tracks: [
    {
      id: "sales",
      title: "Wsparcie sprzedaży i marketingu",
      lead:
        "Od widoczności nabywców / kanałów do przekazu wycen — bez zamykania umów i bez prowadzenia wysyłek w naszym imieniu.",
      items: [
        {
          title: "Profil rynku i nabywcy",
          body: "Typowe kanały, typy nabywców i źródła regulacji — bez wymyślonych udziałów w rynku.",
        },
        {
          title: "Pierwszy kontakt i przedstawienie",
          body: "Przekaz briefu, streszczenie językowe i ustalenie spotkań. Nie finalizujemy negocjacji w Waszym imieniu.",
        },
        {
          title: "Pośrednictwo w wycenie",
          body: "Brief → przekaz → streszczenie odpowiedzi. Bez strony transakcji; prowizja po umowie.",
        },
        {
          title: "Notatka logistyki produktu",
          body: "Typowe opcje transportu / magazynu i streszczenie ofert. Nie jesteśmy operatorem frachtu ani cła.",
        },
      ],
    },
    {
      id: "procurement",
      title: "Wsparcie zakupów",
      lead:
        "Od researchu dostawców do porównania wycen — bez gwarancji zapasu / jakości i bez zastępowania adwokata.",
      items: [
        {
          title: "Potrzeba produktu i dostaw",
          body: "W briefie: definicja produktu, pasmo ilości, oczekiwania jakości i rynek docelowy.",
        },
        {
          title: "Krótka lista dostawców",
          body: "Kandydaci producent / hurt. Bez gwarancji due diligence.",
        },
        {
          title: "Streszczenie porównania wycen",
          body: "Zestawienie odpowiedzi w Waszym języku. Bez gwarancji ceny / zapasu.",
        },
        {
          title: "Notatka o próbce i dostawie",
          body: "Które kroki u kogo — na piśmie. Nie jesteśmy laboratorium QC ani przewoźnikiem.",
        },
      ],
    },
  ],
  processTitle: "Jak pracujemy",
  process: [
    {
      title: "1 · Brief",
      body: "Sprzedaż czy zakup, produkt, miasto / kanał, język, okno czasowe — formularz lub e-mail.",
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
    "Bez gwarancji zakupu / sprzedaży / zapasu / jakości",
    "Nie finalizujemy negocjacji w Waszym imieniu",
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
    title: "POL-TURK Advisory — sales and procurement bridge",
    description:
      "Poland trade desk: market / company visibility, quote bridging and language support on sales and procurement tracks. Not a carrier or deal party.",
  },
  eyebrow: "Primary line · POL-TURK Advisory",
  title: "Poland trade desk",
  lead:
    "Language and intermediary bridge for Turkish companies: Poland sales-marketing support or international procurement visibility — analysis, quote relay and introductions.",
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
      body: "Honest compilation for “what price here, who sells / who to buy from, what logistics?”",
    },
  ],
  tracksTitle: "Two tracks",
  tracks: [
    {
      id: "sales",
      title: "Sales and marketing support",
      lead:
        "From buyer / channel visibility to quote relay — we do not close deals or run shipments for you.",
      items: [
        {
          title: "Market and buyer profile",
          body: "Typical channels, buyer types and regulation sources — no invented market share.",
        },
        {
          title: "First contact and introductions",
          body: "Relay the brief, language summary and meeting setup. We do not close negotiations in your name.",
        },
        {
          title: "Price-quote bridging",
          body: "Brief → relay → summarise replies. Not a deal party; commission only after a written agreement.",
        },
        {
          title: "Logistics product note",
          body: "Typical transport / storage options and partner-quote summaries. Not a freight or customs operator.",
        },
      ],
    },
    {
      id: "procurement",
      title: "Procurement support",
      lead:
        "From supplier research to quote comparison — no stock / quality guarantee and no substitute for legal counsel.",
      items: [
        {
          title: "Product and supply need",
          body: "In the brief: product definition, quantity band, quality expectations and target market.",
        },
        {
          title: "Supplier shortlist",
          body: "Candidate makers / wholesalers. No due-diligence guarantee.",
        },
        {
          title: "Quote comparison summary",
          body: "Compiled replies in your language. No price / stock guarantee.",
        },
        {
          title: "Sample and delivery coordination note",
          body: "Which steps sit with whom — in writing. Not a QC lab or carrier.",
        },
      ],
    },
  ],
  processTitle: "How it works",
  process: [
    {
      title: "1 · Brief",
      body: "Sales or procurement, product, city / channel, language, timing — contact form or email.",
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
    "No buy/sell, stock or quality guarantee",
    "We do not close negotiations in your name",
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
