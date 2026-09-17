import { cookies } from "next/headers";
import {
  PANEL_COOKIE_NAME,
  createPanelSessionToken,
  createPanelSessionTokenAsync,
  expectedPanelPassword,
  verifyPanelSessionToken,
  verifyPanelSessionTokenAsync,
} from "./panel-auth-token";

export {
  PANEL_COOKIE_NAME,
  createPanelSessionToken,
  createPanelSessionTokenAsync,
  expectedPanelPassword,
  verifyPanelSessionToken,
  verifyPanelSessionTokenAsync,
};

export async function isPanelAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const { verifyPanelSessionTokenAsync } = await import("./panel-auth-token");
  return verifyPanelSessionTokenAsync(jar.get(PANEL_COOKIE_NAME)?.value);
}
