/**
 * Güvenilir istemci IP çözümlemesi (test edilebilir).
 */
export function resolveClientIpFromHeaders(headers: {
  get(name: string): string | null;
}): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const hopsRaw = process.env.TRUSTED_PROXY_HOPS?.trim();
    const hops = hopsRaw ? Math.max(1, parseInt(hopsRaw, 10) || 1) : 1;
    const parts = forwarded
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      const idx = Math.max(0, parts.length - hops);
      return parts[idx] ?? parts[parts.length - 1]!;
    }
  }

  return "unknown";
}
