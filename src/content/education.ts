/** Üniversite / eğitim süreç yönlendirmesi — bilgilendirme; kabul garantisi yok. */

export type EducationContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  positioning: string;
  whoTitle: string;
  who: { title: string; body: string }[];
  pillarsTitle: string;
  pillars: { title: string; body: string }[];
  deliverablesTitle: string;
  deliverables: string[];
  processTitle: string;
  processIntro: string;
  process: { title: string; body: string }[];
  includedTitle: string;
  included: string[];
  excludedTitle: string;
  excluded: string[];
  engagementTitle: string;
  engagementBody: string;
  ctaConsult: string;
  ctaLetter: string;
  ctaBack: string;
  disclaimer: string;
};

export const educationTr: EducationContent = {
  meta: {
    title: "Üniversite ve eğitim süreç yönlendirmesi",
    description:
      "Polonya’da yükseköğretim ve eğitim süreçlerinde idari yönlendirme, evrak sırası ve resmi yazı takibi. Kabul veya vize garantisi değildir.",
  },
  eyebrow: "Eğitim · idari takip",
  title: "Üniversite ve eğitim süreç yönlendirmesi",
  lead:
    "Polonya’daki yükseköğretim ve eğitim kurumlarıyla ilişkili idari süreçlerde dil köprüsü, dokümantasyon düzeni ve adım adım yönlendirme sunarız. Karar üniversiteye, kuruma ve yetkili mercilere aittir.",
  positioning:
    "ROUTEPOL bir eğitim danışmanlığı ajansı veya aracı kurum değildir; öğrenci yerleştirmeyiz, kontenjan satmayız. Ürünümüz: süreç şeffaflığı, evrak netliği ve resmi yazıların PL / EN / TR açıklaması — aile, öğrenci adayı, eğitim kurumu ve işveren (çalışan eğitimi) için aynı kurumsal standart.",
  whoTitle: "Kimler için?",
  who: [
    {
      title: "Öğrenci adayı ve aile",
      body: "Başvuru öncesi / sonrası evrak listesi, üniversite ve yurt yazışmalarının anlaşılması, son tarihler ve sıradaki idari adımın netleştirilmesi.",
    },
    {
      title: "Üniversite, dil okulu, eğitim birimi",
      body: "Türkçe konuşan aday veya aile ile kurum arasında yazışma köprüsü; eksik belge bildiriminin dilde açıklanması; dosya takibinin kaybolmaması.",
    },
    {
      title: "İşveren / sponsor kurum",
      body: "Çalışanın eğitim veya staj sürecine bağlı resmi yazıların özeti ve kurum içi iletim notu (hukuki temsil ayrıdır).",
    },
  ],
  pillarsTitle: "Hizmetin üç ayağı",
  pillars: [
    {
      title: "Süreç haritası",
      body: "Tipik sıra: başvuru dosyası → kurum talepleri → kayıt / kabul yazısı → varsa yurt / katkı / ek belgeler. Harita geneldir; her üniversitenin prosedürü değişebilir.",
    },
    {
      title: "Dokümantasyon düzeni",
      body: "Hangi belgenin kime, hangi dilde ve hangi biçimde iletileceği checklist’i. Eksik / tutarsız alanları işaretleriz; belgeyi sizin yerinize uydurmayız.",
    },
    {
      title: "Resmi yazı özeti ve takip",
      body: "Üniversite, yurt, US/ZUS veya ilgili kurumdan gelen yazının ne istediği, son tarihi ve sıradaki adım — dilinizde. Tek yazı veya aylık takip paketleriyle bağlanır.",
    },
  ],
  deliverablesTitle: "Teslimatlar",
  deliverables: [
    "Yazılı süreç özeti (PL / EN / TR seçenekli) — ne yapıldı, sırada ne var",
    "Evrak checklist’i (kurum talebine göre)",
    "Kurum yazısının yapılandırılmış özeti (paket siparişinde)",
    "Muhasebeci, avukat ortağı veya aileye iletilecek net not",
    "Dosya sayfanızda durum görünürlüğü (ödeme sonrası)",
  ],
  processTitle: "Çalışma biçimi",
  processIntro:
    "Ön görüşme ile kapsam netleşir. Acil tek yazı varsa paket; eğitim yönlendirmesi çoğunlukla form + takip paketidir.",
  process: [
    {
      title: "1 · Keşif",
      body: "Hedef kurum / program tipi, mevcut belgeler, yaklaşan tarihler. Kısa form veya görüşme.",
    },
    {
      title: "2 · Kapsam kilidi",
      body: "Yönlendirme mi, tek yazı özeti mi, yoksa aylık takip mi — yazılı olarak ayrılır. Garanti dili kullanılmaz.",
    },
    {
      title: "3 · Yürütme",
      body: "Checklist, yazı özetleri, gerekirse vekaletli idari koordinasyon (ayrı paket). Güncellemeler dosya sayfasında ve e-postada.",
    },
    {
      title: "4 · Kapanış / devam",
      body: "Sonuç özeti teslimi veya aylık abonelikte yeni yazıların takibi. Abonelik karttan otomatik yenilenir; yazı gelmese de dönem ücreti alınır.",
    },
  ],
  includedTitle: "Kapsama giren",
  included: [
    "Eğitim / üniversite sürecinde idari yönlendirme ve evrak sırası bilgilendirmesi",
    "Kurum yazılarının PL / EN / TR açıklaması",
    "Eksik belge ve son tarih görünürlüğü",
    "Kurum ile aile / aday arasında dil köprüsü (yazışma netleştirme)",
    "Gerekirse Polonyalı avukat ortağına yönlendirme",
  ],
  excludedTitle: "Kapsam dışı",
  excluded: [
    "Üniversite kabulü, burs veya kontenjan taahhüdü",
    "Vize / oturum kararı veya başvuru otomasyonu",
    "Akademik danışmanlık (program / not / kariyer seçimi vaadi)",
    "Resmî aracı kurum veya acente temsili",
    "Hukuki tavsiye, dava ve mali müşavirlik imzası",
  ],
  engagementTitle: "Nasıl başlanır?",
  engagementBody:
    "Eğitim yönlendirmesi için önce kısa görüşme formu. Elinizde kurum yazısı varsa doğrudan Tek yazı veya Aylık abonelik ile başlayabilirsiniz. Vekaletli idari yürütme (abonelik), noter idari vekaleti gerektiren randevu / evrak koordinasyonu içindir.",
  ctaConsult: "Eğitim yönlendirme görüşmesi",
  ctaLetter: "Elimde yazı var — başvur",
  ctaBack: "Tüm hizmetlere dön",
  disclaimer:
    "Bu hizmet bilgilendirme ve idari koordinasyon amaçlıdır. Üniversite, devlet kurumu veya konsolosluk kararlarını taahhüt etmez. ROUTEPOL avukat veya eğitim aracısı değildir.",
};

