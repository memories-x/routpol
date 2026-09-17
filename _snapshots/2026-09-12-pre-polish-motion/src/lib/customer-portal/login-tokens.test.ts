import { describe, expect, it } from "vitest";
import { hashLoginToken } from "./login-tokens";

describe("portal login token hash", () => {
  it("is deterministic", () => {
    expect(hashLoginToken("abc")).toBe(hashLoginToken("abc"));
  });

  it("differs for different raw tokens", () => {
    expect(hashLoginToken("a")).not.toBe(hashLoginToken("b"));
  });
});
