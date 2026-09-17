import type { TrackingMode } from "./document-slots";
import type { ResidenceSelection } from "./residence-slots";
import {
  getVoivodeship,
  isVoivodeshipKey,
  type VoivodeshipKey,
} from "./voivodeships";

export type NextStepItem = {
  title: string;
  body: string;
  href?: string;
};

/**
 * Post-payment next steps shown after successful checkout.
 */
export function buildPostPaymentSteps(input: {
  locale: string;
  wojewodztwo?: string | null;
  residence?: ResidenceSelection | null;
  packageSlug?: string | null;
  trackingMode?: TrackingMode | null;
}): NextStepItem[] {
  const locale = input.locale === "pl" || input.locale === "en" ? input.locale : "tr";
  const wojKey =
    input.wojewodztwo && isVoivodeshipKey(input.wojewodztwo)
      ? (input.wojewodztwo as VoivodeshipKey)
      : null;
  const woj = wojKey ? getVoivodeship(wojKey) : undefined;
  const isTracking = input.packageSlug === "dosya-takibi";
  const isSelf = isTracking && input.trackingMode !== "with-poa";
  const isPoa = isTracking && input.trackingMode === "with-poa";

  const copy = {
    tr: {
      packSelf: {
        title: "1) Ödeme alındı — paket hazırlığı",
        body: "Kaynak belgeleriniz kaydedildi. Evrak paketini hazırlayıp belirttiğiniz adrese kargolayacağız. Başvuruyu siz yapacaksınız; süreç takibini birlikte sürdürürüz.",
      },
      packPoa: {
        title: "1) Ödeme alındı — vekaletli takip",
        body: "Belgeleriniz ve vekalet onayınız kaydedildi. Süreç yönetimi için sizinle iletişime geçeceğiz.",
      },
      pack: {
        title: "1) Ödeme alındı",
        body: "Ödemeniz kaydedildi. Bilgilendirme ve yönlendirme için sizinle iletişime geçeceğiz.",
      },
      ship: {
        title: "2) Kargo sonrası",
        body: "Paketi teslim alınca içeriği kontrol edin. Eksik veya düzeltme varsa bize yazın.",
      },
      mosGuide: {
        title: isSelf ? "3) MOS başvuru rehberi" : "2) MOS başvuru rehberi",
        body: "Elektronik başvuru adımları için rehberimizi inceleyebilirsiniz.",
        href: "/rehber/mos",
      },
      mos: {
        title: isSelf ? "4) Başvuruyu siz tamamlayın" : "3) MOS portalı",
        body: isSelf
          ? "Kendi MOS hesabınızla başvuruyu gönderin. Giriş bilgilerinizi kimseyle paylaşmayın. UPO belgesini saklayın."
          : "Resmi portal: mos.cudzoziemcy.gov.pl. Hesap bilgilerinizi paylaşmayın.",
        href: "https://mos.cudzoziemcy.gov.pl",
      },
      edor: {
        title: isSelf ? "5) e-Doręczenia" : "4) e-Doręczenia",
        body: "Kurum yazışmaları için e-Doręczenia kutusu oluşturmanız önerilir.",
        href: "https://www.gov.pl/web/e-doreczenia",
      },
      wsc: {
        title: isSelf ? "6) Yerel kurum bilgisi" : "5) Yerel kurum bilgisi",
        body: woj
          ? `${woj.labelTr}: ilgili voyvodalık bilgilendirme sayfası.`
          : "Voyvodalık seçtiyseniz ilgili kurum bağlantısı dosyanızda kayıtlıdır.",
      },
      inpol: {
        title: isSelf ? "7) Durum paylaşımı" : "6) Başvuru durumu",
        body: isSelf
          ? "MOS / inPOL durumunu bizimle paylaşın; vekaletsiz takip bu şekilde sürer."
          : "MOS üzerinden başvurudan sonra (varsa) inPOL üzerinden durumunuzu takip edebilirsiniz.",
      },
      fingerprint: {
        title: isSelf ? "8) Şahsen işlem" : "7) Şahsen işlem",
        body: "Kurum sizi parmak izi ve kimlik doğrulama için çağırabilir. Randevuya şahsen katılım gerekir.",
      },
    },
    pl: {
      packSelf: {
        title: "1) Płatność przyjęta — przygotowanie paczki",
        body: "Dokumenty źródłowe zapisane. Przygotujemy paczkę i wyślemy na wskazany adres. Wniosek składają Państwo; monitoring prowadzimy wspólnie.",
      },
      packPoa: {
        title: "1) Płatność przyjęta — opieka z pełnomocnictwem",
        body: "Dokumenty i akceptacja pełnomocnictwa zapisane. Skontaktujemy się w sprawie prowadzenia sprawy.",
      },
      pack: {
        title: "1) Płatność przyjęta",
        body: "Płatność została zarejestrowana. Skontaktujemy się w sprawie informacji i wskazówek.",
      },
      ship: {
        title: "2) Po dostawie",
        body: "Po otrzymaniu paczki sprawdźcie zawartość. Braki lub poprawki — napiszcie do nas.",
      },
      mosGuide: {
        title: isSelf ? "3) Przewodnik MOS" : "2) Przewodnik MOS",
        body: "Zapoznaj się z przewodnikiem po elektronicznym składaniu wniosku.",
        href: "/rehber/mos",
      },
      mos: {
        title: isSelf ? "4) Państwo składają wniosek" : "3) Portal MOS",
        body: isSelf
          ? "Złóżcie wniosek na własnym koncie MOS. Nie udostępniajcie danych logowania. Zachowajcie UPO."
          : "Portal: mos.cudzoziemcy.gov.pl. Nie udostępniajcie danych logowania.",
        href: "https://mos.cudzoziemcy.gov.pl",
      },
      edor: {
        title: isSelf ? "5) e-Doręczenia" : "4) e-Doręczenia",
        body: "Zalecamy założenie skrzynki e-Doręczenia do korespondencji z urzędem.",
        href: "https://www.gov.pl/web/e-doreczenia",
      },
      wsc: {
        title: isSelf ? "6) Informacje lokalne" : "5) Informacje lokalne",
        body: woj
          ? `${woj.labelPl}: strona informacyjna właściwego urzędu.`
          : "Link do urzędu jest zapisany przy sprawie, jeśli wybrano województwo.",
      },
      inpol: {
        title: isSelf ? "7) Udostępnianie statusu" : "6) Status sprawy",
        body: isSelf
          ? "Prosimy o przekazywanie statusu MOS / inPOL — tak prowadzimy monitoring bez pełnomocnictwa."
          : "Po złożeniu wniosku w MOS mogą Państwo śledzić status w inPOL (jeśli otrzymacie kod).",
      },
      fingerprint: {
        title: isSelf ? "8) Stawiennictwo osobiste" : "7) Stawiennictwo osobiste",
        body: "Urząd może wezwać Państwa w celu pobrania odcisków palców i weryfikacji tożsamości.",
      },
    },
    en: {
      packSelf: {
        title: "1) Payment received — pack preparation",
        body: "Your source documents are saved. We will prepare the pack and ship it to your address. You file the application; we continue tracking with you.",
      },
      packPoa: {
        title: "1) Payment received — POA process management",
        body: "Your documents and power-of-attorney acceptance are recorded. We will contact you about managing the case.",
      },
      pack: {
        title: "1) Payment received",
        body: "Your payment has been recorded. We will contact you with guidance and next steps.",
      },
      ship: {
        title: "2) After delivery",
        body: "When the pack arrives, check the contents. Contact us if anything is missing or needs correction.",
      },
      mosGuide: {
        title: isSelf ? "3) MOS application guide" : "2) MOS application guide",
        body: "Please review our guide to electronic filing.",
        href: "/rehber/mos",
      },
      mos: {
        title: isSelf ? "4) You complete the filing" : "3) MOS portal",
        body: isSelf
          ? "File on your own MOS account. Do not share login credentials. Keep the UPO."
          : "Official portal: mos.cudzoziemcy.gov.pl. Do not share login credentials.",
        href: "https://mos.cudzoziemcy.gov.pl",
      },
      edor: {
        title: isSelf ? "5) e-Doręczenia" : "4) e-Doręczenia",
        body: "We recommend creating an e-Doręczenia mailbox for official correspondence.",
        href: "https://www.gov.pl/web/e-doreczenia",
      },
      wsc: {
        title: isSelf ? "6) Local authority information" : "5) Local authority information",
        body: woj
          ? `${woj.labelEn}: information page of the competent office.`
          : "Your local authority link is stored on the case if a voivodeship was selected.",
      },
      inpol: {
        title: isSelf ? "7) Status updates" : "6) Application status",
        body: isSelf
          ? "Share MOS / inPOL status with us — that is how tracking works without a power of attorney."
          : "After filing in MOS, you may track status in inPOL when a code is provided.",
      },
      fingerprint: {
        title: isSelf ? "8) In-person appointment" : "7) In-person appointment",
        body: "The authority may summon you for fingerprints and identity verification.",
      },
    },
  }[locale];

  const steps: NextStepItem[] = [];

  if (isSelf) {
    steps.push(copy.packSelf, copy.ship);
  } else if (isPoa) {
    steps.push(copy.packPoa);
  } else {
    steps.push(copy.pack);
  }

  steps.push(
    { ...copy.mosGuide, href: copy.mosGuide.href },
    copy.mos,
    copy.edor,
  );

  if (woj) {
    steps.push({ ...copy.wsc, href: woj.wscUrl });
    if (woj.inpolUrl) {
      steps.push({ ...copy.inpol, href: woj.inpolUrl });
    } else {
      steps.push(copy.inpol);
    }
  } else {
    steps.push(copy.wsc, copy.inpol);
  }

  steps.push(copy.fingerprint);
  return steps;
}