export const educationPl: EducationContent = {
  meta: {
    title: "Guidance procesu edukacyjnego i uniwersyteckiego",
    description:
      "Most administracyjny przy rekrutacji i korespondencji uczelni w PL. Bez gwarancji przyjęcia ani wizy.",
  },
  eyebrow: "Edukacja · tracking administracyjny",
  title: "Guidance procesu edukacyjnego i uniwersyteckiego",
  lead:
    "Przy procesach związanych z uczelniami i edukacją w Polsce zapewniamy most językowy, porządek dokumentacji i jasne kolejne kroki administracyjne. Decyzje należą do uczelni i urzędów.",
  positioning:
    "ROUTEPOL nie jest agencją edukacyjną ani pośrednikiem rekrutacyjnym — nie lokujemy studentów i nie sprzedajemy miejsc. Produkt: przejrzystość procesu, checklist dokumentów i streszczenia pism PL / EN / TR.",
  whoTitle: "Dla kogo?",
  who: [
    {
      title: "Kandydat i rodzina",
      body: "Lista dokumentów, zrozumienie pism uczelni / akademika, terminy i kolejny krok administracyjny.",
    },
    {
      title: "Uczelnia, szkoła językowa, jednostka edukacyjna",
      body: "Most między kandydatem/rodziną a instytucją; wyjaśnienie braków dokumentów; tracking sprawy.",
    },
    {
      title: "Pracodawca / sponsor",
      body: "Streszczenie pism związanych ze szkoleniem lub stażem pracownika (reprezentacja prawna osobno).",
    },
  ],
  pillarsTitle: "Trzy filary",
  pillars: [
    {
      title: "Mapa procesu",
      body: "Typowa kolejność: dossier → żądania uczelni → decyzja / rejestracja → akademik / opłaty / załączniki. Procedury różnią się.",
    },
    {
      title: "Porządek dokumentacji",
      body: "Checklist: co, do kogo, w jakim języku i formie. Oznaczamy braki — nie „uzupełniamy” za Państwa.",
    },
    {
      title: "Streszczenie pism i tracking",
      body: "Czego żąda pismo, termin, kolejny krok — w Waszym języku. Pakiet jedno pismo lub miesięczny.",
    },
  ],
  deliverablesTitle: "Dostawy",
  deliverables: [
    "Pisemne streszczenie statusu (PL / EN / TR)",
    "Checklist dokumentów",
    "Uporządkowane streszczenie pisma (przy zamówieniu pakietu)",
    "Notatka dla księgowego / adwokata / rodziny",
    "Status na stronie sprawy (po płatności)",
  ],
  processTitle: "Jak pracujemy",
  processIntro:
    "Zakres ustalany na rozmowie. Pilne pismo — pakiet; guidance edukacyjny zwykle: formularz + tracking.",
  process: [
    {
      title: "1 · Discovery",
      body: "Cel, dokumenty, terminy — formularz lub rozmowa.",
    },
    {
      title: "2 · Zakres",
      body: "Guidance, jedno pismo lub pakiet miesięczny — na piśmie. Bez języka gwarancji.",
    },
    {
      title: "3 · Realizacja",
      body: "Checklist, streszczenia, ewentualnie koordynacja z POA. Aktualizacje na stronie sprawy i e-mailu.",
    },
    {
      title: "4 · Zamknięcie / kontynuacja",
      body: "Wynik lub tracking w abonamencie miesięcznym. Abonament odnawia się kartą automatycznie; opłata także bez pism w danym miesiącu.",
    },
  ],
  includedTitle: "W zakresie",
  included: [
    "Guidance administracyjny przy procesie edukacyjnym / uczelni",
    "Wyjaśnienie pism PL / EN / TR",
    "Widoczność braków i terminów",
    "Most językowy instytucja ↔ rodzina / kandydat",
    "W razie potrzeby most do adwokata-partnera",
  ],
  excludedTitle: "Poza zakresem",
  excluded: [
    "Gwarancja przyjęcia, stypendium lub miejsca",
    "Decyzja wizowa / pobytowa lub automatyzacja wniosków",
    "Doradztwo akademickie z obietnicą wyniku",
    "Reprezentacja jako agencja rekrutacyjna",
    "Porady prawne, procesy i podpis księgowy",
  ],
  engagementTitle: "Jak zacząć?",
  engagementBody:
    "Najpierw krótki formularz konsultacji. Macie pismo uczelni — Jedno pismo lub abonament miesięczny (odnowienie automatyczne). POA — osobny abonament.",
  ctaConsult: "Konsultacja edukacyjna",
  ctaLetter: "Mam pismo — złóż wniosek",
  ctaBack: "Wróć do usług",
  disclaimer:
    "Usługa informacyjna i koordynacyjna. Nie gwarantuje decyzji uczelni ani urzędu. ROUTEPOL nie jest kancelarią ani agencją edukacyjną.",
};

