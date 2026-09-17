import { getPublicEnv } from "@/lib/env";
import type { CaseRecord } from "@/lib/cases/types";

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

function mailLocale(record: CaseRecord): string {
  return record.customer.resultLocale ?? record.locale;
}

function accountPortalLine(locale: string, packageSlug?: string): string {
  const base = getPublicEnv().siteUrl.replace(/\/$/, "");
  const loc = locale === "pl" || locale === "en" ? locale : "tr";
  const url = `${base}/${loc}/hesabim`;
  const monthly =
    packageSlug === "aylik-paket"
      ? locale === "pl"
        ? " Kolejne pisma w pakiecie miesięcznym także stamtąd."
        : locale === "en"
          ? " Upload more letters on your monthly plan there too."
          : " Aylık pakette yeni yazıları da oradan yüklersiniz."
      : "";
  if (locale === "pl") {
    return `Wszystkie sprawy i profil: ${url} — link na e-mail (bez hasła).${monthly}`;
  }
  if (locale === "en") {
    return `All cases and profile: ${url} — we email you a sign-in link (no password).${monthly}`;
  }
  return `Tüm dosyalarınız ve profil: ${url} — e-postanıza giriş linki gelir (şifre yok).${monthly}`;
}

function copy(
  locale: string,
  kind: CaseMailKind,
  url: string,
  name: string,
  noteBody?: string,
  packageSlug?: string,
): { subject: string; text: string } {
  const note = (noteBody ?? "").trim();
  const accountHint =
    kind === "paid_link" ? accountPortalLine(locale, packageSlug) : "";

  if (locale === "pl") {
    if (kind === "paid_link") {
      return {
        subject: "POL-TURK — link do sprawy",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Płatność przyjęta. Oto prywatny link do sprawy — zachowaj go:",
          url,
          "",
          "Na tej stronie pobierzesz dokumenty i wynik (bez konta).",
          accountHint,
          "Nie jesteśmy kancelarią — koordynujemy i informujemy w Twoim języku.",
          "",
          "POL-TURK",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    if (kind === "in_progress_link") {
      return {
        subject: "POL-TURK — sprawa w toku",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Twoja sprawa jest w toku. Status i pliki:",
          url,
          "",
          "POL-TURK",
        ].join("\n"),
      };
    }
    if (kind === "shared_note") {
      return {
        subject: "POL-TURK — aktualizacja sprawy",
        text: [
          `Dzień dobry ${name},`,
          "",
          "Udostępniliśmy aktualizację:",
          note ? `“${note}”` : "",
          "",
          "Pliki i wynik pobierzesz na stronie sprawy (bez logowania):",
          url,
          "",
          "POL-TURK",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    return {
      subject: "POL-TURK — wynik gotowy",
      text: [
        `Dzień dobry ${name},`,
        "",
        "Wynik jest gotowy. Pobierz go z tej strony (bez logowania):",
        url,
        "",
        "POL-TURK",
      ].join("\n"),
    };
  }

  if (locale === "en") {
    if (kind === "paid_link") {
      return {
        subject: "POL-TURK — your case link",
        text: [
          `Hello ${name},`,
          "",
          "Payment received. Keep this private case link:",
          url,
          "",
          "Download your files and result on that page. No account required.",
          accountHint,
          "We are not a law firm — we coordinate and update you in your language.",
          "",
          "POL-TURK",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    if (kind === "in_progress_link") {
      return {
        subject: "POL-TURK — case in progress",
        text: [
          `Hello ${name},`,
          "",
          "Your case is in progress. Check status and files here:",
          url,
          "",
          "POL-TURK",
        ].join("\n"),
      };
    }
    if (kind === "shared_note") {
      return {
        subject: "POL-TURK — case update",
        text: [
          `Hello ${name},`,
          "",
          "We shared an update with you:",
          note ? `"${note}"` : "",
          "",
          "Download your files from your case page (no login):",
          url,
          "",
          "POL-TURK",
        ]
          .filter((line) => line !== "")
          .join("\n"),
      };
    }
    return {
      subject: "POL-TURK — result ready",
      text: [
        `Hello ${name},`,
        "",
        "Your result is ready. Download it from this page (no login):",
        url,
        "",
        "POL-TURK",
      ].join("\n"),
    };
  }

  if (kind === "paid_link") {
    return {
      subject: "POL-TURK — başvuru linkiniz",
      text: [
        `Merhaba ${name},`,
        "",
        "Ödemeniz alındı. Özel dosya sayfanızın linki (saklayın):",
        url,
        "",
        "Evrak ve sonucu o sayfadan indirirsiniz. Üyelik veya şifre yok.",
        accountHint,
        "Hukuk bürosu değiliz — dilinizde bilgilendirme ve koordinasyon sağlarız.",
        "",
        "POL-TURK",
      ]
        .filter((line) => line !== "")
        .join("\n"),
    };
  }
  if (kind === "in_progress_link") {
    return {
      subject: "POL-TURK — dosyanız işleniyor",
      text: [
        `Merhaba ${name},`,
        "",
        "Dosyanız şu an takipte / hazırlanıyor. Güncel durum ve evrak:",
        url,
        "",
        "POL-TURK",
      ].join("\n"),
    };
  }
  if (kind === "shared_note") {
    return {
      subject: "POL-TURK — dosyanızda güncelleme",
      text: [
        `Merhaba ${name},`,
        "",
        "Sizinle bir güncelleme paylaştık:",
        note ? `"${note}"` : "",
        "",
        "Dosyalarınızı bu sayfadan indirin (giriş yok). Sonuç varsa aynı sayfada “Sonuç” başlığı altındadır:",
        url,
        "",
        "POL-TURK",
      ]
        .filter((line) => line !== "")
        .join("\n"),
    };
  }
  return {
    subject: "POL-TURK — sonucunuz hazır",
    text: [
      `Merhaba ${name},`,
      "",
      "Sonuç hazır. İndirmek için bu sayfayı açın (giriş yok):",
      url,
      "",
      "POL-TURK",
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
    process.env.CONTACT_EMAIL_FROM ?? "POL-TURK <onboarding@resend.dev>";

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
  const { subject, text } = copy(
    mailLocale(record),
    kind,
    url,
    record.customer.fullName,
    opts?.noteBody,
    record.packageSlug,
  );
  return sendViaResend(record.customer.email, subject, text);
}
