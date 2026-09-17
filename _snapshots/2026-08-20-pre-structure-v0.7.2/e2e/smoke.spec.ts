import { expect, test } from "@playwright/test";

test("landing + health + panel login smoke", async ({ page, request }) => {
  await page.goto("/tr");
  await expect(page.locator("body")).toBeVisible();

  const health = await request.get("/api/health");
  expect(health.ok()).toBeTruthy();
  const healthJson = await health.json();
  expect(healthJson.success).toBe(true);

  await page.goto("/panel/login");
  await page.getByPlaceholder("Şifre").fill("polturk-panel");
  await page.getByRole("button", { name: "Giriş" }).click();
  await expect(page).toHaveURL(/\/panel(?:\/|$)/);
});
