import { test, expect } from "@playwright/test";

const appUrl = "https://currency-exchange-momence-task.netlify.app";
const amountInputSelector = 'input[name="amount"]';
const selectCurrencySelector = 'select[name="selectedCurrency"]';
const convertButtonSelector = "text=Convert";

test("CurrencyConverter - Convert CZK to USD", async ({ page }) => {
  await page.goto(appUrl);
  await page.locator(amountInputSelector).fill("5000");
  await page.locator(selectCurrencySelector).selectOption({ value: "USD" });
  await page.locator(convertButtonSelector).click();
  const result = page.locator("text=Converted Amount:");

  await expect(result).toHaveText(/Converted Amount: \d+\.\d{2} USD/);
});

test("CurrencyConverter - Invalid input", async ({ page }) => {
  await page.goto(appUrl);
  await page.locator(amountInputSelector).fill("abc");
  await page.locator(convertButtonSelector).click();
  const result = page.locator("text=Amount must be a valid number");

  await expect(result).toBeVisible();
});
