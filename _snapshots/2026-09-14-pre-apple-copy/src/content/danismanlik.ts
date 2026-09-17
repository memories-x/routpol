/** POL-TURK Danışmanlık — kurumsal hizmet çerçevesi (ticaret masası). */

export type DanismanlikItem = { title: string; body: string };

export type DanismanlikContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  pillarNote: string;
  servicesTitle: string;
  services: DanismanlikItem[];
  engagementTitle: string;
  engagement: DanismanlikItem[];
  commercialTitle: string;
  commercial: string;
  operationsTitle: string;
  operationsLead: string;
  operations: DanismanlikItem[];
  whoTitle: string;
  who: DanismanlikItem[];
  scopeTitle: string;
  scope: string[];
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  disclaimer: string;
};

const tr: DanismanlikContent = {
  meta: {
    title: "POL-TURK Danışmanlık — Polonya ticaret danışmanlığı",
    description:
      "Polonya pazar girişinde kurumsal danışmanlık: pazar görünürlüğü, karşı taraf haritası, ticari görüşme ve teklif derlemesi. Sözleşmeli yerel satın alma, lojistik koordinasyonu ve gümrük partner ağı.",
  },
  eyebrow: "POL-TURK Danışmanlık",
  title: "Polonya ticaret danışmanlığı",
  lead:
    "Türkiye merkezli ve yurtdışındaki Türk şirketlerinin Polonya pazarında satış veya tedarik açılışını yapılandırırız: doğru görünürlük, doğru karşı taraf, yönetilen görüşme ve net fiyat bilgisi.",
  pillarNote:
    "Aynı çatıda idari evrak ve süreç takibi kamu yüzüdür. Bu sayfa ticaret danışmanlığı hattıdır — karıştırılmaz.",
  servicesTitle: "Hizmet kapsamı",
  services: [
    {
      title: "Pazar görünürlüğü",
      body: "Ürün veya kategori için Polonya tarafında kanal yapısı, tipik alıcı–tedarikçi profili ve erişim noktalarının kurumsal derlemesi.",
    },
    {
      title: "Karşı taraf haritası",
      body: "Hedefe uygun şirket ve kurumların kısa listesi; iletişim ve rol bağlamı. Bağımsız denetim veya kredi notu bu kapsama girmez.",
    },
    {
      title: "Ticari görüşme koordinasyonu",
      body: "Tarafların tanıştırılması, dil köprüsü ve görüşme düzeni. Hukuki temsil veya noter işlemi ayrı hattadır.",
    },
    {
      title: "Teklif ve fiyat derlemesi",
      body: "Brief’e bağlı fiyat / teklif taleplerinin iletilmesi ve yanıtların karşılaştırılabilir özeti.",
    },
  ],
  engagementTitle: "Çalışma düzeni",
  engagement: [
    {
      title: "Keşif",
      body: "Satış veya tedarik yönü, ürün, hedef coğrafya, dil ve zaman çerçevesi netleşir.",
    },
    {
      title: "Kapsam",
      body: "Hangi hizmet kalemlerinin açılacağı, teslim biçimi ve ücret çerçevesi yazılı teklifle kilitlenir.",
    },
    {
      title: "Teslim",
      body: "Rapor, kısa liste, görüşme planı veya fiyat derlemesi — dilinizde. Sonuç garantisi verilmez.",
    },
  ],
  commercialTitle: "Ücret modeli",
  commercial:
    "Danışmanlık, açılan hizmet kalemi üzerinden faturalandırılır. Tutar ve kapsam her dosyada yazılı teklifle belirlenir; kamu sitede oran veya komisyon yüzdesi yayınlanmaz.",
  operationsTitle: "Yerel operasyon",
  operationsLead:
    "Ayrı sözleşme ile Polonya tarafında satın alma ve lojistik yürütmesi açılabilir. Gümrük işlemleri, işbirliği içinde olduğumuz lisanslı gümrük acenteleri üzerinden koordine edilir.",
  operations: [
    {
      title: "Satın alma yürütmesi",
      body: "Onaylı kapsamda tedarik görüşmesi, sipariş koordinasyonu ve yerel takip.",
    },
    {
      title: "Lojistik koordinasyonu",
      body: "Taşıma ve depolama adımlarının planlanması; fiili taşıma lisanslı lojistik partnerler üzerinden.",
    },
    {
      title: "Gümrük koordinasyonu",
      body: "Süreç eşliği ve dosya köprüsü; beyanname ve acentelik partner gümrük firmalarında kalır.",
    },
  ],
  whoTitle: "Kimler için",
  who: [
    {
      title: "Üretici, toptancı ve marka",
      body: "Polonya’da kanal, alıcı veya tedarik arayan Türkiye merkezli şirketler.",
    },
    {
      title: "Yurtdışında yerleşik Türk şirketleri",
      body: "AB veya üçüncü ülkeden Polonya pazarına açılmak isteyen işletmeler.",
    },
    {
      title: "İlk giriş ekipleri",
      body: "Yerel ağı ve süreç disiplinini sıfırdan kurmak istemeyen yönetim ekipleri.",
    },
  ],
  scopeTitle: "Kapsam dışı",
  scope: [
    "Avukatlık, mali müşavirlik ve şirket tescili",
    "Lisanslı taşımacılık veya gümrük acenteliği (partner üzerinden)",
    "Stok, kalite veya işlem sonucu taahhüdü",
    "Yatırım tavsiyesi",
  ],
  ctaPrimary: "Kapsam talep edin",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "İdari paketler",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "Kapsam, ücret ve sorumluluk yazılı teklif veya sözleşmeyle belirlenir. Karar ve nihai ticari taahhüt size aittir.",
};

