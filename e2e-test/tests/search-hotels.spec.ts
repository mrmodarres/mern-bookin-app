import { expect, test } from "@playwright/test";
import { UI_URL } from "./auth.spec";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // find sign in button and click it
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");

  await page.locator("[name=password]").fill("darksiders");

  await page.getByRole("button", { name: "login" }).click();

  // to check if alert is working after success login

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("SHould show hotel search result", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where you to?").fill("iran");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in iran")).toBeVisible();
  await expect(page.getByText("نهله بنی احمدی")).toBeVisible();
});