export const educationEn: EducationContent = {
  meta: {
    title: "University & education process guidance",
    description:
      "Administrative guidance and letter tracking for higher-education processes in Poland. Not an admission or visa guarantee.",
  },
  eyebrow: "Education · admin bridge",
  title: "University & education process guidance",
  lead:
    "For higher-education and training-related administrative paths in Poland we provide a language bridge, document order and clear next administrative steps. Decisions stay with the university and the authorities.",
  positioning:
    "ROUTEPOL is not an education agency or placement intermediary — we do not place students or sell seats. Our product is process clarity, document checklists and official-letter summaries in PL / EN / TR.",
  whoTitle: "Who it is for",
  who: [
    {
      title: "Applicants and families",
      body: "Document lists, understanding university / dorm letters, deadlines and the next administrative step.",
    },
    {
      title: "Universities, language schools, education units",
      body: "A bridge between Turkish-speaking applicants/families and the institution; explaining missing documents; keeping the file on track.",
    },
    {
      title: "Employers / sponsors",
      body: "Summaries of letters tied to employee training or internships (legal representation is separate).",
    },
  ],
  pillarsTitle: "Three pillars",
  pillars: [
    {
      title: "Process map",
      body: "Typical sequence: dossier → institution requests → admission / registration letter → dorm / fees / annexes. Procedures vary by school.",
    },
    {
      title: "Documentation order",
      body: "Checklist: what goes where, in which language and format. We flag gaps — we do not fabricate papers.",
    },
    {
      title: "Letter summary & tracking",
      body: "What the letter asks, the deadline, the next step — in your language. Via single-letter or monthly packages.",
    },
  ],
  deliverablesTitle: "Deliverables",
  deliverables: [
    "Written status summary (PL / EN / TR options)",
    "Document checklist",
    "Structured letter summary (when a package is ordered)",
    "Clear note for accountant / lawyer partner / family",
    "Status on your case page (after payment)",
  ],
  processTitle: "How we work",
  processIntro:
    "Scope is locked in an intro call. Urgent letters use a package; education guidance is usually the form + tracking package.",
  process: [
    {
      title: "1 · Discovery",
      body: "Target institution, documents on hand, upcoming dates — form or call.",
    },
    {
      title: "2 · Scope lock",
      body: "Guidance, single letter or monthly plan — in writing. No guarantee language.",
    },
    {
      title: "3 · Delivery",
      body: "Checklists, summaries, optional POA coordination. Updates on the case page and by email.",
    },
    {
      title: "4 · Close / continue",
      body: "Result handoff or ongoing tracking on a monthly subscription. The subscription renews on the card automatically; the fee applies even with no letters that month.",
    },
  ],
  includedTitle: "In scope",
  included: [
    "Administrative guidance for education / university processes",
    "Official-letter explanation PL / EN / TR",
    "Visibility of missing items and deadlines",
    "Language bridge institution ↔ family / applicant",
    "Referral to the Polish lawyer partner when needed",
  ],
  excludedTitle: "Out of scope",
  excluded: [
    "Admission, scholarship or seat guarantees",
    "Visa / residence decisions or application automation",
    "Academic counselling that promises an outcome",
    "Acting as a recruitment agency",
    "Legal advice, litigation and tax filing signatures",
  ],
  engagementTitle: "How to start",
  engagementBody:
    "Start with a short consultation form. If you already hold an institutional letter, use Single letter or Monthly subscription (auto-renew). POA coordination is a separate subscription.",
  ctaConsult: "Request education consult",
  ctaLetter: "I have a letter — apply",
  ctaBack: "Back to all services",
  disclaimer:
    "Informational and coordination service only. No university or government decision is promised. ROUTEPOL is not a law firm or education agency.",
};

export function getEducationContent(locale: string): EducationContent {
  if (locale === "pl") return educationPl;
  if (locale === "en") return educationEn;
  return educationTr;
}
