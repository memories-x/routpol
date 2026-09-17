/** Days since an ISO timestamp. Invalid/missing → 0. */
export function agingDays(iso: string | undefined | null, now = Date.now()): number {
  if (!iso || typeof iso !== "string") return 0;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return 0;
  const ms = Math.max(0, now - t);
  return Math.floor(ms / 86_400_000);
}

/**
 * paid → paidAt (kuyruk beklemesi not kaydıyla sıfırlanmasın).
 * diğer → updatedAt, yoksa paidAt.
 */
export function caseAgingIso(input: {
  status: string;
  updatedAt?: string | null;
  paidAt?: string | null;
}): string | undefined {
  if (input.status === "paid" && input.paidAt) return input.paidAt;
  return input.updatedAt || input.paidAt || undefined;
}

export const ATTENTION_DAYS = 3;

export function needsAttention(
  status: string,
  days: number,
  threshold = ATTENTION_DAYS,
): boolean {
  if (status !== "paid" && status !== "in_progress") return false;
  return days >= threshold;
}

export function agingLabel(days: number): string {
  if (days <= 0) return "bugün";
  if (days === 1) return "1 gün";
  return `${days} gün`;
}
