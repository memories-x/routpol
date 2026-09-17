import type { FaqItem } from "./types";

export type FaqBlock = {
  title: string;
  items: FaqItem[];
};

export const faqTr: FaqBlock = {
  title: "Sıkça sorulan sorular",
  items: [
    {
      id: "ne",
      question: "Ne yapıyorsunuz?",
      answer:
        "Polonya’daki resmi yazı, evrak ve idari süreçleri takip ederiz. Ne istendiğini, son tarihi ve sıradaki adımı dilinizde netleştiririz. Hukuki süreç avukat ortağındadır.",
    },
    {
      id: "kim",
      question: "Kimler için?",
      answer:
        "Türkiye’den Polonya’da işi veya şirketi olan girişimciler ve firmalar; ayrıca Polonya’da faaliyet gösteren Türk ve yabancı sermayeli şirketler ile şahıslar.",
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
        "Muhasebeci defteri tutar. Resmi yazı ve idari süreç çoğu zaman yönetim ile avukat arasında kaybolur. Biz yazıyı dilinizde açıklar ve takibi tutarız. Mali kısım muhasebecide, hukuk avukatta kalır.",
    },
    {
      id: "fiyat",
      question: "Ücret nasıl?",
      answer:
        "Aylık idari takip 160 zł’den / ay; vekaletli idari yürütme şirket 1 200 zł, şahıs 650 zł. Aylık paketler aboneliktir: karttan otomatik yenilenir; o ay yazı veya işlem olmasa da dönem ücreti alınır; kullanılmayan kota iade edilmez. Tek yazı 50 zł’den. Avukat ücreti ayrıdır. Detay hizmetlerde.",
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
        "Hesabınızdan (`/hesabim`, e-posta + şifre) ve ödeme e-postasındaki dosya linkinden. Sonuç hazır olunca aynı yerlerden indirirsiniz — evrak mail eki olarak gitmez.",
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
};

export const faqPl: FaqBlock = {
  title: "Częste pytania",
  items: [
    {
      id: "ne",
      question: "Co robicie?",
      answer:
        "Śledzimy pisma urzędowe, dokumenty i procesy administracyjne w Polsce. Wyjaśniamy, czego chcą, jaki jest termin i co dalej — w Waszym języku. Proces prawny zostaje u adwokata-partnera.",
    },
    {
      id: "kim",
      question: "Dla kogo?",
      answer:
        "Przedsiębiorcy i firmy z Turcji ze sprawami w PL. Również firmy zagraniczne w Polsce oraz osoby prywatne.",
    },
    {
      id: "dil",
      question: "W jakich językach pracujecie?",
      answer:
        "PL / EN / TR. Tłumaczenie przysięgłe — przez tłumaczy przysięgłych; koszt osobno.",
    },
    {
      id: "muhasebe",
      question: "Mamy księgowego — po co Wy?",
      answer:
        "Księgowy prowadzi księgi. Pismo i proces często giną między zarządem a adwokatem. My wyjaśniamy język i status; podatki u księgowego, prawo u adwokata.",
    },
    {
      id: "fiyat",
      question: "Ile to kosztuje?",
      answer:
        "Opieka miesięczna od 160 zł / mies.; pełnomocnictwo: firma 1 200 zł, osoba 650 zł. Pakiety miesięczne to abonament: karta odnawia się automatycznie; opłata także gdy w danym miesiącu nie ma pism lub spraw; niewykorzystany limit bez zwrotu. Jedno pismo od 50 zł. Honorarium adwokata osobno. Szczegóły w usługach.",
    },
    {
      id: "vekalet",
      question: "Idziecie do urzędu?",
      answer:
        "Tylko w pakiecie z pełnomocnictwem notarialnym (sprawy administracyjne). Reprezentacja prawna — u adwokata-partnera.",
    },
    {
      id: "sonuc",
      question: "Jak odebrać wynik?",
      answer:
        "Z konta (`/hesabim`, e-mail + hasło) oraz z linku do sprawy w e-mailu po płatności. Gdy wynik jest gotowy — pobieracie stamtąd. Pliku nie wysyłamy w załączniku.",
    },
    {
      id: "garanti",
      question: "Czy gwarantujecie decyzję?",
      answer:
        "Nie. Decyzja należy do urzędu i uprawnionych. Dajemy wyjaśnienie, śledzenie i koordynację — bez obietnicy wyniku.",
    },
    {
      id: "avukat",
      question: "Jesteście adwokatem?",
      answer:
        "Nie. Proces prawny prowadzą polscy adwokaci-partnerzy. My wyjaśniamy pisma w Waszym języku i śledzimy sprawę.",
    },
  ],
};

export const faqEn: FaqBlock = {
  title: "FAQ",
  items: [
    {
      id: "ne",
      question: "What do you do?",
      answer:
        "We track official letters, documents and administrative processes in Poland. We clarify what is asked, the deadline and the next step — in your language. Legal process stays with the lawyer partner.",
    },
    {
      id: "kim",
      question: "Who is this for?",
      answer:
        "Entrepreneurs and companies from Turkey with work in Poland. Also foreign companies in Poland and individuals.",
    },
    {
      id: "dil",
      question: "Which languages do you work in?",
      answer:
        "PL / EN / TR. Sworn translation goes through sworn translators; pricing is separate.",
    },
    {
      id: "muhasebe",
      question: "We already have a bookkeeper. Why you?",
      answer:
        "The bookkeeper keeps the books. Letters and process often get lost between management and the lawyer. We clarify language and status; tax stays with the bookkeeper, law with the lawyer.",
    },
    {
      id: "fiyat",
      question: "What does it cost?",
      answer:
        "Monthly admin tracking from 160 zł / month; POA execution: company 1 200 zł, individual 650 zł. Monthly packages are subscriptions: the card renews automatically; the fee is charged even with no letters or work that month; unused quota is not refunded. Single letter from 50 zł. Lawyer fees are separate. Details under services.",
    },
    {
      id: "vekalet",
      question: "Do you go to the office?",
      answer:
        "Only on the notarial-POA admin package. Legal representation stays with the lawyer partner.",
    },
    {
      id: "sonuc",
      question: "How do I get the result?",
      answer:
        "From your account (`/hesabim`, email + password) and from the case link in the payment email. When the result is ready you download it there — we do not attach the file.",
    },
    {
      id: "garanti",
      question: "Do you guarantee the outcome?",
      answer:
        "No. The institution and licensed professionals decide. We provide explanation, tracking and coordination — not a promised result.",
    },
    {
      id: "avukat",
      question: "Are you a lawyer?",
      answer:
        "No. Polish lawyer partners run the legal process. We explain letters in your language and track the case.",
    },
  ],
};

export function getFaq(locale: string): FaqBlock {
  if (locale === "pl") return faqPl;
  if (locale === "en") return faqEn;
  return faqTr;
}
