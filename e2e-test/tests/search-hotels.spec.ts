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

test("Should show Hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where you to?").fill("iran");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("نهله بنی احمدی").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where you to?").fill("iran");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formatDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formatDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("نهله بنی احمدی").click();

  await page.getByRole("button", { name: "Book now" }).click();
  await expect(page.getByText("Total Cost: $591.00")).toBeVisible();
  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator("[placeholder='Card number']")
    .fill("4242424242424242");
  await stripeFrame.locator("[placeholder='MM / YY']").fill("04/25");
  await stripeFrame.locator("[placeholder='CVC']").fill("242");
  await stripeFrame.locator("[placeholder='ZIP']").fill("24225");
  await page.getByRole("button", { name: "Confirm booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
});
