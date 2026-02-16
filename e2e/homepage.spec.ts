import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays profile section', async ({ page }) => {
    await expect(page.locator('.profile-image')).toBeVisible();
    await expect(page.locator('h1')).toContainText("Hey, I'm");
  });

  test('displays connect section', async ({ page }) => {
    await expect(page.getByText('Connect With Me')).toBeVisible();
  });
});
