import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('carlos');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hunter2');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('/catalog', { waitUntil: 'domcontentloaded' });
});

test('add one product to cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Pineapple Edition Cocktail $' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#scanMeHeader')).toContainText('1');
  await page.getByRole('link', { name: 'View cart' }).click();
  await expect(page.locator('div').filter({ hasText: 'Pineapple Edition Cocktail $' }).nth(4)).toBeVisible();
});

test('add two products to cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Fruit Overlays $92.79 View' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Products' }).nth(1).click();
  await page.getByRole('link', { name: 'Juice Extractor $81.46 View' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#scanMeHeader')).toContainText('2');
  await page.getByRole('link', { name: '2' }).click();
  await expect(page.locator('span').filter({ hasText: 'Fruit Overlays' }).nth(1)).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Juice Extractor' }).nth(1)).toBeVisible();
});

test('edit quantity on cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Juicin\' Brick $96.25 View' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'View cart' }).click();
  await expect(page.getByRole('strong')).toContainText('$96.25');
  await page.getByRole('combobox').selectOption('10');
  await expect(page.locator('#scanMeHeader')).toContainText('10');
  await expect(page.getByRole('strong')).toContainText('$962.50');
});

test('remove product from cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Flamin’ Cocktail Glasses $69.' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'View cart' }).click();
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('h2')).toContainText('Your cart is currently empty');
});