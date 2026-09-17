import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  createPanelSessionToken,
  expectedPanelPassword,
  panelPasswordVersionFromEnv,
  verifyPanelSessionToken,
} from "./panel-auth-token";

describe("panel session token", () => {
  const prev = process.env.PANEL_PASSWORD;

  beforeEach(() => {
    process.env.PANEL_PASSWORD = "test-panel-secret";
    process.env.PANEL_AUTH_SECRET = "test-auth-secret";
  });

  afterEach(() => {
    if (prev === undefined) delete process.env.PANEL_PASSWORD;
    else process.env.PANEL_PASSWORD = prev;
  });

  it("issues and verifies valid token", () => {
    const token = createPanelSessionToken();
    expect(
      verifyPanelSessionToken(token, panelPasswordVersionFromEnv()),
    ).toBe(true);
  });

  it("invalidates when password changes", () => {
    const token = createPanelSessionToken();
    process.env.PANEL_PASSWORD = "other-password";
    expect(
      verifyPanelSessionToken(token, panelPasswordVersionFromEnv()),
    ).toBe(false);
  });

  it("expectedPanelPassword reads env", () => {
    expect(expectedPanelPassword()).toBe("test-panel-secret");
  });
});
