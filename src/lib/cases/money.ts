export function formatMoney(cents: number, currency: string): string {
  if (typeof cents !== "number" || !Number.isFinite(cents)) return "—";
  const code = (currency || "pln").toUpperCase();
  return `${(cents / 100).toFixed(2)} ${code}`;
}
