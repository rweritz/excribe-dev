import { test, expect } from '@playwright/test';

test.describe('Blog post: MCP Server with .NET', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/mcp-server-dotnet');
  });

  test('displays post title', async ({ page }) => {
    await expect(page.locator('article header h1')).toContainText('MCP Server with .NET');
  });

  test('displays post date', async ({ page }) => {
    await expect(page.locator('article time')).toBeVisible();
  });

  test('displays tag badges', async ({ page }) => {
    const tagContainer = page.locator('article header .flex.space-x-2');
    await expect(tagContainer.getByText('MCP', { exact: true })).toBeVisible();
    await expect(tagContainer.getByText('.Net', { exact: true })).toBeVisible();
  });

  test('renders markdown content', async ({ page }) => {
    const prose = page.locator('.prose');
    await expect(prose).toBeVisible();
    await expect(prose.locator('p').first()).toBeVisible();
  });

  test('code blocks have syntax highlighting', async ({ page }) => {
    const codeBlock = page.locator('pre code').first();
    await expect(codeBlock).toBeVisible();
    const tokens = codeBlock.locator('.token');
    await expect(tokens.first()).toBeVisible();
  });

  test('blog post content is left-aligned', async ({ page }) => {
    const article = page.locator('article');
    await expect(article).toHaveClass(/text-left/);
  });
});

test.describe('Blog post: Certificate WSL Windows Trust', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/certificate-wsl-windows-trust');
  });

  test('displays post title', async ({ page }) => {
    await expect(page.locator('article header h1')).toContainText(
      'Use the same Dev Certs for Windows and WSL Ubuntu'
    );
  });

  test('renders markdown content with code blocks', async ({ page }) => {
    const prose = page.locator('.prose');
    await expect(prose).toBeVisible();
    await expect(prose.locator('p').first()).toBeVisible();
  });
});

test.describe('Blog post: non-existent slug', () => {
  test('does not render a blog article for invalid slug', async ({ page }) => {
    await page.goto('/blog/does-not-exist');
    // Invalid slugs should not render a blog article
    await expect(page.locator('article header h1')).not.toBeVisible({ timeout: 5_000 });
  });
});
