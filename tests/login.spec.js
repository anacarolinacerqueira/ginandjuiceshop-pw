import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('#scanMeHeader').getByRole('link').filter({ hasText: /^$/ }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
});

test('successful login', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('carlos');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('hunter2');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('body')).toContainText('My Account');
});

test('login with wrong username', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('carla');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('hunter2');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Invalid username or password.')).toBeVisible();
});

test('login with wrong password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('carlos');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('hunter');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Invalid username or password.')).toBeVisible();
});