import { getPublicEnv } from "@/lib/env";

type MailLocale = "tr" | "pl" | "en";

function copy(
  locale: MailLocale,
  renewUrl: string,
  accountUrl: string,
  endDate: string,
): { subject: string; text: string } {
  if (locale === "pl") {
    return {
      subject: "POL-TURK — pakiet miesięczny kończy się wkrótce",
      text: [
        "Dzień dobry,",
        "",
        `Wasz pakiet miesięczny kończy się ${endDate}.`,
        "",
        "Odnowienie (ten sam profil, bez ponownego wpisywania danych):",
        renewUrl,
        "",
        "Konto / historia spraw:",
        accountUrl,
        "",
        "POL-TURK",
      ].join("\n"),
    };
  }
  if (locale === "en") {
    return {
      subject: "POL-TURK — monthly package ending soon",
      text: [
        "Hello,",
        "",
        `Your monthly package ends on ${endDate}.`,
        "",
        "Renew (same profile, pre-filled):",
        renewUrl,
        "",
        "Account / case history:",
        accountUrl,
        "",
        "POL-TURK",
      ].join("\n"),
    };
  }
  return {
    subject: "POL-TURK — aylık paketiniz bitiyor",
    text: [
      "Merhaba,",
      "",
      `Aylık paketiniz ${endDate} tarihinde bitiyor.`,
      "",
      "Yenilemek için (profiliniz hazır dolacak):",
      renewUrl,
      "",
      "Hesabım / tüm dosyalar:",
      accountUrl,
      "",
      "POL-TURK",
    ].join("\n"),
  };
}

export async function sendPeriodRenewalReminderMail(params: {
  to: string;
  locale: string;
  periodEnd: Date;
}): Promise<"resend" | "noop"> {
  const base = getPublicEnv().siteUrl.replace(/\/$/, "");
  const loc =
    params.locale === "pl" || params.locale === "en" ? params.locale : "tr";
  const renewUrl = `${base}/${loc}/basvuru?paket=aylik-paket`;
  const accountUrl = `${base}/${loc}/hesabim`;
  const endDate = params.periodEnd.toLocaleDateString(
    loc === "pl" ? "pl-PL" : loc === "en" ? "en-GB" : "tr-TR",
  );
  const { subject, text } = copy(loc, renewUrl, accountUrl, endDate);

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "POL-TURK <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[period-renewal-mail:noop]", { to: params.to, renewUrl });
    }
    return "noop";
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [params.to], subject, text }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[period-renewal-mail:resend]", res.status, body);
    throw new Error("RENEWAL_MAIL_FAILED");
  }
  return "resend";
}
