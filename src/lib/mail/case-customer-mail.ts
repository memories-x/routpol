import { callTzHint, formatCallSlot } from "@/lib/cases/call-schedule";
import type { CaseRecord } from "@/lib/cases/types";
import { getPublicEnv } from "@/lib/env";

export type CaseMailKind =
  | "paid_link"
  | "ready_link"
  | "in_progress_link"
  | "shared_note";

export type CaseMailChannel = "resend" | "noop";

export function casePageUrl(record: CaseRecord): string {
  const base = getPublicEnv().siteUrl.replace(/\/$/, "");
  return `${base}/${record.locale}/basvuru/basarili?case=${record.id}&token=${record.accessToken}`;
}

export function hesabimUrl(locale: string): string {
  const base = getPublicEnv().siteUrl.replace(/\/$/, "");
  const loc = locale === "pl" || locale === "en" ? locale : "tr";
  return `${base}/${loc}/hesabim`;
}

function mailLocale(record: CaseRecord): string {
  return record.customer.resultLocale ?? record.locale;
}

function callBriefLines(
  locale: string,
  callRequestedAt?: string | null,
): string[] {
  if (!callRequestedAt) return [];
  const when = formatCallSlot(callRequestedAt, locale);
  const tz = callTzHint(locale);
  if (locale === "pl") {
    return [
      `Preferowany termin rozmowy: ${when} (${tz}).`,
      "Potwierdzenie slotu od operatora — śledźcie stronę sprawy.",
      "",
    ];
  }
  if (locale === "en") {
    return [
      `Preferred call time: ${when} (${tz}).`,
      "Operator will confirm the slot — check your case page.",
      "",
    ];
  }
  return [
    `Tercih edilen görüşme: ${when} (${tz}).`,
    "Slot operatör teyidiyle kesinleşir — dosya sayfanızı takip edin.",
    "",
  ];
}

/** Two doors: this case link + Hesabım (email + password). */
export function dualDoorLines(
  locale: string,
  caseUrl: string,
  packageSlug?: string,
): string[] {
  const account = hesabimUrl(locale);
  const monthly =
    packageSlug === "aylik-paket"
      ? locale === "pl"
        ? " Kolejne pisma w pakiecie miesięcznym także stamtąd."
        : locale === "en"
          ? " Upload more letters on your monthly plan there too."
          : " Aylık pakette yeni yazıları da oradan yüklersiniz."
      : "";

  if (locale === "pl") {
    return [
      "Ta sprawa (status + pliki + wynik):",
      caseUrl,
      "",
      `Wszystkie sprawy — Konto (e-mail i hasło): ${account}.${monthly}`,
    ];
  }
  if (locale === "en") {
    return [
      "This case (status + files + result):",
      caseUrl,
      "",
      `All work — Account (email and password): ${account}.${monthly}`,
    ];
  }
  return [
    "Bu dosya (durum + evrak + sonuç):",
    caseUrl,
    "",
    `Tüm işleriniz — Hesabım (e-posta ve şifre): ${account}.${monthly}`,
  ];
}

