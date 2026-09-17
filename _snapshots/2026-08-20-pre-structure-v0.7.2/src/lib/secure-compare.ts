import { timingSafeEqual } from "crypto";

/** Constant-time string compare — farklı uzunluklarda da sızıntıyı sınırlar. */
export function secureCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    try {
      timingSafeEqual(bufA, bufA);
    } catch {
      /* ignore */
    }
    return false;
  }
  try {
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}
