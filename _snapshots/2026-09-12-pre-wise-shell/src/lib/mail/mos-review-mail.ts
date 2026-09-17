import { isMosContentStale, MOS_CONTENT_VERIFIED_AT } from "@/lib/mos-content-review";

export async function sendMosReviewReminderMail(): Promise<
  "resend" | "noop" | "skipped"
> {
  if (!isMosContentStale()) return "skipped";

  const to = process.env.CONTACT_EMAIL_TO;
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "POL-TURK <onboarding@resend.dev>";

  const subject = `[POL-TURK] MOS rehber gözden geçirme (${MOS_CONTENT_VERIFIED_AT})`;
  const text = [
    "MOS bilgilendirme içeriği 90 günden eski olabilir.",
    "",
    `Son verifiedAt: ${MOS_CONTENT_VERIFIED_AT}`,
    "Kontrol: src/app/[locale]/rehber/[slug], residence-slots.ts, voivodeships.ts",
    "Güncelleme sonrası MOS_CONTENT_VERIFIED_AT değerini yenileyin.",
  ].join("\n");

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mos-review-mail:noop]", text);
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
    console.error("[mos-review-mail]", await res.text());
    throw new Error("MOS_REVIEW_MAIL_FAILED");
  }
  return "resend";
}
