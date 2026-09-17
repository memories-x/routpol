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
      subject: "ROUTEPOL — pakiet miesięczny kończy się wkrótce",
      text: [
        "Dzień dobry,",
        "",
        `Wasz okres miesięczny kończy się ${endDate}.`,
        "",
        "Jeśli macie aktywny abonament Stripe, karta odnowi się automatycznie — nie musicie kupować ponownie.",
        "",
        "Jeśli abonamentu nie ma: odnowienie (ten sam profil):",
        renewUrl,
        "",
        "Biurko spraw / historia:",
        accountUrl,
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  if (locale === "en") {
    return {
      subject: "ROUTEPOL — monthly package ending soon",
      text: [
        "Hello,",
        "",
        `Your monthly period ends on ${endDate}.`,
        "",
        "If you have an active Stripe subscription, the card renews automatically — you do not need to buy again.",
        "",
        "If there is no subscription: renew (same profile):",
        renewUrl,
        "",
        "Work desk / case history:",
        accountUrl,
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  return {
    subject: "ROUTEPOL — aylık paketiniz bitiyor",
    text: [
      "Merhaba,",
      "",
      `Aylık döneminiz ${endDate} tarihinde bitiyor.`,
      "",
      "Aktif Stripe aboneliğiniz varsa karttan otomatik yenilenir — yeniden satın almanız gerekmez.",
      "",
      "Abonelik yoksa yenilemek için (profiliniz hazır dolacak):",
      renewUrl,
      "",
      "İş masası / tüm dosyalar:",
      accountUrl,
      "",
      "ROUTEPOL",
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
    process.env.CONTACT_EMAIL_FROM ?? "ROUTEPOL <onboarding@resend.dev>";

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
