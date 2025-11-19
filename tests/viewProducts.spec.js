import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('#scanMeHeader').getByRole('link').filter({ hasText: /^$/ }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.goto('/catalog');
});

test('view all products in the list', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Flamin’ Cocktail Glasses $69.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fruit Overlays $92.79 View' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Customised Cocktail Ice $63.' })).toBeVisible();
});

test('only a book is visible when filtered by books', async ({ page }) => {
  await page.getByRole('link', { name: 'Books' }).click();
  await expect(page.getByRole('link', { name: 'Create Your Own Cocktail $84.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Juicin\' Brick $96.25 View' })).not.toBeVisible();
});