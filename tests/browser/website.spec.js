// Browser tests for Docondee website
const { test, expect } = require('@playwright/test');

test.describe('Docondee Website', () => {
  const indexHtml = 'file://' + process.cwd() + '/index.html';

  test('should load index.html', async ({ page }) => {
    await page.goto(indexHtml);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should have valid doctype', async ({ page }) => {
    await page.goto(indexHtml);
    const doctype = await page.evaluate(() => document.doctype?.name);
    expect(doctype).toBe('html');
  });

  test('should have meta viewport', async ({ page }) => {
    await page.goto(indexHtml);
    const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewport).toBeTruthy();
  });

  test('should have header nav', async ({ page }) => {
    await page.goto(indexHtml);
    const nav = await page.$('nav');
    expect(nav).toBeTruthy();
  });

  test('should have main content', async ({ page }) => {
    await page.goto(indexHtml);
    const main = await page.$('main');
    expect(main).toBeTruthy();
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(indexHtml);
    expect(errors).toHaveLength(0);
  });
});
