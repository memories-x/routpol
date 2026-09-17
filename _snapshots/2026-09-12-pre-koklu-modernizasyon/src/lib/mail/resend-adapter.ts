import { getContactEmailTo } from "@/lib/env";
import type { QuoteMailAdapter, QuoteNotification } from "./quote-mail";
import { noopQuoteMailAdapter } from "./quote-mail";

/**
 * Resend HTTP API — no SDK required.
 * Enable with RESEND_API_KEY + CONTACT_EMAIL_TO (+ optional CONTACT_EMAIL_FROM).
 */
export const resendQuoteMailAdapter: QuoteMailAdapter = {
  async sendQuoteNotification(payload: QuoteNotification) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = getContactEmailTo();
    const from =
      process.env.CONTACT_EMAIL_FROM ?? "POL-TURK <onboarding@resend.dev>";

    if (!apiKey || !to) {
      await noopQuoteMailAdapter.sendQuoteNotification(payload);
      return;
    }

    const label = payload.serviceLabel ?? payload.serviceType;
    const subject = `[POL-TURK Temas] ${label} — ${payload.fullName}`;
    const text = [
      `Yeni temas talebi`,
      ``,
      `ID: ${payload.id}`,
      `Ad: ${payload.fullName}`,
      `E-posta: ${payload.email}`,
      `Telefon: ${payload.phone}`,
      `Segment: ${label} (${payload.serviceType})`,
      `Kaynak: ${payload.source ?? "-"}`,
      `Dil: ${payload.locale ?? "-"}`,
      `Mesaj:`,
      payload.message ?? "-",
      ``,
      payload.customerWhatsAppUrl
        ? `WhatsApp (müşteri): ${payload.customerWhatsAppUrl}`
        : `WhatsApp: numara yetersiz`,
      payload.panelUrl
        ? `Panel: ${payload.panelUrl}`
        : `Panel: /panel/temas`,
      ``,
      `Dönüşü siz başlatın — e-posta veya WhatsApp.`,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[quote-mail:resend]", res.status, body);
      throw new Error("QUOTE_MAIL_FAILED");
    }
  },
};