export function buildCaseCustomerMailCopy(params: {
  locale: string;
  kind: CaseMailKind;
  caseUrl: string;
  name: string;
  noteBody?: string;
  packageSlug?: string;
  callRequestedAt?: string | null;
}): { subject: string; text: string } {
  const { locale, kind, caseUrl, name, packageSlug } = params;
  const note = (params.noteBody ?? "").trim();
  const doors = dualDoorLines(locale, caseUrl, packageSlug);
  const callLines =
    packageSlug === "telefon-gorusme"
      ? callBriefLines(locale, params.callRequestedAt)
      : [];

  if (locale === "pl") {
    if (kind === "paid_link") {
      return {
        subject:
          packageSlug === "telefon-gorusme"
            ? "ROUTEPOL — konsultacja telefoniczna"
            : "ROUTEPOL — link do sprawy",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Płatność przyjęta. Zachowaj te dwa adresy:",
          "",
          ...callLines,
          ...doors,
          "",
          "Nie jesteśmy kancelarią — koordynujemy i informujemy w Twoim języku.",
          "",
          "ROUTEPOL",
        ].join("\n"),
      };
    }
    if (kind === "in_progress_link") {
      return {
        subject: "ROUTEPOL — sprawa w toku",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Sprawa jest w toku. Status i pliki:",
          "",
          ...doors,
          "",
          "ROUTEPOL",
        ].join("\n"),
      };
    }
    if (kind === "shared_note") {
      return {
        subject: "ROUTEPOL — aktualizacja sprawy",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Udostępniliśmy aktualizację:",
          note ? `“${note}”` : "",
          "",
          ...doors,
          "",
          "ROUTEPOL",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    return {
      subject: "ROUTEPOL — wynik gotowy",
      text: [
        `Dzień dobry ${name},`,
        "",
        "Wynik jest gotowy. Pobierz go ze strony sprawy (duży przycisk „Pobierz”):",
        "",
        ...doors,
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }

  if (locale === "en") {
    if (kind === "paid_link") {
      return {
        subject:
          packageSlug === "telefon-gorusme"
            ? "ROUTEPOL — phone consultation"
            : "ROUTEPOL — your case link",
        text: [
          `Hello ${name},`,
          "",
          "Payment received. Keep these two addresses:",
          "",
          ...callLines,
          ...doors,
          "",
          "We are not a law firm — we coordinate and update you in your language.",
          "",
          "ROUTEPOL",
        ].join("\n"),
      };
    }
    if (kind === "in_progress_link") {
      return {
        subject: "ROUTEPOL — case in progress",
        text: [
          `Hello ${name},`,
          "",
          "Your case is in progress. Status and files:",
          "",
          ...doors,
          "",
          "ROUTEPOL",
        ].join("\n"),
      };
    }
    if (kind === "shared_note") {
      return {
        subject: "ROUTEPOL — case update",
        text: [
          `Hello ${name},`,
          "",
          "We shared an update with you:",
          note ? `"${note}"` : "",
          "",
          ...doors,
          "",
          "ROUTEPOL",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    return {
      subject: "ROUTEPOL — result ready",
      text: [
        `Hello ${name},`,
        "",
        "Your result is ready. Download it from the case page (large Download button):",
        "",
        ...doors,
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }

  if (kind === "paid_link") {
    return {
      subject:
        packageSlug === "telefon-gorusme"
          ? "ROUTEPOL — telefon görüşmesi"
          : "ROUTEPOL — dosya linkiniz",
      text: [
        `Merhaba ${name},`,
        "",
        "Ödemeniz alındı. Bu iki adresi saklayın:",
        "",
        ...callLines,
        ...doors,
        "",
        "Hukuk bürosu değiliz — dilinizde bilgilendirme ve koordinasyon sağlarız.",
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  if (kind === "in_progress_link") {
    return {
      subject: "ROUTEPOL — dosyanız işleniyor",
      text: [
        `Merhaba ${name},`,
        "",
        "Dosyanız takipte / hazırlanıyor. Güncel durum ve evrak:",
        "",
        ...doors,
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  if (kind === "shared_note") {
    return {
      subject: "ROUTEPOL — dosyanızda güncelleme",
      text: [
        `Merhaba ${name},`,
        "",
        "Sizinle bir güncelleme paylaştık:",
        note ? `"${note}"` : "",
        "",
        ...doors,
        "",
        "ROUTEPOL",
      ]
        .filter((line) => line !== "")
        .join("\n"),
    };
  }
  return {
    subject: "ROUTEPOL — sonucunuz hazır",
    text: [
      `Merhaba ${name},`,
      "",
      "Sonuç hazır. Dosya sayfasından indirin (büyük İndir düğmesi):",
      "",
      ...doors,
      "",
      "ROUTEPOL",
    ].join("\n"),
  };
}

async function sendViaResend(
  to: string,
  subject: string,
  text: string,
): Promise<CaseMailChannel> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "ROUTEPOL <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[case-mail:noop]", { to, subject });
    }
    return "noop";
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[case-mail:resend]", res.status, body);
    throw new Error("CASE_MAIL_FAILED");
  }
  return "resend";
}

/** Link-only mail to customer. Never attaches files (inbox/support load). */
export async function sendCaseCustomerMail(
  record: CaseRecord,
  kind: CaseMailKind,
  opts?: { noteBody?: string },
): Promise<CaseMailChannel> {
  const url = casePageUrl(record);
  const { subject, text } = buildCaseCustomerMailCopy({
    locale: mailLocale(record),
    kind,
    caseUrl: url,
    name: record.customer.fullName,
    noteBody: opts?.noteBody,
    packageSlug: record.packageSlug,
    callRequestedAt: record.pricingMeta?.callRequestedAt,
  });
  return sendViaResend(record.customer.email, subject, text);
}
