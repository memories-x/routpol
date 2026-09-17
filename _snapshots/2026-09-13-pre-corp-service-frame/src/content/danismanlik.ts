/** POL-TURK Danışmanlık — ana iş kolu: Polonya ticaret masası. */

export type DanismanlikItem = { title: string; body: string };

export type DanismanlikContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  pillarNote: string;
  whoTitle: string;
  who: DanismanlikItem[];
  coreTitle: string;
  core: DanismanlikItem[];
  billingTitle: string;
  billing: string;
  extendedTitle: string;
  extendedLead: string;
  extended: DanismanlikItem[];
  processTitle: string;
  process: DanismanlikItem[];
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
    title: "POL-TURK Danışmanlık — pazar, firma, görüşme, fiyat",
    description:
      "Polonya ticaret masası: pazar araştırması, firma tespiti, şirketler arası görüşme ve fiyat toplama. Hizmet başına danışmanlık faturası. İsteğe bağlı: PL satın alma / lojistik yürütme; gümrükte partner acenteler.",
  },
  eyebrow: "Ana iş kolu · POL-TURK Danışmanlık",
  title: "Polonya ticaret masası",
  lead:
    "Şirketler için Polonya tarafında pazar araştırması, firma ve kurum tespiti, şirketler arası görüşme ve fiyat toplama. Satış veya satın alma brief’ine göre aynı masadan yürür.",
  pillarNote:
    "Ticaret masası ana iş koludur; ücretlendirme hizmet başına danışmanlık faturası / sözleşme ile. Resmi yazı özeti, aylık takip, vekalet ve yerinde eşlik aynı çatıda Stripe idari paketleridir — karıştırılmaz.",
  whoTitle: "Kim için",
  who: [
    {
      title: "Türkiye merkezli şirket",
      body: "Polonya’da satış, dağıtım veya tedarik arayan üretici / toptancı / marka.",
    },
    {
      title: "Yurtdışında Türk işletmesi",
      body: "AB veya üçüncü ülkede yerleşik, Polonya kanalı, alıcı veya tedarikçi arayan firmalar.",
    },
    {
      title: "İlk giriş KOBİ",
      body: "Pazar, aday firma, görüşme ve fiyat görünürlüğü isteyen; süreci tek başına kurmak istemeyenler.",
    },
  ],
  coreTitle: "Çekirdek hizmetler",
  core: [
    {
      title: "Pazar araştırması",
      body: "Ürün / kategori için Polonya pazarı, kanal ve tipik alıcı–tedarikçi yapısının derlemesi. Uydurma pazar payı yok.",
    },
    {
      title: "Firma ve kurum tespiti",
      body: "İlgili şirket ve kurum adaylarının kısa listesi. Due diligence veya kredi notu vaadi yok.",
    },
    {
      title: "Şirketler arası görüşme",
      body: "Tarafları tanıştırma, dil köprüsü ve görüşme ayarı. Hukuki temsil veya noter işlemi değil.",
    },
    {
      title: "Fiyat toplama",
      body: "Brief’e göre teklif / fiyat talebi iletimi ve gelen yanıtların dilde derlenmesi.",
    },
  ],
  billingTitle: "Ücretlendirme",
  billing:
    "Sağlanan hizmet başına danışmanlık ücreti kesilir; kapsam ve tutar yazılı teklif / fatura ile netleşir. Kamu sitede komisyon oranı yok. Ticaret masası Stripe checkout SKU’su değildir.",
  extendedTitle: "Genişletilmiş yürütme (isteğe bağlı)",
  extendedLead:
    "Şirket kabul eder ve ayrı kapsam yazılırsa Polonya tarafında satın alma ve lojistik sürecini de üstlenebiliriz. Gümrükte işbirliği yaptığımız gümrük acenteleri üzerinden yardımcı oluruz.",
  extended: [
    {
      title: "Polonya satın alma süreci",
      body: "Onaylı brief çerçevesinde tedarik görüşmeleri, sipariş koordinasyonu ve yerel takip — stok veya kalite garantisi yoktur.",
    },
    {
      title: "Lojistik süreci",
      body: "Taşıma / depolama adımlarının planlanması ve yürütme koordinasyonu. Taşıyıcı lisansı ile navlun işletmecisi değiliz; taşıma partner üzerinden yürür.",
    },
    {
      title: "Gümrük desteği",
      body: "Gümrük işlemlerinde yardımcı oluruz; beyanname ve resmi gümrük acenteliği işbirliği yaptığımız acenteler üzerindendir. Kendimiz gümrük komisyoncusu değiliz.",
    },
  ],
  processTitle: "Nasıl çalışır",
  process: [
    {
      title: "1 · Brief",
      body: "Satış mı satın alma mı, ürün, hedef, dil, zaman — form veya e-posta.",
    },
    {
      title: "2 · Kapsam ve ücret",
      body: "Hangi çekirdek kalemler; isteğe bağlı yürütme var mı; hizmet başına fatura çerçevesi yazılı.",
    },
    {
      title: "3 · Teslim / yürütme",
      body: "Araştırma, kısa liste, görüşme, fiyat derlemesi; onaylandıysa satın alma / lojistik / gümrük köprüsü.",
    },
  ],
  limitsTitle: "Ne değil",
  limits: [
    "Avukat veya mali müşavir değiliz",
    "Lisanslı gümrük komisyoncusu / taşıyıcı değiliz — gümrük ve taşıma partner acente / lojistik firmaları üzerinden",
    "Stok, kalite veya anlaşma sonucu garantisi yok",
    "Yatırım tavsiyesi veya “girin kazanırsınız” vaadi yok",
    "Kamu metinde komisyon oranı yok — yazılı teklif / sözleşme sonrası",
    "Şirket tescili bu hatta değil — idari paketler ve avukat ortağı ayrı",
  ],
  ctaPrimary: "Ticaret masası için yazın",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "İdari paketler",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Danışmanlık aracı ve yürütme koordinasyonudur. Ücret, sorumluluk ve genişletilmiş kapsam yazılı teklif / sözleşmeyle kilitlenir. Karar size aittir.",
};

