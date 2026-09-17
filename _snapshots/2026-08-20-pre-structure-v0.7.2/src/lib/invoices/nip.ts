/** Polish NIP: 10 digits + checksum. */

export function normalizeNip(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function isValidPlNip(raw: string): boolean {
  const n = normalizeNip(raw);
  if (!/^\d{10}$/.test(n)) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += weights[i] * Number(n[i]);
  }
  const check = sum % 11;
  if (check === 10) return false;
  return check === Number(n[9]);
}

export function companyRequiresNip(input: {
  companyName?: string;
  entityType?: string;
}): boolean {
  if (input.entityType === "sirket") return true;
  return Boolean(input.companyName?.trim());
}
