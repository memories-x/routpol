import type { ServiceDetailContent } from "@/content/service-detail-types";

/**
 * TR işletmeci → Polonya yatırım / kuruluş / faaliyet — idari danışmanlık.
 * Kanon: süreç başlatma + dil köprüsü + takip; avukat/księgowy karar ve imza.
 */

export const kurulumTr: ServiceDetailContent = {
  meta: {
    title: "Türkiye’deki işletmecilere Polonya yatırım ve kuruluş danışmanlığı",
    description:
      "Türkiye merkezli işletmecilerin Polonya’da şirket kuruluşu, faaliyet açılışı ve ilk yıl idaresinde süreç danışmanlığı. Avukat ortağı ve noter akışına ön ayak. Tescil veya hukuki sonuç taahhüdü değildir.",
  },
  eyebrow: "Kurumsal · yatırım ve kuruluş",
  title: "Polonya’da yatırım, şirket kuruluşu ve faaliyet — idari danışmanlık",
  lead:
    "Türkiye’de faaliyet gösteren işletmeciler Polonya’da şirket kurmak, şube veya faaliyet açmak istediklerinde ihtiyaç çoğu zaman yalnızca “bir avukat” değildir. İdari sıranın netleşmesi, merkez ofisin evrak hazırlığı, avukat–noter–KRS akışının başlatılması ve kayıt sonrası kurum yazılarının kaybolmamasıdır. POL-TURK bu süreçte ön ayak olur: danışmanlık, checklist, dil köprüsü ve koordinasyon.",
  positioning:
    "POL-TURK şirketi sizin adınıza tescil etmez. KRS kararı, şirket sözleşmesi, noter işlemi, vergi imzası ve hukuki temsil Polonyalı avukat ortak ile księgowy’dedir. Sunduğumuz hizmet kurumsal idari danışmanlıktır: süreç haritası, eksik evrak görünürlüğü, kuruluş dosyasının yetkili ortağa eksiksiz iletilmesi, kayıt sonrası US/ZUS/VAT-UE/banka yazılarının özeti ve merkez–Polonya arasında tek kaynak takip.",
  whoTitle: "Kimler için?",
  who: [
    {
      title: "Türkiye’deki işletmeciler — Polonya yatırımı",
      body: "TR’de faaliyet gösteren, Polonya’da sp. z o.o., şube veya faaliyet açmak isteyen işletmeciler. Kuruluş dosyasının hazırlanması, avukat–noter akışına ön ayak, kayıt sonrası idare. Tescil kararı KRS ve avukat ortağındadır.",
    },
    {
      title: "Türkiye’deki ana şirket / holding",
      body: "Polonya’da sp. z o.o., şube veya temsil planlayan gruplar; ilk yıl US / ZUS / KRS yazışmalarının merkez ofise Türkçe veya İngilizce aktarımı.",
    },
    {
      title: "Yeni kayıtlı Polonya şirketi sahipleri",
      body: "Kayıt sonrası NIP/REGON, VAT-UE, banka, muhasebe bağlantısı ve gelen ilk kurum taleplerinin netleştirilmesi.",
    },
    {
      title: "Faaliyeti büyüyen işletme",
      body: "Adres / yönetim / sermaye değişiklikleri, ek yazışmalar, çalışan oturum dosyasında işveren tarafı evrak köprüsü (oturum garantisi yok).",
    },
    {
      title: "Uzaktan yöneten ortak / müdür",
      body: "Polonya’da sürekli ofis tutmayan, dil ve kurum ritmini kaçırmak istemeyen karar vericiler.",
    },
  ],
  workstreamsTitle: "Destek alanları — yüzey değil, iş kalemleri",
  workstreamsIntro:
    "Aşağıdakiler tipik yatırım ve kuruluş yaşam döngüsüdür. Her kalem bilgilendirme + koordinasyon + (pakete göre) yazı özeti / vekaletli idari yürütmedir. Karar ve imza yetkili mercide / avukatta / muhasebecidedir.",
  workstreams: [
    {
      title: "A · Karar öncesi — yapı ve sıra",
      body: "Faaliyete geçmeden önce “ne önce gelir?” sorusunu netleştiririz. Bağlayıcı hukuki seçim avukatınızdır; biz sırayı ve evrak yükünü görünür kılarız.",
      items: [
        "Türkiye’deki işletmeci için Polonya yatırım dosyasını açmak: kapsam, takvim, avukat ortağına ilk iletim (süreç başlatma)",
        "sp. z o.o. / şube / JDG gibi yapı seçeneklerinin idari yük farkını genel çerçevede anlatmak",
        "Tipik sıra: noter / sözleşme → KRS başvurusu → NIP / REGON → VAT / VAT-UE → banka → księgowy bağlantısı",
        "Merkez ofisin hazırlaması gereken belgelerin checklist’i (pasaport, yetki, adres, imza sirküleri vb. — kurum talebine göre)",
        "Hangi işin avukata, hangisinin muhasebeciye, hangisinin size ait olduğunun yazılı ayrımı",
      ],
    },
    {
      title: "B · Kuruluş ve kayıt dönemi",
      body: "Kuruluş dosyasını avukat–noter–KRS akışına bağlarız ve dilinizde takip ederiz. Tescil kararı mercidedir.",
      items: [
        "Avukat ortağı ile randevu ve evrak listesinin Türkçe / İngilizce özeti",
        "Noter / KRS öncesi eksik belge kontrolü (bilgilendirme; belge uydurma yok)",
        "Başvuru sonrası durum: ne gönderildi, ne bekleniyor, sıradaki adım",
        "İstenirse noter idari vekaletiyle evrak teslimi / randevu koordinasyonu (Vekaletli paket)",
      ],
    },
    {
      title: "C · İlk 90 gün — kurumlarla ilk temas",
      body: "Kayıt bittikten sonra asıl yazı yağmuru başlar. Bu dönem işletmecinin en çok “ne diyor bu yazı?” sorduğu evredir.",
      items: [
        "US (vergi dairesi) bilgi / belge taleplerinin dilde özeti",
        "ZUS bildirim ve yazışmalarının ne istediği + son tarih",
        "VAT-UE / vergi numarası ile ilgili gelen yazıların netleştirilmesi",
        "Banka KYC / ek belge taleplerinin merkez ofise aktarımı",
        "Księgowy’ye iletilecek tek sayfalık operasyon notu",
      ],
    },
    {
      title: "D · İlk yıl ve sürekli faaliyet",
      body: "Şirket ayakta kaldıkça yazışma bitmez. Aylık takip paketi bu evrenin ana ürünüdür.",
      items: [
        "Ay boyunca gelen kurum yazılarının kotaya göre özeti (Aylık idari takip)",
        "Adres, yönetim kurulu, sermaye veya unvan değişikliklerinde evrak sırası bilgilendirmesi",
        "KRS değişiklik süreçlerinde avukat köprüsü + durum takibi",
        "Çalışan oturum / MOS yazılarında işveren tarafı checklist (garanti yok; otomasyon yok)",
        "Merkez ofis için dönemsel durum özeti (ne kapandı, ne açık)",
      ],
    },
    {
      title: "E · Merkez–yerel yönetim köprüsü",
      body: "Karar Türkiye’de, icra Polonya’da olduğunda en sık kırılan yer iletişimdir.",
      items: [
        "Aynı dosyanın TR / PL / EN taraflarına tutarlı özet",
        "Avukat ve muhasebeciye giden notların çelişmemesi",
        "Dosya sayfası + e-posta ile tek kaynak durum (Hesabım: e-posta + şifre)",
        "Paylaşılan operatör notlarıyla “sıradaki adım”ın yazılı kalması",
      ],
    },
  ],
  pillarsTitle: "Nasıl değer üretiriz?",
  pillars: [
    {
      title: "Dil ve anlam",
      body: "Kurum yazısını satır satır “ne istiyor / ne zamana / kim cevaplar” diline çeviririz. Bu hukuki görüş değildir; operasyonel netliktir.",
    },
    {
      title: "Sıra ve eksik görünürlüğü",
      body: "Hangi belge eksik, hangi adım bloke — checklist ile görünür. Belgeyi sizin yerinize üretmeyiz.",
    },
    {
      title: "İcra köprüsü",
      body: "Vekaletli pakette idari evrak ve randevu koordinasyonu; avukat hukuki süreci yürütür, biz bilginin ve randevunun kaybolmamasını sağlarız.",
    },
  ],
  deliverablesTitle: "Somut teslimatlar",
  deliverables: [
    "Yatırım / kuruluş durum özeti (PL / EN / TR)",
    "Faz bazlı evrak ve adım checklist’i (bilgilendirme)",
    "Her kurum yazısı için yapılandırılmış özet kartı (ne / son tarih / kim)",
    "Avukat ve księgowy’ye iletilecek tek sayfa operasyon notu",
    "Merkez ofis için kısa durum raporu (açık işler)",
    "Ödeme sonrası dosya sayfasında durum adımları ve sonuç PDF indirme",
  ],
  processTitle: "Çalışma modeli",
  processIntro:
    "Yatırım / kuruluş danışmanlığı keşif ile başlar; kapsam netleşir, ücretli yürütme paketler üzerinden yapılır.",
  process: [
    {
      title: "1 · Keşif",
      body: "Hedef yapı, mevcut belgeler, kim imza atacak, hangi şehir / avukat / muhasebeci — form veya görüşme.",
    },
    {
      title: "2 · Kapsam kilidi",
      body: "Hangi faz (A–E), hangi paket(ler), neyin avukatta kalacağı yazılı ayrılır. Garanti dili kullanılmaz.",
    },
    {
      title: "3 · Yürütme",
      body: "Checklist + yazı özetleri; yoğun dönemde Vekaletli idari yürütme; düzenli yazıda Aylık takip.",
    },
    {
      title: "4 · Raporlama",
      body: "Dosya sayfası, e-posta kapıları (bu dosya + Hesabım), merkez ofise durum notu.",
    },
  ],
  packagesTitle: "Paketler — yatırım ve kuruluş senaryosunda kullanım",
  packagesIntro:
    "Sitede satılan ürünler bunlardır. Yatırım / kuruluş hattı bu paketlerin birleşimidir.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Vekaletli idari yürütme",
      role: "Kuruluş ve yoğun dönem: noter idari vekaletiyle evrak/randevu koordinasyonu (şirket tarifesi).",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Aylık idari takip",
      role: "İlk yıl ve sonrası: ay boyunca gelen yazılar, kota, portal yükleme, aşım 40 zł.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Tek yazı",
      role: "Tek kritik kurum yazısı; taahhütsüz özet ve sonraki adım.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "Kapsama giren",
  included: [
    "Polonya faaliyet açılışı ve ilk yıl için idari süreç haritası (bilgilendirme)",
    "Kurum yazılarının PL / EN / TR özeti ve son tarih takibi",
    "Eksik evrak görünürlüğü ve taraflar arası koordinasyon notları",
    "Avukat ortağı + księgowy köprüsü (hukuki/mali karar onlarındadır)",
    "Vekaletli pakette idari evrak ve randevu koordinasyonu",
    "Merkez ofis için durum özeti",
    "Dosya sayfası ve Hesabım üzerinden takip",
  ],
  excludedTitle: "Kapsam dışı (bilinçli)",
  excluded: [
    "Şirketi sizin adınıza kurmak veya KRS / vergi kararı almak",
    "Hukuki tavsiye, sözleşme kaleme alma, dava ve temsil",
    "Muhasebe, bordro, vergi beyanı ve imza",
    "Banka hesabı açılış veya kredi garantisi",
    "Yatırım teşviki / hibe “çıkarma” vaadi",
    "Oturum / çalışma izni garantisi veya MOS otomasyonu",
    "Onay, süre veya ticari sonuç garantisi",
  ],
  engagementTitle: "Nasıl başlanır?",
  engagementBody:
    "İletişim formundan “TR işletmeci — Polonya yatırım / şirket kuruluşu” seçin. Hangi aşamada olduğunuzu yazın: karar öncesi, kuruluş, kayıt sonrası, sürekli faaliyet. Acil kurum yazısı varsa Tek yazı veya Aylık takip; yoğun idari dönem için Vekaletli idari yürütme. Telefon görüşmesi şu an sunulmuyor.",
  ctaConsult: "Yatırım / kuruluş görüşmesi",
  ctaPrimaryPackage: {
    label: "Vekaletli paket — başvur",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Aylık takip — başvur",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaBack: "Tüm hizmetlere dön",
  disclaimer:
    "İdari köprü, dil özeti ve koordinasyon hizmetidir. Şirket kuruluşu, vergi, teşvik veya hukuki sonuç taahhüt edilmez. POL-TURK avukat veya mali müşavir değildir; karar yetkili mercilere ve sözleşmeli ortaklara aittir.",
};

export const kurulumPl: ServiceDetailContent = {
  ...kurulumTr,
  meta: {
    title: "Doradztwo inwestycyjne i założenie spółki w PL dla przedsiębiorców z TR",
    description:
      "Przedsiębiorcy z Turcji: inwestycja w Polsce, uruchomienie spółki i pierwszy rok administracji. Inicjacja procesu u adwokata-partnera i notariusza. Bez gwarancji wpisu KRS.",
  },
  eyebrow: "Korporacyjne · inwestycja i założenie",
  title: "Inwestycja, spółka i działalność w Polsce — doradztwo administracyjne",
  lead:
    "Przedsiębiorcy działający w Turcji, którzy chcą założyć spółkę lub działalność w Polsce, potrzebują nie tylko adwokata: jasnej kolejności administracyjnej, przygotowania dokumentów centrali i uruchomienia ścieżki adwokat–notariusz–KRS. POL-TURK inicjuje ten proces: doradztwo, checklist, język, koordynacja.",
  positioning:
    "Nie wpisujemy spółki za Państwa. Decyzja KRS, umowa spółki, notariusz i reprezentacja prawna pozostają u adwokata-partnera i księgowego. Świadczymy korporacyjne doradztwo administracyjne: mapa procesu, braki dokumentów, przekazanie teczki partnerowi, streszczenia pism po rejestracji i jeden status centrala–Polska.",
  whoTitle: "Dla kogo?",
  who: [
    {
      title: "Przedsiębiorcy z TR — inwestycja w PL",
      body: "Podmioty z Turcji planujące sp. z o.o., oddział lub działalność. Przygotowanie teczki, inicjacja ścieżki adwokat–notariusz. Wpis KRS u urzędu i adwokata-partnera.",
    },
    {
      title: "Spółka-matka / holding w TR",
      body: "Plan sp. z o.o., oddziału lub przedstawicielstwa; pierwsze pisma US/ZUS/KRS dla centrali.",
    },
    {
      title: "Właściciele nowej spółki w PL",
      body: "Po rejestracji: NIP/REGON, VAT-UE, bank, księgowy i pierwsze wezwania.",
    },
    {
      title: "Rosnąca działalność",
      body: "Zmiany adresu / zarządu / kapitału; pisma pracowników po stronie pracodawcy (bez gwarancji pobytu).",
    },
    {
      title: "Zarządzanie zdalne",
      body: "Decydenci bez stałego biura w PL, którzy nie chcą gubić rytmu urzędów.",
    },
  ],
  workstreamsTitle: "Obszary wsparcia — pozycje robocze",
  workstreamsIntro:
    "Typowy cykl inwestycji i założenia. Każdy punkt = informacja + koordynacja + (wg pakietu) streszczenie / POA. Decyzje u urzędu / adwokata / księgowego.",
  workstreams: [
    {
      title: "A · Przed decyzją — struktura i kolejność",
      body: "Ujawniamy kolejność i obciążenie dokumentami. Wybór prawny należy do adwokata.",
      items: [
        "Otwarcie teczki inwestycyjnej dla przedsiębiorcy z TR: zakres, kalendarz, pierwsze przekazanie adwokatowi-partnerowi (inicjacja procesu)",
        "Różnice obciążenia: sp. z o.o. / oddział / JDG (ramowo)",
        "Kolejność: notariusz → KRS → NIP/REGON → VAT/VAT-UE → bank → księgowy",
        "Checklist dokumentów z centrali",
        "Podział ról: adwokat / księgowy / Państwo",
      ],
    },
    {
      title: "B · Rejestracja",
      body: "Teczka zakładana jest na ścieżkę adwokat–notariusz–KRS i śledzona w języku centrali. Decyzja wpisu należy do urzędu.",
      items: [
        "Streszczenie listy od adwokata / notariusza",
        "Kontrola braków przed KRS (informacyjnie)",
        "Status: wysłane / oczekujące / następny krok",
        "Opcjonalnie koordynacja z POA administracyjnym",
      ],
    },
    {
      title: "C · Pierwsze 90 dni",
      body: "Fala pierwszych pism urzędowych.",
      items: [
        "Wezwania US",
        "Pisma ZUS — żądanie i termin",
        "VAT-UE / numery podatkowe",
        "KYC bankowe dla centrali",
        "Jednostronicowa notatka do księgowego",
      ],
    },
    {
      title: "D · Pierwszy rok i dalej",
      body: "Pakiet miesięczny jako produkt bazowy.",
      items: [
        "Streszczenia pism w limicie miesiąca",
        "Zmiany KRS — kolejność informacyjna + most do adwokata",
        "Pisma pracowników — strona pracodawcy (bez gwarancji)",
        "Raport statusu dla centrali",
      ],
    },
    {
      title: "E · Most centrala–PL",
      body: "Jedno źródło prawdy o statusie.",
      items: [
        "Spójne streszczenie TR/PL/EN",
        "Spójne notatki do adwokata i księgowego",
        "Strona sprawy + Konto",
        "Udostępnione notatki „co dalej”",
      ],
    },
  ],
  pillarsTitle: "Jak tworzymy wartość?",
  pillars: [
    {
      title: "Język i sens",
      body: "Pismo → czego żądają / termin / kto odpowiada. To nie opinia prawna.",
    },
    {
      title: "Kolejność i braki",
      body: "Checklist blokad. Nie fabrykujemy dokumentów.",
    },
    {
      title: "Most egzekucji",
      body: "Z POA: dokumenty i wizyty; prawo u adwokata.",
    },
  ],
  deliverablesTitle: "Dostawy",
  deliverables: [
    "Streszczenie statusu inwestycji / założenia (PL / EN / TR)",
    "Checklist fazowy",
    "Karta pisma: żądanie / termin / kto",
    "Notatka operacyjna do adwokata i księgowego",
    "Krótki raport dla centrali",
    "Status i PDF na stronie sprawy",
  ],
  processTitle: "Model pracy",
  processIntro:
    "Doradztwo inwestycyjne / założenie to kombinacja pakietów po discovery — nie jeden „magiczny” produkt.",
  process: [
    {
      title: "1 · Discovery",
      body: "Struktura, dokumenty, podpisy, miasto / adwokat / księgowy.",
    },
    {
      title: "2 · Zakres",
      body: "Fazy A–E i pakiety — na piśmie, bez gwarancji.",
    },
    {
      title: "3 · Realizacja",
      body: "Checklist + streszczenia; POA lub pakiet miesięczny.",
    },
    {
      title: "4 · Raport",
      body: "Strona sprawy, e-mail, notatka dla centrali.",
    },
  ],
  packagesTitle: "Pakiety w scenariuszu inwestycji i założenia",
  packagesIntro: "Na stronie sprzedajemy te pakiety.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Prowadzenie z pełnomocnictwem",
      role: "Rejestracja i okres intensywny — koordynacja z POA (taryfa firma).",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Opieka miesięczna",
      role: "Pierwszy rok i dalej — pisma w limicie, portal, overage 40 zł.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Jedno pismo",
      role: "Krytyczne pojedyncze pismo bez abonamentu.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "W zakresie",
  included: [
    "Mapa procesu uruchomienia i pierwszego roku (informacyjnie)",
    "Streszczenie pism i terminy",
    "Widoczność braków i koordynacja stron",
    "Most adwokat + księgowy",
    "Koordynacja z POA (pakiet)",
    "Status dla centrali",
    "Tracking na stronie sprawy / Koncie",
  ],
  excludedTitle: "Poza zakresem",
  excluded: [
    "Zakładanie spółki / decyzja KRS za Państwa",
    "Porady prawne, umowy, procesy",
    "Księgowość, płace, podpis podatkowy",
    "Gwarancja konta bankowego",
    "Obietnica dotacji / zachęt",
    "Gwarancja pobytu / automatyzacja MOS",
    "Gwarancja decyzji lub wyniku biznesowego",
  ],
  engagementTitle: "Jak zacząć?",
  engagementBody:
    "Formularz — „Przedsiębiorca TR — inwestycja / założenie spółki w PL”. Podajcie fazę: przed decyzją, założenie, po wpisie, działalność bieżąca. Pilne pismo — Jedno pismo lub opieka miesięczna. Intensywny okres — pakiet z POA. Konsultacja telefoniczna nie jest obecnie dostępna.",
  ctaConsult: "Rozmowa inwestycja / założenie",
  ctaPrimaryPackage: {
    label: "Pakiet z POA — wniosek",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Pakiet miesięczny — wniosek",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaBack: "Wróć do usług",
  disclaimer:
    "Most administracyjny i językowy. Bez gwarancji założenia spółki, podatku ani wyniku prawnego. POL-TURK nie jest kancelarią ani biurem rachunkowym.",
};

export const kurulumEn: ServiceDetailContent = {
  ...kurulumTr,
  meta: {
    title: "Investment and company-setup advisory for Turkish operators in Poland",
    description:
      "Turkish business operators: investing in Poland, initiating company formation and first-year administration. We start the lawyer–notary track. Not an incorporation guarantee.",
  },
  eyebrow: "Corporate · investment and incorporation track",
  title: "Poland investment, company formation and operations — administrative advisory",
  lead:
    "Operators already running a business in Turkey who want a Polish company, branch or activity rarely need “just a lawyer”. They need a clear administrative sequence, HQ document preparation, and the lawyer–notary–KRS track started. POL-TURK initiates that process: advisory, checklists, language bridge and coordination.",
  positioning:
    "We do not register the company in your name. KRS decisions, articles, notary acts and legal representation stay with the Polish lawyer partner and the accountant. We provide corporate administrative advisory: process map, gap visibility, handing a complete file to the partner, post-registration letter summaries and a single HQ–Poland status.",
  whoTitle: "Who it is for",
  who: [
    {
      title: "Turkish operators investing in Poland",
      body: "Businesses in Turkey planning a Polish limited company, branch or activity. File preparation and initiation of the lawyer–notary track. Registration remains with KRS and the lawyer partner.",
    },
    {
      title: "Parent company / holding in Turkey",
      body: "Planning a Polish company, branch or representation; first-year letters summarised for HQ.",
    },
    {
      title: "Newly registered Polish companies",
      body: "After registration: NIP/REGON, VAT-UE, bank, bookkeeper link and first authority requests.",
    },
    {
      title: "Growing operations",
      body: "Address / board / capital changes; employer-side employee letters (no residence guarantee).",
    },
    {
      title: "Remote decision-makers",
      body: "Owners without a permanent Polish desk who still need the office rhythm.",
    },
  ],
  workstreamsTitle: "Support areas — work items, not slogans",
  workstreamsIntro:
    "Typical investment and formation lifecycle. Each item is information + coordination + (by package) letter summary / POA execution. Decisions stay with authorities, the lawyer or the accountant.",
  workstreams: [
    {
      title: "A · Pre-decision — structure & sequence",
      body: "We make order and document load visible. Legal choice remains with your lawyer.",
      items: [
        "Open an investment file for the Turkish operator: scope, calendar, first handover to the lawyer partner (process initiation)",
        "Administrative-load differences: company / branch / sole trader (framework)",
        "Typical sequence: notary → KRS → NIP/REGON → VAT/VAT-UE → bank → bookkeeper",
        "HQ document checklist",
        "Role split: lawyer / accountant / you",
      ],
    },
    {
      title: "B · Incorporation & registration",
      body: "We bind the formation file to the lawyer–notary–KRS track and follow it in HQ’s language. Registration remains with the authority.",
      items: [
        "Summary of lawyer / notary document lists",
        "Pre-KRS gap check (informational)",
        "Status: sent / waiting / next step",
        "Optional coordination under admin POA",
      ],
    },
    {
      title: "C · First 90 days",
      body: "The first wave of authority letters.",
      items: [
        "Tax-office (US) information requests",
        "ZUS letters — request and deadline",
        "VAT-UE / tax-number correspondence",
        "Bank KYC extras for HQ",
        "One-page operations note for the accountant",
      ],
    },
    {
      title: "D · First year and ongoing",
      body: "Monthly tracking is the core product.",
      items: [
        "Letter summaries within monthly quota",
        "KRS change sequences — informational + lawyer bridge",
        "Employee letters on the employer side (no guarantee)",
        "Status report for HQ",
      ],
    },
    {
      title: "E · HQ–Poland management bridge",
      body: "One source of truth for status.",
      items: [
        "Consistent TR/PL/EN summaries",
        "Aligned notes to lawyer and accountant",
        "Case page + Account",
        "Shared “what’s next” notes",
      ],
    },
  ],
  pillarsTitle: "How we create value",
  pillars: [
    {
      title: "Language & meaning",
      body: "Letter → what is asked / by when / who replies. Not a legal opinion.",
    },
    {
      title: "Sequence & gaps",
      body: "Checklists of blockers. We do not fabricate documents.",
    },
    {
      title: "Execution bridge",
      body: "With POA: documents and appointments; legal work stays with the lawyer.",
    },
  ],
  deliverablesTitle: "Concrete deliverables",
  deliverables: [
    "Investment / formation status summary (PL / EN / TR)",
    "Phase-based document checklist (informational)",
    "Structured letter card (request / deadline / owner)",
    "One-page operations note for lawyer and accountant",
    "Short status report for HQ",
    "Case-page status and result PDF download",
  ],
  processTitle: "Operating model",
  processIntro:
    "Investment / formation advisory starts with discovery; scope is locked, then paid delivery runs through the packages.",
  process: [
    {
      title: "1 · Discovery",
      body: "Target structure, documents, signatories, city / lawyer / accountant.",
    },
    {
      title: "2 · Scope lock",
      body: "Phases A–E and package mix — in writing, no guarantees.",
    },
    {
      title: "3 · Delivery",
      body: "Checklists + summaries; POA package or Monthly tracking.",
    },
    {
      title: "4 · Reporting",
      body: "Case page, email doors, HQ status note.",
    },
  ],
  packagesTitle: "Packages in the investment and formation scenario",
  packagesIntro: "These are the packages on the site.",
  packages: [
    {
      slug: "surec-yonetimi",
      title: "Admin execution with POA",
      role: "Setup and intensive periods — coordination under admin POA (company rate).",
      href: "/hizmetler/surec-yonetimi",
    },
    {
      slug: "aylik-paket",
      title: "Monthly admin tracking",
      role: "First year and beyond — quota, portal uploads, 40 zł overage.",
      href: "/hizmetler/aylik-paket",
    },
    {
      slug: "tek-yazi",
      title: "Single letter",
      role: "One critical letter without a subscription.",
      href: "/hizmetler/tek-yazi",
    },
  ],
  includedTitle: "In scope",
  included: [
    "Informational process map for launch and year one",
    "Official-letter summaries and deadline tracking",
    "Gap visibility and cross-party coordination notes",
    "Lawyer partner + accountant bridge",
    "Admin document/appointment coordination (POA package)",
    "HQ status summaries",
    "Tracking via case page and Account",
  ],
  excludedTitle: "Out of scope (on purpose)",
  excluded: [
    "Incorporating the company / obtaining KRS or tax decisions for you",
    "Legal advice, drafting contracts, litigation",
    "Bookkeeping, payroll, tax filing signatures",
    "Bank-account opening guarantees",
    "Subsidy / incentive “we will obtain it” promises",
    "Residence guarantees or MOS automation",
    "Decision, timeline or commercial-outcome guarantees",
  ],
  engagementTitle: "How to start",
  engagementBody:
    "Contact form — “TR operator — Poland investment / company formation”. State your phase: pre-decision, formation, post-registration, ongoing operations. Urgent letter — Single letter or Monthly tracking. Intensive admin — POA package. Phone consultation is not available right now.",
  ctaConsult: "Investment / formation meeting",
  ctaPrimaryPackage: {
    label: "POA package — apply",
    href: "/basvuru?paket=surec-yonetimi",
  },
  ctaSecondaryPackage: {
    label: "Monthly plan — apply",
    href: "/basvuru?paket=aylik-paket",
  },
  ctaBack: "Back to all services",
  disclaimer:
    "Admin bridge, language summary and coordination only. No incorporation, tax or legal outcome is promised. POL-TURK is not a law firm or tax office.",
};

export function getKurulumContent(locale: string): ServiceDetailContent {
  if (locale === "pl") return kurulumPl;
  if (locale === "en") return kurulumEn;
  return kurulumTr;
}