const pl: DanismanlikContent = {
  meta: {
    title: "POL-TURK Doradztwo — rynek, firmy, spotkania, ceny",
    description:
      "Biurko handlowe PL: research rynku, identyfikacja firm, spotkania B2B i zbieranie cen. Faktura za usługę. Opcjonalnie: zakupy / logistyka w PL; cło przez partnerskie agencje.",
  },
  eyebrow: "Główna linia · POL-TURK Doradztwo",
  title: "Biurko handlowe Polska",
  lead:
    "Dla firm: research rynku w PL, identyfikacja firm i instytucji, spotkania między firmami oraz zbieranie cen. Według briefu sprzedaży lub zakupów.",
  pillarNote:
    "Biurko handlowe to główna linia; rozliczenie fakturą za usługę / umową. Streszczenia pism i pakiety Stripe — osobna linia pod tym samym dachem.",
  whoTitle: "Dla kogo",
  who: [
    {
      title: "Firma z siedzibą w TR",
      body: "Producent / hurt / marka szukająca sprzedaży, dystrybucji lub dostaw w PL.",
    },
    {
      title: "Turecka firma za granicą",
      body: "Siedziba w UE lub innym kraju — kanał, nabywca lub dostawca w Polsce.",
    },
    {
      title: "Pierwsze wejście MŚP",
      body: "Potrzebują widoczności rynku, firm, spotkań i cen — bez budowania procesu sami.",
    },
  ],
  coreTitle: "Usługi podstawowe",
  core: [
    {
      title: "Research rynku",
      body: "Zestawienie rynku PL, kanałów i typowej struktury nabywców–dostawców. Bez wymyślonych udziałów.",
    },
    {
      title: "Identyfikacja firm i instytucji",
      body: "Krótka lista kandydatów. Bez gwarancji due diligence.",
    },
    {
      title: "Spotkania między firmami",
      body: "Przedstawienia, most językowy i ustalenie spotkań. Bez zastępowania adwokata / notariusza.",
    },
    {
      title: "Zbieranie cen",
      body: "Przekaz zapytań cenowych i streszczenie odpowiedzi w Waszym języku.",
    },
  ],
  billingTitle: "Rozliczenie",
  billing:
    "Opłata doradcza za każdą zrealizowaną usługę; zakres i kwota w ofercie / fakturze. Bez publicznej stawki prowizji. Biurko handlowe nie jest SKU Stripe.",
  extendedTitle: "Rozszerzone prowadzenie (opcjonalnie)",
  extendedLead:
    "Jeśli firma akceptuje i spiszemy zakres — możemy prowadzić zakupy i logistykę po stronie PL. W sprawach celnych pomagamy przez partnerskie agencje celne.",
  extended: [
    {
      title: "Proces zakupów w PL",
      body: "W ramach briefu: rozmowy dostawcze, koordynacja zamówień i lokalny follow-up — bez gwarancji zapasu / jakości.",
    },
    {
      title: "Proces logistyki",
      body: "Planowanie i koordynacja transportu / magazynu. Nie jesteśmy licencjonowanym przewoźnikiem — transport przez partnerów.",
    },
    {
      title: "Wsparcie celne",
      body: "Pomagamy w formalnościach; zgłoszenia i agencja celna — przez partnerów. Sami nie jesteśmy agencją celną.",
    },
  ],
  processTitle: "Jak pracujemy",
  process: [
    {
      title: "1 · Brief",
      body: "Sprzedaż czy zakup, produkt, cel, język, czas — formularz lub e-mail.",
    },
    {
      title: "2 · Zakres i opłata",
      body: "Które usługi podstawowe; czy rozszerzenie; ramy faktury za usługę — na piśmie.",
    },
    {
      title: "3 · Dostawa / prowadzenie",
      body: "Research, lista, spotkania, ceny; po akceptacji — zakupy / logistyka / most celny.",
    },
  ],
  limitsTitle: "Czego nie robimy",
  limits: [
    "Nie jesteśmy adwokatem ani księgowym",
    "Nie jesteśmy licencjonowaną agencją celną / przewoźnikiem — cło i transport przez partnerów",
    "Bez gwarancji zapasu, jakości ani wyniku transakcji",
    "Bez porad inwestycyjnych",
    "Bez publicznej stawki prowizji — po ofercie / umowie",
    "Rejestracja spółki — osobna linia (pakiety + adwokat)",
  ],
  ctaPrimary: "Napisz w sprawie handlu",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Pakiety administracyjne",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Doradztwo to most i koordynacja. Opłata i zakres rozszerzony — w ofercie / umowie. Decyzja należy do Państwa.",
};

