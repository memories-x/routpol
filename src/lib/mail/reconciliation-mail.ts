export async function sendReconciliationAlertMail(params: {
  paidWithoutReceipt: string[];
  receiptWithoutPaidCase: string[];
}): Promise<"resend" | "noop" | "skipped"> {
  const total =
    params.paidWithoutReceipt.length + params.receiptWithoutPaidCase.length;
  if (total === 0) return "skipped";

  const to = process.env.CONTACT_EMAIL_TO;
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "ROUTEPOL <onboarding@resend.dev>";

  const subject = `[ROUTEPOL] Stripe↔case mutabakat uyarısı (${total})`;
  const text = [
    "Son 7 gün Stripe checkout receipt mutabakatı:",
    "",
    `Ödendi ama receipt yok (${params.paidWithoutReceipt.length}):`,
    params.paidWithoutReceipt.join(", ") || "(yok)",
    "",
    `Receipt var ama case session eşleşmiyor (${params.receiptWithoutPaidCase.length}):`,
    params.receiptWithoutPaidCase.join(", ") || "(yok)",
    "",
    "Panel + Stripe Dashboard kontrol edin.",
  ].join("\n");

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[reconciliation-mail:noop]", text);
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
    console.error("[reconciliation-mail]", await res.text());
    throw new Error("RECONCILIATION_MAIL_FAILED");
  }
  return "resend";
}
