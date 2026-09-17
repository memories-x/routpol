/**
 * Telefon görüşmesi — tercih edilen slot.
 * Wall clock always Europe/Warsaw (POL-TURK operasyon TZ).
 */

export const CALL_TIME_ZONE = "Europe/Warsaw";

const CALL_LOCAL_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Instant → Warsaw wall `YYYY-MM-DDTHH:mm` for datetime-local. */
export function toWarsawDatetimeLocal(isoOrDate: string | Date): string {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(d.getTime())) return "";
  const parts = warsawParts(d);
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}T${pad2(parts.hour)}:${pad2(parts.minute)}`;
}

/** Min selectable slot: ~30 dk sonra, Warsaw wall. */
export function datetimeLocalMinWarsaw(fromMs = Date.now()): string {
  return toWarsawDatetimeLocal(new Date(fromMs + 30 * 60 * 1000));
}

function warsawParts(d: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: CALL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of fmt.formatToParts(d)) {
    if (p.type !== "literal") map[p.type] = p.value;
  }
  // en-GB may use 24:00 → normalize hour
  let hour = Number(map.hour);
  if (hour === 24) hour = 0;
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour,
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

/**
 * Warsaw wall time → UTC ISO.
 * `YYYY-MM-DDTHH:mm` (datetime-local) or full ISO accepted.
 */
export function parseCallRequestedAt(
  raw: unknown,
): string | { error: string } {
  if (typeof raw !== "string" || !raw.trim()) {
    return { error: "callRequestedAt required" };
  }
  const s = raw.trim();
  const m = CALL_LOCAL_RE.exec(s);
  let iso: string;
  if (m) {
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const d = Number(m[3]);
    const h = Number(m[4]);
    const mi = Number(m[5]);
    if (
      mo < 1 ||
      mo > 12 ||
      d < 1 ||
      d > 31 ||
      h < 0 ||
      h > 23 ||
      mi < 0 ||
      mi > 59
    ) {
      return { error: "invalid callRequestedAt" };
    }
    const utcMs = warsawWallToUtcMs(y, mo, d, h, mi);
    if (utcMs == null) return { error: "invalid callRequestedAt" };
    iso = new Date(utcMs).toISOString();
  } else {
    const date = new Date(s);
    if (Number.isNaN(date.getTime())) {
      return { error: "invalid callRequestedAt" };
    }
    iso = date.toISOString();
  }

  const t = new Date(iso).getTime();
  if (t < Date.now() - 60_000) {
    return { error: "callRequestedAt must be in the future" };
  }
  if (t > Date.now() + 90 * 24 * 60 * 60 * 1000) {
    return { error: "callRequestedAt too far" };
  }
  return iso;
}

/** Convert Poland wall clock to UTC ms (handles CET/CEST). */
function warsawWallToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number | null {
  // Initial guess: treat as UTC, then correct by Warsaw offset at that instant
  let utc = Date.UTC(year, month - 1, day, hour, minute, 0);
  for (let i = 0; i < 3; i++) {
    const asWarsaw = warsawParts(new Date(utc));
    const wantedAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
    const gotAsUtc = Date.UTC(
      asWarsaw.year,
      asWarsaw.month - 1,
      asWarsaw.day,
      asWarsaw.hour,
      asWarsaw.minute,
      asWarsaw.second,
    );
    const delta = wantedAsUtc - gotAsUtc;
    utc += delta;
    if (delta === 0) break;
  }
  const check = warsawParts(new Date(utc));
  if (
    check.year !== year ||
    check.month !== month ||
    check.day !== day ||
    check.hour !== hour ||
    check.minute !== minute
  ) {
    return null;
  }
  return utc;
}

export function formatCallSlot(
  iso: string,
  locale: string,
): string {
  const loc =
    locale === "pl" ? "pl-PL" : locale === "en" ? "en-GB" : "tr-TR";
  try {
    return new Date(iso).toLocaleString(loc, {
      timeZone: CALL_TIME_ZONE,
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function formatCallSlotTr(iso: string): string {
  return formatCallSlot(iso, "tr");
}

/** Mail / panel — timezone label. */
export function callTzHint(locale: string): string {
  if (locale === "pl") return "czas warszawski (Europe/Warsaw)";
  if (locale === "en") return "Warsaw time (Europe/Warsaw)";
  return "Varşova saati (Europe/Warsaw)";
}
