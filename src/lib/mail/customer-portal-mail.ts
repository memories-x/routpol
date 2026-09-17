import { getPublicEnv } from "@/lib/env";

type MailLocale = "tr" | "pl" | "en";

function copy(
  locale: MailLocale,
  url: string,
): { subject: string; text: string } {
  if (locale === "pl") {
    return {
      subject: "ROUTEPOL — link do konta",
      text: [
        "Dzień dobry,",
        "",
        "Oto link do Waszego konta ROUTEPOL (ważny 15 minut, jednorazowy):",
        url,
        "",
        "Jeśli to nie Wy — zignorujcie tę wiadomość.",
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  if (locale === "en") {
    return {
      subject: "ROUTEPOL — sign in to your account",
      text: [
        "Hello,",
        "",
        "Use this link to open your ROUTEPOL account (valid 15 minutes, one-time use):",
        url,
        "",
        "If you did not request this, ignore this email.",
        "",
        "ROUTEPOL",
      ].join("\n"),
    };
  }
  return {
    subject: "ROUTEPOL — şifre sıfırlama",
    text: [
      "Merhaba,",
      "",
      "ROUTEPOL hesabınız için şifre sıfırlama linki (15 dakika, tek kullanımlık):",
      url,
      "",
      "Bu isteği siz yapmadıysanız bu e-postayı yok sayın.",
      "",
      "ROUTEPOL",
    ].join("\n"),
  };
}

export async function sendCustomerPortalLoginMail(params: {
  to: string;
  locale: string;
  rawToken: string;
}): Promise<"resend" | "noop"> {
  const base = getPublicEnv().siteUrl.replace(/\/$/, "");
  const loc =
    params.locale === "pl" || params.locale === "en" ? params.locale : "tr";
  const url = `${base}/${loc}/hesabim/giris?t=${encodeURIComponent(params.rawToken)}`;
  const { subject, text } = copy(loc, url);

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "ROUTEPOL <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[customer-portal-mail:noop]", { to: params.to, url });
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
    console.error("[customer-portal-mail:resend]", res.status, body);
    throw new Error("PORTAL_MAIL_FAILED");
  }
  return "resend";
}
