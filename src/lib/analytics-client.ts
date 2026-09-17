/** Çerezsiz istemci olayı — hata yutulur, UI bloklanmaz. */
export function trackClientEvent(
  name:
    | "teklif_submit"
    | "whatsapp_click"
    | "cta_teklif_click"
    | "lang_switch"
    | "service_detail_view",
  locale?: string,
  meta?: Record<string, unknown>,
): void {
  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, locale, meta }),
  }).catch(() => {});
}
