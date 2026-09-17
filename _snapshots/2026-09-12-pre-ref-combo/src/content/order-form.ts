import { TEK_YAZI_MAX_PAGES } from "@/lib/cases/count-pages";
import type { LetterPackageSlug } from "@/lib/cases/document-slots";

export type OrderFormLabels = {
  title: string;
  package: string;
  fullName: string;
  companyName: string;
  nip: string;
  nipHint: string;
  nipRequired: string;
  nipInvalid: string;
  matter: string;
  email: string;
  phone: string;
  notes: string;
  resultLocale: string;
  pagesAuto: string;
  pagesCounting: string;
  pagesFail: string;
  pagesTooMany: string;
  quota: string;
  entity: string;
  sahis: string;
  sirket: string;
  upload: string;
  amount: string;
  submit: string;
  uploading: string;
  paying: string;
  successDev: string;
  error: string;
  cancelled: string;
  monthlyBlocked: string;
  emailLocked: string;
  packages: Record<LetterPackageSlug, string>;
  steps: [string, string, string, string];
  stepsPhone: [string, string, string, string];
  summaryTitle: string;
  next: string;
  back: string;
  step2Required: string;
  fileRequired: string;
  personHeading: string;
  companyHeading: string;
  contactName: string;
  entityPickLead: string;
  entityPickRequired: string;
  entitySahisHint: string;
  entitySirketHint: string;
  phonePayNote: string;
  callAt: string;
  callAtHint: string;
  callAtRequired: string;
  phoneBrief: string;
  phoneBriefHint: string;
  phoneBriefRequired: string;
  phoneUpload: string;
  phoneUploadHint: string;
};

const orderFormPl: OrderFormLabels = {
  title: "Wniosek",
  package: "Usługa",
  fullName: "Imię i nazwisko",
  companyName: "Nazwa firmy",
  nip: "NIP nabywcy",
  nipHint: "Wymagany dla firmy (faktura KSeF).",
  nipRequired: "NIP firmy jest wymagany.",
  nipInvalid: "Niepoprawny NIP (10 cyfr).",
  matter: "Temat / urząd (np. ZUS — składki)",
  email: "E-mail",
  phone: "Telefon",
  notes: "Uwagi (opcjonalnie)",
  resultLocale: "Język streszczenia",
  pagesAuto: "Liczba stron z pliku — cena ustala się automatycznie",
  pagesCounting: "Liczenie stron…",
  pagesFail: "Nie udało się odczytać liczby stron z pliku.",
  pagesTooMany: `Maks. ${TEK_YAZI_MAX_PAGES} stron w pakiecie jedno pismo.`,
  quota: "Liczba pism w miesiącu",
  entity: "Rodzaj klienta",
  sahis: "Osoba prywatna",
  sirket: "Firma",
  personHeading: "Dane osoby",
  companyHeading: "Dane firmy",
  contactName: "Imię i nazwisko osoby kontaktowej",
  upload: "Pismo (PDF / JPG / PNG)",
  amount: "Do zapłaty",
  submit: "Zapłać i wyślij",
  uploading: "Wysyłanie…",
  paying: "Przetwarzanie…",
  successDev: "Płatność przyjęta. Otwieramy Twoją sprawę…",
  error: "Nie udało się. Spróbuj ponownie.",
  cancelled: "Płatność anulowana. Możesz spróbować ponownie.",
  monthlyBlocked:
    "Masz już aktywny pakiet miesięczny. Kolejne pisma: e-mail z płatności. Nowy pakiet po zakończeniu okresu.",
  emailLocked: "E-mail z konta — nie można zmienić przy zamówieniu.",
  packages: {
    "tek-yazi": "Jedno pismo",
    "aylik-paket": "Miesięczna opieka administracyjna",
    "surec-yonetimi": "Prowadzenie z pełnomocnictwem",
    "telefon-gorusme": "Konsultacja telefoniczna (1 godz.)",
  },
  steps: ["Usługa", "Osoba / firma", "Dane", "Plik i płatność"],
  summaryTitle: "Podsumowanie",
  next: "Dalej",
  back: "Wstecz",
  step2Required: "Uzupełnij wymagane pola.",
  fileRequired: "Dodaj pismo.",
  entityPickLead: "Dla kogo kupujecie usługę?",
  entityPickRequired: "Wybierzcie osobę prywatną albo firmę.",
  entitySahisHint: "Imię i nazwisko, kontakt.",
  entitySirketHint: "Nazwa, NIP, osoba kontaktowa.",
  phonePayNote:
    "1 godzina rozmowy — 150 zł. Temat i termin w kroku «Dane». Formularz urzędowy — opcjonalnie w ostatnim kroku. Kolejna godzina = kolejne zamówienie.",
  callAt: "Preferowany termin rozmowy",
  callAtHint:
    "Kalendarz: data i godzina (1 godz.), czas warszawski (Europe/Warsaw). Potwierdzenie od operatora.",
  callAtRequired: "Wybierzcie datę i godzinę.",
  phoneBrief: "O czym rozmowa — krótki opis",
  phoneBriefHint: "Urząd, sprawa, czego oczekujecie. Minimum kilka zdań.",
  phoneBriefRequired: "Napiszcie krótko temat rozmowy.",
  phoneUpload: "Formularz / pismo w sprawie (opcjonalnie)",
  phoneUploadHint:
    "PDF / JPG / PNG — jeśli macie druk urzędowy lub pismo; pomaga przygotować rozmowę.",
  stepsPhone: ["Usługa", "Osoba / firma", "Termin i temat", "Ewentualny plik i płatność"],
};

