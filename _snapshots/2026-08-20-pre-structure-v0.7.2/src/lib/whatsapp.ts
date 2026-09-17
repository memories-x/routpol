import { getPublicEnv } from "./env";

export function buildWhatsAppUrl(prefill: string): string | null {
  const { whatsappE164 } = getPublicEnv();
  if (!whatsappE164) return null;
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${whatsappE164}?text=${text}`;
}
