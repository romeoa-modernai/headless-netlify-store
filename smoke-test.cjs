const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  const failedRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('requestfailed', request => {
    failedRequests.push(request.url() + ' - ' + request.failure()?.errorText);
  });

  try {
    // Test home page
    console.log('Testing: https://cute-figolla-8bcbe2.netlify.app/');
    await page.goto('https://cute-figolla-8bcbe2.netlify.app/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    console.log('Home page loaded ✓ - Title:', title);
    const bodyText = await page.locator('body').textContent({ timeout: 5000 }).catch(() => 'N/A');
    console.log('Body preview:', bodyText.substring(0, 200));

    // Test admin page
    console.log('Testing: https://cute-figolla-8bcbe2.netlify.app/admin?secret=m0d3rn@i2026');
    await page.goto('https://cute-figolla-8bcbe2.netlify.app/admin?secret=m0d3rn@i2026', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    console.log('Admin page loaded ✓');

    if (errors.length > 0) {
      console.log('\nConsole errors:');
      errors.forEach(e => console.log('  -', e));
    }
    if (failedRequests.length > 0) {
      console.log('\nFailed requests:');
      failedRequests.forEach(e => console.log('  -', e));
    }
    if (errors.length === 0 && failedRequests.length === 0) {
      console.log('\nNo errors!');
    }
  } catch (e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();