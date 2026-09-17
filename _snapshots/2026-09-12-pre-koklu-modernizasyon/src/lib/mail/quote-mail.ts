import { resendQuoteMailAdapter } from "./resend-adapter";

export type QuoteNotification = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceLabel?: string;
  message?: string;
  locale?: string;
  source?: string;
  /** Operator click-to-chat with customer */
  customerWhatsAppUrl?: string | null;
  /** Panel list deep link */
  panelUrl?: string;
};

export type QuoteMailAdapter = {
  sendQuoteNotification: (payload: QuoteNotification) => Promise<void>;
};

/** Default: log only in non-production */
export const noopQuoteMailAdapter: QuoteMailAdapter = {
  async sendQuoteNotification(payload) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote-mail:noop]", {
        id: payload.id,
        serviceType: payload.serviceType,
        email: payload.email,
        panelUrl: payload.panelUrl,
        customerWhatsAppUrl: payload.customerWhatsAppUrl,
      });
    }
  },
};

export function isQuoteMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO);
}

export function getQuoteMailAdapter(): QuoteMailAdapter {
  if (isQuoteMailConfigured()) {
    return resendQuoteMailAdapter;
  }
  return noopQuoteMailAdapter;
}
