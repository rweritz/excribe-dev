import { test, expect } from '@playwright/test';

test.describe('Videos page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/videos');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.getByText("What I've Recorded")).toBeVisible();
  });

  test('renders video cards', async ({ page }) => {
    const cards = page.locator('app-video-card');
    await expect(cards).not.toHaveCount(0);
  });
});

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.getByText('Get In Touch')).toBeVisible();
  });

  test('shows social links', async ({ page }) => {
    await expect(page.locator('a[href*="twitter.com"], a[href*="x.com"]').first()).toBeVisible();
    await expect(page.locator('a[href*="github.com"]').first()).toBeVisible();
  });

  test('displays connect section', async ({ page }) => {
    await expect(page.getByText('Connect With Me')).toBeVisible();
  });
});
