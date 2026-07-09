// Browser tests for Docondee website
const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Docondee Website', () => {
  const indexHtml = path.join(process.cwd(), 'index.html');

  test('should load index.html', async ({ page }) => {
    await page.goto('file://' + indexHtml);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should have valid doctype', async ({ page }) => {
    await page.goto('file://' + indexHtml);
    const doctype = await page.evaluate(() => document.doctype?.name);
    expect(doctype).toBe('html');
  });

  test('should have meta viewport', async ({ page }) => {
    await page.goto('file://' + indexHtml);
    const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewport).toBeTruthy();
  });

  test('should have header nav', async ({ page }) => {
    await page.goto('file://' + indexHtml);
    const nav = await page.$('nav');
    expect(nav).toBeTruthy();
  });

  test('should have footer', async ({ page }) => {
    await page.goto('file://' + indexHtml);
    const footer = await page.$('footer');
    expect(footer).toBeTruthy();
  });
});
