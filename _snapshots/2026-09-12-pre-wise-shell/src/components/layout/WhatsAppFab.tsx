"use client";

import type { SiteContent } from "@/content/types";
import { trackClientEvent } from "@/lib/analytics-client";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

type WhatsAppFabProps = {
  content: SiteContent;
  locale?: string;
};

export function WhatsAppFab({ content, locale }: WhatsAppFabProps) {
  const wa = buildWhatsAppUrl(content.system.whatsappPrefill);
  if (!wa) return null;

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.system.whatsappLabel}
      onClick={() => trackClientEvent("whatsapp_click", locale, { source: "fab" })}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-pt-whatsapp text-white shadow-md hover:brightness-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}
