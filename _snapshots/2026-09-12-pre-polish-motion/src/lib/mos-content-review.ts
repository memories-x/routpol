/** MOS rehber içeriği — 3 ayda bir gözden geçirme (yol haritası U-2 / Faz 5). */
export const MOS_CONTENT_VERIFIED_AT = "2026-08-19";
export const MOS_REVIEW_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;

export function isMosContentStale(now = Date.now()): boolean {
  const verified = new Date(MOS_CONTENT_VERIFIED_AT).getTime();
  if (!Number.isFinite(verified)) return true;
  return now - verified > MOS_REVIEW_INTERVAL_MS;
}

export function daysSinceMosVerification(now = Date.now()): number {
  const verified = new Date(MOS_CONTENT_VERIFIED_AT).getTime();
  return Math.floor((now - verified) / (24 * 60 * 60 * 1000));
}
