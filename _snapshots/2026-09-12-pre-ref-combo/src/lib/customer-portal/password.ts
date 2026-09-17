import { hash, verify } from "@node-rs/argon2";

const ARGON = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;

export const CUSTOMER_PASSWORD_MIN = 10;
export const CUSTOMER_PASSWORD_MAX = 72;

export async function hashCustomerPassword(plain: string): Promise<string> {
  return hash(plain, ARGON);
}

export async function verifyCustomerPassword(
  passwordHash: string,
  plain: string,
): Promise<boolean> {
  try {
    return await verify(passwordHash, plain);
  } catch {
    return false;
  }
}
