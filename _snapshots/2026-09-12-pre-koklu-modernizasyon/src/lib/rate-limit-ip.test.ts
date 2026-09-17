import { describe, expect, it } from "vitest";
import { resolveClientIpFromHeaders } from "./rate-limit-ip";

function headers(map: Record<string, string>) {
  return {
    get(name: string) {
      const key = Object.keys(map).find(
        (k) => k.toLowerCase() === name.toLowerCase(),
      );
      return key ? map[key]! : null;
    },
  };
}

describe("resolveClientIpFromHeaders", () => {
  it("prefers x-real-ip over spoofed x-forwarded-for", () => {
    const ip = resolveClientIpFromHeaders(
      headers({
        "x-real-ip": "203.0.113.1",
        "x-forwarded-for": "1.2.3.4, 203.0.113.1",
      }),
    );
    expect(ip).toBe("203.0.113.1");
  });

  it("takes trusted hop from end of x-forwarded-for", () => {
    process.env.TRUSTED_PROXY_HOPS = "1";
    const ip = resolveClientIpFromHeaders(
      headers({ "x-forwarded-for": "1.2.3.4, 198.51.100.9" }),
    );
    expect(ip).toBe("198.51.100.9");
  });

  it("returns unknown when no headers", () => {
    expect(resolveClientIpFromHeaders(headers({}))).toBe("unknown");
  });
});