const orderFormEn: OrderFormLabels = {
  title: "Apply",
  package: "Service",
  fullName: "Full name",
  companyName: "Company name",
  nip: "Buyer NIP",
  nipHint: "Required for a company (KSeF invoice).",
  nipRequired: "Company NIP is required.",
  nipInvalid: "Invalid NIP (10 digits).",
  matter: "Subject / office (e.g. ZUS — contributions)",
  email: "Email",
  phone: "Phone",
  notes: "Notes (optional)",
  resultLocale: "Summary language",
  pagesAuto: "Page count from file — price is set automatically",
  pagesCounting: "Counting pages…",
  pagesFail: "Could not read page count from the file.",
  pagesTooMany: `Max ${TEK_YAZI_MAX_PAGES} pages on the single-letter package.`,
  quota: "Letters per month",
  entity: "Customer type",
  sahis: "Individual",
  sirket: "Company",
  personHeading: "Personal details",
  companyHeading: "Company details",
  contactName: "Contact person’s full name",
  upload: "Letter (PDF / JPG / PNG)",
  amount: "Amount due",
  submit: "Pay and submit",
  uploading: "Uploading…",
  paying: "Processing…",
  successDev: "Payment received. Opening your case…",
  error: "Something went wrong. Try again.",
  cancelled: "Payment cancelled. You can try again.",
  monthlyBlocked:
    "You already have an active monthly package. Extra letters: payment-email file list. New package after the period ends.",
  emailLocked: "Email is locked to your account for this order.",
  packages: {
    "tek-yazi": "Single letter",
    "aylik-paket": "Monthly admin tracking",
    "surec-yonetimi": "Admin execution with POA",
    "telefon-gorusme": "Phone consultation (1 hour)",
  },
  steps: ["Service", "Individual / company", "Details", "Upload & pay"],
  summaryTitle: "Summary",
  next: "Continue",
  back: "Back",
  step2Required: "Fill in the required fields.",
  fileRequired: "Add the letter file.",
  entityPickLead: "Who is this purchase for?",
  entityPickRequired: "Choose individual or company.",
  entitySahisHint: "Full name and contact.",
  entitySirketHint: "Company name, NIP, contact person.",
  phonePayNote:
    "One hour of call — 150 zł. Topic and time in Details. Related office form — optional on the last step. Extra hour = another order.",
  callAt: "Preferred call date and time",
  callAtHint:
    "Calendar: date and time (1 hour), Warsaw time (Europe/Warsaw). Operator confirms the slot.",
  callAtRequired: "Choose a date and time.",
  phoneBrief: "What the call is about — short briefing",
  phoneBriefHint: "Office, issue, what you need. A few sentences.",
  phoneBriefRequired: "Write a short briefing for the call.",
  phoneUpload: "Related form / letter (optional)",
  phoneUploadHint:
    "PDF / JPG / PNG if you have an office form or letter — helps us prepare.",
  stepsPhone: ["Service", "Individual / company", "Slot & topic", "Optional file & pay"],
};

