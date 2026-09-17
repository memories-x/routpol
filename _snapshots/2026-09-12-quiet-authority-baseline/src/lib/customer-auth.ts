import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  verifyCustomerSessionToken,
} from "./customer-auth-token";

export {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  verifyCustomerSessionToken,
  sessionCookieOptions,
} from "./customer-auth-token";

export async function getCustomerSessionId(): Promise<string | null> {
  const jar = await cookies();
  return verifyCustomerSessionToken(jar.get(CUSTOMER_COOKIE_NAME)?.value);
}

export async function isCustomerAuthenticated(): Promise<boolean> {
  return Boolean(await getCustomerSessionId());
}
