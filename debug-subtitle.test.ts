import { test, expect } from '@playwright/test';

test('debug subtitle content', async ({ page }) => {
  await page.goto('https://jodell-website.vercel.app/');

  // Check all potential subtitle selectors
  const selectors = [
    '.subtitle',
    '.typed-text',
    '[data-typed-text]',
    '.typewriter',
    'h2',
    '.hero-subtitle',
    '#hero .subtitle',
    '.hero .subtitle'
  ];

  for (const selector of selectors) {
    const elements = page.locator(selector);
    const count = await elements.count();
    console.log(`${selector}: ${count} elements`);

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const text = await elements.nth(i).textContent();
        console.log(`  [${i}]: "${text?.trim()}"`);
      }
    }
  }

  // Also check if there's any typing animation
  const pageContent = await page.content();
  console.log('Page contains typewriter.js:', pageContent.includes('typewriter'));
  console.log('Page contains Typed:', pageContent.includes('Typed'));
});