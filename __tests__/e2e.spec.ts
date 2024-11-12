import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Smalag/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const smålagElements = await page.locator("text=Smålag").count();
  await expect(smålagElements).toBe(3);
});

test("get registered", async ({ page }) => {
  await page.goto("http://localhost:3000/register");

  const smålagText = await page.locator("text=Smålag").innerText();
  await expect(smålagText).toBeDefined();
});
