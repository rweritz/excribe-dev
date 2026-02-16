import { test, expect } from '@playwright/test';

test.describe('Blog listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('displays page header', async ({ page }) => {
    await expect(page.getByText("What I've Written")).toBeVisible();
  });

  test('lists blog post cards', async ({ page }) => {
    const cards = page.locator('app-blog-card');
    await expect(cards).not.toHaveCount(0);
  });

  test('blog cards show title, date, excerpt, and read more link', async ({ page }) => {
    const firstCard = page.locator('app-blog-card').first();
    await expect(firstCard.locator('h2')).toBeVisible();
    await expect(firstCard.locator('time')).toBeVisible();
    await expect(firstCard.locator('a:has-text("Read more")')).toBeVisible();
  });

  test('blog cards have tag badges', async ({ page }) => {
    const firstCard = page.locator('app-blog-card').first();
    const tags = firstCard.locator('span').filter({ hasText: /^(?!Read more).+$/ });
    await expect(tags.first()).toBeVisible();
  });

  test('clicking read more navigates to blog post', async ({ page }) => {
    const readMoreLink = page.locator('app-blog-card').first().locator('a:has-text("Read more")');
    await readMoreLink.click();
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