const orderFormTr: OrderFormLabels = {
  title: "Başvuru",
  package: "Hizmet",
  fullName: "Ad Soyad",
  companyName: "Şirket unvanı",
  nip: "Alıcı NIP",
  nipHint: "Kurumsal siparişte zorunlu (KSeF faturası).",
  nipRequired: "Firma NIP zorunlu.",
  nipInvalid: "Geçersiz NIP (10 hane).",
  matter: "Konu / kurum (ör. ZUS — katkı)",
  email: "E-posta",
  phone: "Telefon",
  notes: "Not (isteğe bağlı)",
  resultLocale: "Özet dili",
  pagesAuto: "Sayfa sayısı dosyadan — fiyat otomatik",
  pagesCounting: "Sayfa sayılıyor…",
  pagesFail: "Dosyadan sayfa sayısı okunamadı.",
  pagesTooMany: `Tek yazıda en fazla ${TEK_YAZI_MAX_PAGES} sayfa.`,
  quota: "Ayda kaç yazı",
  entity: "Müşteri türü",
  sahis: "Bireysel",
  sirket: "Kurumsal",
  personHeading: "Kişi bilgileri",
  companyHeading: "Şirket bilgileri",
  contactName: "Yetkili adı soyad",
  upload: "Yazı (PDF / JPG / PNG)",
  amount: "Ödenecek tutar",
  submit: "Öde ve gönder",
  uploading: "Yükleniyor…",
  paying: "İşleniyor…",
  successDev: "Ödeme alındı. Başvurunuz açılıyor…",
  error: "İşlem başarısız. Tekrar deneyin.",
  cancelled: "Ödeme iptal edildi. Tekrar deneyebilirsiniz.",
  monthlyBlocked:
    "Aktif aylık paketiniz var. Ek yazı: ödeme e-postanızdaki dosya listesi. Yeni paket dönem bitince.",
  emailLocked: "E-posta hesabınıza kilitli — siparişte değiştirilemez.",
  packages: {
    "tek-yazi": "Tek yazı",
    "aylik-paket": "Aylık idari takip",
    "surec-yonetimi": "Vekaletli idari yürütme",
    "telefon-gorusme": "Telefon görüşmesi (1 saat)",
  },
  steps: ["Hizmet", "Bireysel / Kurumsal", "Bilgiler", "Yükleme & ödeme"],
  summaryTitle: "Özet",
  next: "Devam",
  back: "Geri",
  step2Required: "Zorunlu alanları doldurun.",
  fileRequired: "Yazı dosyası ekleyin.",
  entityPickLead: "Hizmeti kim için alıyorsunuz?",
  entityPickRequired: "Bireysel veya Kurumsal seçin.",
  entitySahisHint: "Ad soyad ve iletişim.",
  entitySirketHint: "Unvan, NIP, yetkili kişi.",
  phonePayNote:
    "1 saatlik görüşme — 150 zł. Konu ve tarih Bilgiler adımında. İlgili form varsa son adımda yükleyin. Ek saat = aynı paketten yeni sipariş.",
  callAt: "Tercih edilen görüşme tarihi ve saati",
  callAtHint:
    "Takvimden tarih ve saat (1 saat), Varşova saati (Europe/Warsaw). Slot operatör teyidiyle kesinleşir.",
  callAtRequired: "Tarih ve saat seçin.",
  phoneBrief: "Görüşülecek konu — kısa bilgilendirme",
  phoneBriefHint: "Hangi kurum, ne konuşulacak, ne bekliyorsunuz. Birkaç cümle.",
  phoneBriefRequired: "Görüşme konusu hakkında kısa bilgi yazın.",
  phoneUpload: "İlgili form / yazı (isteğe bağlı)",
  phoneUploadHint:
    "Kurum formu veya konuyla ilgili evrak varsa PDF / JPG / PNG — hazırlık için.",
  stepsPhone: ["Hizmet", "Bireysel / Kurumsal", "Tarih ve konu", "Dosya (isteğe bağlı) & ödeme"],
};

export function orderFormLabels(locale: string): OrderFormLabels {
  if (locale === "pl") return orderFormPl;
  if (locale === "en") return orderFormEn;
  return orderFormTr;
}