const pl: DanismanlikContent = {
  meta: {
    title: "POL-TURK Doradztwo — doradztwo handlowe Polska",
    description:
      "Wejście na rynek PL: widoczność rynku, mapa kontrahentów, spotkania handlowe i zestawienie ofert. Opcjonalnie lokalne zakupy, logistyka i sieć partnerskich agencji celnych.",
  },
  eyebrow: "POL-TURK Doradztwo",
  title: "Doradztwo handlowe Polska",
  lead:
    "Strukturujemy wejście tureckich firm na rynek polski — sprzedaż lub zakupy: właściwa widoczność, właściwy kontrahent, prowadzone rozmowy i czytelne informacje cenowe.",
  pillarNote:
    "Pod tym samym dachem tracking administracyjny jest twarzą publiczną. Ta strona to linia doradztwa handlowego — bez mieszania.",
  servicesTitle: "Zakres usług",
  services: [
    {
      title: "Widoczność rynku",
      body: "Struktura kanałów, typowe profile nabywców–dostawców i punkty wejścia dla produktu lub kategorii.",
    },
    {
      title: "Mapa kontrahentów",
      body: "Krótka lista firm i instytucji z kontekstem roli. Bez due diligence ani ratingu kredytowego.",
    },
    {
      title: "Koordynacja spotkań handlowych",
      body: "Przedstawienia, most językowy i organizacja rozmów. Reprezentacja prawna — osobna linia.",
    },
    {
      title: "Zestawienie ofert i cen",
      body: "Przekaz zapytań według briefu oraz porównywalne streszczenie odpowiedzi.",
    },
  ],
  engagementTitle: "Tryb współpracy",
  engagement: [
    {
      title: "Rozpoznanie",
      body: "Kierunek sprzedaży lub zakupów, produkt, geografia, język i ramy czasu.",
    },
    {
      title: "Zakres",
      body: "Otwarte pozycje usług, forma dostawy i ramy opłaty — w ofercie pisemnej.",
    },
    {
      title: "Dostawa",
      body: "Raport, lista, plan spotkań lub zestawienie cen — w Waszym języku. Bez gwarancji wyniku.",
    },
  ],
  commercialTitle: "Model opłat",
  commercial:
    "Doradztwo rozliczane jest według otwartych pozycji usług. Kwota i zakres w ofercie pisemnej; bez publicznej stawki prowizji.",
  operationsTitle: "Operacje lokalne",
  operationsLead:
    "Na osobnej umowie można otworzyć prowadzenie zakupów i logistyki po stronie PL. Sprawy celne koordynujemy przez partnerskie, licencjonowane agencje celne.",
  operations: [
    {
      title: "Prowadzenie zakupów",
      body: "Rozmowy dostawcze, koordynacja zamówień i lokalny follow-up w zatwierdzonym zakresie.",
    },
    {
      title: "Koordynacja logistyki",
      body: "Planowanie transportu i magazynu; przewóz przez licencjonowanych partnerów.",
    },
    {
      title: "Koordynacja celna",
      body: "Most procesowy i dokumentowy; zgłoszenia pozostają u partnerskiej agencji celnej.",
    },
  ],
  whoTitle: "Dla kogo",
  who: [
    {
      title: "Producent, hurt, marka",
      body: "Firmy z TR szukające kanału, nabywcy lub dostawcy w Polsce.",
    },
    {
      title: "Tureckie firmy za granicą",
      body: "Siedziba w UE lub innym kraju — wejście na rynek PL.",
    },
    {
      title: "Pierwsze wejście",
      body: "Zespoły, które nie chcą budować lokalnej sieci od zera.",
    },
  ],
  scopeTitle: "Poza zakresem",
  scope: [
    "Adwokatura, księgowość i rejestracja spółki",
    "Licencjonowany przewóz lub agencja celna (przez partnerów)",
    "Gwarancja zapasu, jakości lub wyniku transakcji",
    "Porady inwestycyjne",
  ],
  ctaPrimary: "Poproś o zakres",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Pakiety administracyjne",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "Zakres, opłata i odpowiedzialność — w ofercie lub umowie. Decyzja handlowa należy do Państwa.",
};

