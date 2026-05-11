const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://dev.shopify.com/dashboard/157201946/apps/360866316289', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    console.log('Page loaded');
    console.log('Title:', await page.title());
    console.log('URL:', page.url());
  } catch (e) {
    console.log('Error:', e.message);
  }
})();