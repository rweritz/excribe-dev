import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('header nav links are visible and functional', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    await expect(nav.locator('img[alt*="Logo"]')).toBeVisible();

    // Target desktop nav links (hidden md:flex container)
    const desktopNav = nav.locator('.hidden.md\\:flex');
    const blogLink = desktopNav.locator('a:has-text("Blog")');
    const videosLink = desktopNav.locator('a:has-text("Videos")');

    await blogLink.click();
    await expect(page).toHaveURL(/\/blog/);

    await videosLink.click();
    await expect(page).toHaveURL(/\/videos/);
  });

  test('navigation between all main pages works', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.goto('/blog');
    await expect(page).toHaveURL('/blog');

    await page.goto('/videos');
    await expect(page).toHaveURL('/videos');

    await page.goto('/contact');
    await expect(page).toHaveURL('/contact');
  });
});