const en: DanismanlikContent = {
  meta: {
    title: "POL-TURK Advisory — Poland trade advisory",
    description:
      "Corporate advisory for Poland market entry: market visibility, counterparty mapping, commercial meetings and quote compilation. Optional local procurement, logistics coordination and partner customs network.",
  },
  eyebrow: "POL-TURK Advisory",
  title: "Poland trade advisory",
  lead:
    "We structure Polish market entry for Turkey-based and overseas Turkish companies — sales or procurement: clear visibility, the right counterparties, managed dialogue and usable price information.",
  pillarNote:
    "Under the same roof, admin paperwork tracking is the public face. This page is the trade-advisory line — keep them distinct.",
  servicesTitle: "Service scope",
  services: [
    {
      title: "Market visibility",
      body: "Channel structure, typical buyer–supplier profiles and access points for a product or category.",
    },
    {
      title: "Counterparty mapping",
      body: "A shortlist of relevant companies and institutions with role context. Independent diligence and credit ratings are out of scope.",
    },
    {
      title: "Commercial meeting coordination",
      body: "Introductions, language bridge and meeting design. Legal representation sits on a separate line.",
    },
    {
      title: "Quote and price compilation",
      body: "Relay of RFQs per brief and a comparable summary of replies.",
    },
  ],
  engagementTitle: "Engagement model",
  engagement: [
    {
      title: "Discovery",
      body: "Sales or procurement direction, product, geography, language and timing.",
    },
    {
      title: "Scope",
      body: "Which service lines open, delivery format and fee frame — locked in a written proposal.",
    },
    {
      title: "Delivery",
      body: "Report, shortlist, meeting plan or price pack — in your language. No outcome guarantee.",
    },
  ],
  commercialTitle: "Fee model",
  commercial:
    "Advisory is invoiced by opened service line. Amount and scope are set per file in a written proposal; no public commission percentage.",
  operationsTitle: "Local operations",
  operationsLead:
    "Under a separate agreement, Poland-side procurement and logistics execution can be opened. Customs is coordinated through licensed partner agencies in our network.",
  operations: [
    {
      title: "Procurement execution",
      body: "Supplier dialogue, order coordination and local follow-up within an approved scope.",
    },
    {
      title: "Logistics coordination",
      body: "Planning of transport and storage steps; haulage through licensed logistics partners.",
    },
    {
      title: "Customs coordination",
      body: "Process and file bridging; declarations remain with the partner customs agency.",
    },
  ],
  whoTitle: "Who it is for",
  who: [
    {
      title: "Manufacturers, wholesalers and brands",
      body: "Turkey-based companies seeking a channel, buyer or supply in Poland.",
    },
    {
      title: "Turkish companies abroad",
      body: "EU or third-country based firms entering the Polish market.",
    },
    {
      title: "First-entry teams",
      body: "Management teams that prefer not to build a local network from scratch.",
    },
  ],
  scopeTitle: "Out of scope",
  scope: [
    "Legal practice, accounting and company registration",
    "Licensed carriage or customs brokerage (via partners)",
    "Stock, quality or transaction-outcome guarantees",
    "Investment advice",
  ],
  ctaPrimary: "Request a scope",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Admin packages",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "Scope, fees and liability are set in a written proposal or agreement. Commercial decisions remain yours.",
};

export function getDanismanlikContent(locale: string): DanismanlikContent {
  if (locale === "pl") return pl;
  if (locale === "en") return en;
  return tr;
}
