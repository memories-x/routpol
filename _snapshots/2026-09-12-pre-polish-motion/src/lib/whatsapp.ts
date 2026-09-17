import { getPublicEnv } from "./env";

/** Visitor → POL-TURK WhatsApp number (site FAB / CTA). */
export function buildWhatsAppUrl(prefill: string): string | null {
  const { whatsappE164 } = getPublicEnv();
  if (!whatsappE164) return null;
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${whatsappE164}?text=${text}`;
}

/** Operator → customer WhatsApp chat (panel Temas). */
export function buildCustomerWhatsAppUrl(
  phoneE164: string,
  prefill: string,
): string | null {
  const digits = phoneE164.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${digits}?text=${text}`;
}

type PrefillLocale = "tr" | "pl" | "en";

function resolvePrefillLocale(locale: string | null | undefined): PrefillLocale {
  if (locale === "pl" || locale === "en") return locale;
  return "tr";
}

/** Operatörün müşteriye attığı ilk mesaj — lead locale’ine göre. */
export function operatorWhatsAppPrefill(
  fullName: string,
  serviceType: string,
  locale?: string | null,
  serviceLabel?: string,
): string {
  const name = fullName.trim() || "Merhaba";
  const svc = (serviceLabel ?? serviceType).trim() || "iletişim";
  const loc = resolvePrefillLocale(locale);

  if (loc === "pl") {
    return `Dzień dobry ${name}, POL-TURK — piszę w sprawie zgłoszenia: ${svc}.`;
  }
  if (loc === "en") {
    return `Hello ${name}, this is POL-TURK regarding your request: ${svc}.`;
  }
  return `Merhaba ${name}, POL-TURK — ${svc} talebiniz hakkında yazıyorum.`;
}
