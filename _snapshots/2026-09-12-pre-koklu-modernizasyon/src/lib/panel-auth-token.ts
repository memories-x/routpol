import { createHash, createHmac, timingSafeEqual } from "crypto";

export const PANEL_COOKIE_NAME = "pt_panel_session";

function secret(): string {
  const value = process.env.PANEL_AUTH_SECRET;
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("PANEL_AUTH_SECRET is required in production");
    }
    return "dev-panel-secret-change-me";
  }
  return value;
}

export function expectedPanelPassword(): string {
  const value = process.env.PANEL_PASSWORD;
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("PANEL_PASSWORD is required in production");
    }
    return "polturk-panel";
  }
  return value;
}

/** Env-only fallback (DB yokken veya testte). */
export function panelPasswordVersionFromEnv(): string {
  return createHash("sha256")
    .update(expectedPanelPassword())
    .digest("hex")
    .slice(0, 16);
}

export async function resolvePanelPasswordVersion(): Promise<string> {
  try {
    const { getPanelPasswordVersion } = await import("@/lib/panel-user");
    const version = await getPanelPasswordVersion();
    if (version === "env") return panelPasswordVersionFromEnv();
    return createHash("sha256").update(`pv:${version}`).digest("hex").slice(0, 16);
  } catch {
    return panelPasswordVersionFromEnv();
  }
}

export async function createPanelSessionTokenAsync(): Promise<string> {
  const pv = await resolvePanelPasswordVersion();
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const payload = `exp=${exp}&pv=${pv}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/** @deprecated test / geri uyum — async sürümü kullanın */
export function createPanelSessionToken(): string {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const pv = panelPasswordVersionFromEnv();
  const payload = `exp=${exp}&pv=${pv}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyPanelSessionToken(
  token: string | undefined,
  expectedPv?: string,
): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  const expMatch = payload.match(/exp=(\d+)/);
  const pvMatch = payload.match(/pv=([a-f0-9]{16})/);
  const exp = expMatch ? Number(expMatch[1]) : NaN;
  if (!Number.isFinite(exp) || exp <= Date.now()) return false;
  const pv = expectedPv ?? panelPasswordVersionFromEnv();
  if (!pvMatch || pvMatch[1] !== pv) return false;
  return true;
}

export async function verifyPanelSessionTokenAsync(
  token: string | undefined,
): Promise<boolean> {
  const expectedPv = await resolvePanelPasswordVersion();
  return verifyPanelSessionToken(token, expectedPv);
}
