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
  quotaQuoteLabel: string;
  quotaGetPrice: string;
  quotaTalk: string;
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
  /** e.g. "Adım" / "Krok" / "Step" — shown as "Adım 2 / 4 · Bilgiler" */
  stepWord: string;
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
  uploadChoose: string;
  uploadDrop: string;
  uploadFormats: string;
  uploadClear: string;
  city: string;
  cityHint: string;
  cityRequired: string;
  onsitePayNote: string;
  onsiteBrief: string;
  onsiteBriefHint: string;
  onsiteBriefRequired: string;
  onsiteUpload: string;
  onsiteUploadHint: string;
  stepsOnsite: [string, string, string, string];
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
  quotaQuoteLabel: "12 pism i więcej",
  quotaGetPrice: "Uzyskaj cenę",
  quotaTalk: "Porozmawiajmy",
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
    "Masz już aktywną opiekę miesięczną (abonament). Kolejne pisma: e-mail z płatności lub Konto. Nie kupujcie drugiego pakietu — odnowienie kartą jest automatyczne.",
  emailLocked: "E-mail z konta — nie można zmienić przy zamówieniu.",
  packages: {
    "tek-yazi": "Jedno pismo",
    "aylik-paket": "Miesięczna opieka administracyjna",
    "surec-yonetimi": "Prowadzenie z pełnomocnictwem",
    "telefon-gorusme": "Konsultacja telefoniczna (1 godz.)",
    "yerinde-eslik": "Towarzyszenie na miejscu (pół dnia)",
  },
  steps: ["Usługa", "Dla kogo", "Dane", "Płatność"],
  stepsPhone: ["Usługa", "Dla kogo", "Termin", "Płatność"],
  stepsOnsite: ["Usługa", "Dla kogo", "Miasto", "Płatność"],
  stepWord: "Krok",
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
  city: "Miasto (Polska)",
  cityHint: "Gdzie towarzyszenie — np. Warszawa, Kraków, Gdańsk.",
  cityRequired: "Podajcie miasto.",
  onsitePayNote:
    "Pół dnia (ok. 3–4 godz.), 1 urząd / 1 wizyta — 450 zł. Dojazd poza miastem uzgadniany osobno. Gwarancji decyzji urzędu nie ma.",
  onsiteBrief: "Czego dotyczy wizyta — krótki opis",
  onsiteBriefHint: "Urząd / banka / biuro, cel wizyty, preferowany dzień. Kilka zdań.",
  onsiteBriefRequired: "Napiszcie krótko cel wizyty.",
  onsiteUpload: "Formularz / pismo w sprawie (opcjonalnie)",
  onsiteUploadHint:
    "PDF / JPG / PNG — jeśli macie wezwanie lub formularz; pomaga przygotować wizytę.",
  uploadChoose: "Wybierz pliki",
  uploadDrop: "Przeciągnijcie pismo tutaj lub wybierzcie z dysku",
  uploadFormats: "PDF, JPG lub PNG — można kilka plików",
  uploadClear: "Usuń",
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
  quotaQuoteLabel: "12 letters and above",
  quotaGetPrice: "Get a quote",
  quotaTalk: "Talk to us",
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
    "You already have active monthly tracking (subscription). Extra letters: payment email or Account. Do not buy a second package — the card renews automatically.",
  emailLocked: "Email is locked to your account for this order.",
  packages: {
    "tek-yazi": "Single letter",
    "aylik-paket": "Monthly admin tracking",
    "surec-yonetimi": "Admin execution with POA",
    "telefon-gorusme": "Phone consultation (1 hour)",
    "yerinde-eslik": "On-site accompaniment (half day)",
  },
  steps: ["Service", "Who for", "Details", "Payment"],
  stepsPhone: ["Service", "Who for", "Slot", "Payment"],
  stepsOnsite: ["Service", "Who for", "City", "Payment"],
  stepWord: "Step",
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
  city: "City (Poland)",
  cityHint: "Where the accompaniment is — e.g. Warsaw, Kraków, Gdańsk.",
  cityRequired: "Enter the city.",
  onsitePayNote:
    "Half day (about 3–4 hours), one office / one visit — 450 zł. Travel outside the city is agreed separately. No guarantee of office outcomes.",
  onsiteBrief: "What the visit is about — short briefing",
  onsiteBriefHint: "Office / bank / office visit purpose, preferred day. A few sentences.",
  onsiteBriefRequired: "Write a short briefing for the visit.",
  onsiteUpload: "Related form / letter (optional)",
  onsiteUploadHint:
    "PDF / JPG / PNG if you have a summons or form — helps us prepare.",
  uploadChoose: "Choose files",
  uploadDrop: "Drag the letter here or choose from your device",
  uploadFormats: "PDF, JPG or PNG — multiple files allowed",
  uploadClear: "Clear",
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
  quotaQuoteLabel: "12 yazı ve üstü",
  quotaGetPrice: "Fiyat alın",
  quotaTalk: "Görüşün",
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
    "Aktif aylık aboneliğiniz var. Ek yazı: ödeme e-postası veya Hesabım. İkinci paket almayın — karttan otomatik yenilenir.",
  emailLocked: "E-posta hesabınıza kilitli — siparişte değiştirilemez.",
  packages: {
    "tek-yazi": "Tek yazı",
    "aylik-paket": "Aylık idari takip",
    "surec-yonetimi": "Vekaletli idari yürütme",
    "telefon-gorusme": "Telefon görüşmesi (1 saat)",
    "yerinde-eslik": "Yerinde eşlik (yarı gün)",
  },
  steps: ["Hizmet", "Kim için", "Bilgiler", "Ödeme"],
  stepsPhone: ["Hizmet", "Kim için", "Tarih", "Ödeme"],
  stepsOnsite: ["Hizmet", "Kim için", "Şehir", "Ödeme"],
  stepWord: "Adım",
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
  city: "Şehir (Polonya)",
  cityHint: "Eşliğin olacağı şehir — örn. Warszawa, Kraków, Gdańsk.",
  cityRequired: "Şehir yazın.",
  onsitePayNote:
    "Yarı gün (yaklaşık 3–4 saat), 1 kurum / 1 randevu — 450 zł. Şehir dışı ulaşım ayrıca netleştirilir. Kurum kararı garantisi yoktur.",
  onsiteBrief: "Ziyaret konusu — kısa bilgilendirme",
  onsiteBriefHint: "Urząd / banka / ofis, amaç, tercih ettiğiniz gün. Birkaç cümle.",
  onsiteBriefRequired: "Ziyaret amacı hakkında kısa bilgi yazın.",
  onsiteUpload: "İlgili form / yazı (isteğe bağlı)",
  onsiteUploadHint:
    "Çağrı veya form varsa PDF / JPG / PNG — hazırlık için.",
  uploadChoose: "Dosya seç",
  uploadDrop: "Resmi yazıyı buraya sürükleyin veya cihazdan seçin",
  uploadFormats: "PDF, JPG veya PNG — birden fazla dosya olabilir",
  uploadClear: "Kaldır",
};

export function orderFormLabels(locale: string): OrderFormLabels {
  if (locale === "pl") return orderFormPl;
  if (locale === "en") return orderFormEn;
  return orderFormTr;
}
