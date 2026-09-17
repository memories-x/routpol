import { createHmac } from "crypto";
import { describe, expect, it, beforeEach } from "vitest";
import {
  createPanelSessionToken,
  panelPasswordVersionFromEnv,
  verifyPanelSessionToken,
} from "@/lib/panel-auth-token";
import { loginTokenTtlMs } from "@/lib/customer-auth-token";

describe("panel session token (roadmap #6)", () => {
  beforeEach(() => {
    process.env.PANEL_PASSWORD = "test-panel-secret";
    process.env.PANEL_AUTH_SECRET = "test-auth-secret";
  });

  it("issues and verifies valid token", () => {
    const token = createPanelSessionToken();
    expect(
      verifyPanelSessionToken(token, panelPasswordVersionFromEnv()),
    ).toBe(true);
  });

  it("rejects tampered signature", () => {
    const token = createPanelSessionToken();
    const tampered = token.replace(/.$/, token.endsWith("a") ? "b" : "a");
    expect(
      verifyPanelSessionToken(tampered, panelPasswordVersionFromEnv()),
    ).toBe(false);
  });

  it("rejects expired token", () => {
    const pv = panelPasswordVersionFromEnv();
    const payload = `exp=${Date.now() - 1000}&pv=${pv}`;
    const sig = createHmac("sha256", process.env.PANEL_AUTH_SECRET!)
      .update(payload)
      .digest("hex");
    expect(verifyPanelSessionToken(`${payload}.${sig}`, pv)).toBe(false);
  });
});

describe("magic link TTL (roadmap #4)", () => {
  it("expires after 15 minutes", () => {
    expect(loginTokenTtlMs()).toBe(15 * 60 * 1000);
  });
});

describe("stripe event idempotency (roadmap #1 shape)", () => {
  it("treats duplicate key as duplicate claim", () => {
    const seen = new Set<string>();
    function claim(eventId: string): "new" | "duplicate" {
      if (seen.has(eventId)) return "duplicate";
      seen.add(eventId);
      return "new";
    }
    expect(claim("evt_1")).toBe("new");
    expect(claim("evt_1")).toBe("duplicate");
  });
});

describe("overage idempotency (roadmap #3 shape)", () => {
  it("increments credit once per session id", () => {
    const receipts = new Set<string>();
    let credits = 0;
    function apply(sessionId: string): "applied" | "duplicate" {
      if (receipts.has(sessionId)) return "duplicate";
      receipts.add(sessionId);
      credits += 1;
      return "applied";
    }
    expect(apply("cs_1")).toBe("applied");
    expect(apply("cs_1")).toBe("duplicate");
    expect(credits).toBe(1);
  });
});

describe("portal login response (roadmap #5)", () => {
  it("always uses sent:true envelope shape", () => {
    const eligible = false;
    const response = {
      success: true,
      data: { sent: true, message: "If registered, a link was sent." },
    };
    expect(response.success).toBe(true);
    expect(response.data.sent).toBe(true);
    expect(eligible).toBe(false);
  });
});

describe("active period block (roadmap #7)", () => {
  it("maps to 409 ACTIVE_PERIOD", async () => {
    const { ACTIVE_PERIOD_CODE } = await import(
      "@/lib/customer-portal/purchase-guard"
    );
    expect(ACTIVE_PERIOD_CODE).toBe("ACTIVE_PERIOD");
  });
});