const en: DanismanlikContent = {
  meta: {
    title: "POL-TURK Advisory — market, firms, meetings, prices",
    description:
      "Poland trade desk: market research, firm identification, B2B meetings and price collection. Per-service advisory invoice. Optional: PL procurement / logistics; customs via partner agencies.",
  },
  eyebrow: "Primary line · POL-TURK Advisory",
  title: "Poland trade desk",
  lead:
    "For companies: Poland-side market research, company and institution identification, inter-company meetings and price collection — sales or procurement briefs on the same desk.",
  pillarNote:
    "The trade desk is the primary line; billing is a per-service advisory invoice / written scope. Letter summaries and Stripe admin packages sit under the same roof — not mixed.",
  whoTitle: "Who it is for",
  who: [
    {
      title: "Turkey-based company",
      body: "Manufacturer / wholesaler / brand seeking sales, distribution or supply in Poland.",
    },
    {
      title: "Turkish company abroad",
      body: "Based in the EU or elsewhere — looking for a Poland channel, buyer or supplier.",
    },
    {
      title: "First-entry SME",
      body: "Need market, candidate firms, meetings and price visibility without building the process alone.",
    },
  ],
  coreTitle: "Core services",
  core: [
    {
      title: "Market research",
      body: "Compilation of the Poland market, channels and typical buyer–supplier structure. No invented market share.",
    },
    {
      title: "Company and institution identification",
      body: "Shortlist of relevant companies and institutions. No due-diligence guarantee.",
    },
    {
      title: "Inter-company meetings",
      body: "Introductions, language bridge and meeting setup. Not legal representation or notary work.",
    },
    {
      title: "Price collection",
      body: "Relay RFQs / price requests and summarise replies in your language.",
    },
  ],
  billingTitle: "Billing",
  billing:
    "Advisory fee per delivered service; scope and amount locked in a written quote / invoice. No public commission rate. The trade desk is not a Stripe checkout SKU.",
  extendedTitle: "Extended execution (optional)",
  extendedLead:
    "If the company accepts and we write a separate scope, we can also run Poland-side procurement and logistics. For customs we help via partner customs agencies we work with.",
  extended: [
    {
      title: "Poland procurement process",
      body: "Within an approved brief: supplier talks, order coordination and local follow-up — no stock or quality guarantee.",
    },
    {
      title: "Logistics process",
      body: "Planning and coordination of transport / storage steps. We are not a licensed carrier; haulage runs through partners.",
    },
    {
      title: "Customs support",
      body: "We assist with customs formalities; declarations and licensed brokerage sit with partner agencies. We are not a customs broker ourselves.",
    },
  ],
  processTitle: "How it works",
  process: [
    {
      title: "1 · Brief",
      body: "Sales or procurement, product, target, language, timing — form or email.",
    },
    {
      title: "2 · Scope and fee",
      body: "Which core items; whether extended execution; per-service invoice frame — in writing.",
    },
    {
      title: "3 · Delivery / execution",
      body: "Research, shortlist, meetings, price pack; if approved — procurement / logistics / customs bridge.",
    },
  ],
  limitsTitle: "What we are not",
  limits: [
    "Not a lawyer or accountant",
    "Not a licensed customs broker / carrier — customs and haulage via partners",
    "No stock, quality or deal-outcome guarantee",
    "No investment advice",
    "No public commission rate — after a written quote / agreement",
    "Company registration — separate line (packages + lawyer partner)",
  ],
  ctaPrimary: "Contact about trade desk",
  ctaPrimaryHref: "#iletisim",
  ctaSecondary: "Admin packages",
  ctaSecondaryHref: "/hizmetler#paketler",
  disclaimer:
    "POL-TURK Advisory is bridging and execution coordination. Fees and extended scope lock in a written quote / agreement. Decisions stay with you.",
};

export function getDanismanlikContent(locale: string): DanismanlikContent {
  if (locale === "pl") return pl;
  if (locale === "en") return en;
  return tr;
}
