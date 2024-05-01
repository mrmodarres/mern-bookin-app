import { test, expect } from "@playwright/test";
import { UI_URL } from "./auth.spec";
import path from "path";
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

test("Should allow user to add hotels", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRaiting"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByText("نهله بنی احمدی")).toBeVisible();
  await expect(page.getByText("sdfmn ,msndf,")).toBeVisible();
  await expect(page.getByText("مسقط, Iran")).toBeVisible();
  await expect(page.getByText("Romantic")).toBeVisible();
  await expect(page.getByText("$197 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 0 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
});
