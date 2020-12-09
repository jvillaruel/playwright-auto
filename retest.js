const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://staging.mryum.com/demo
  await page.goto('https://staging.mryum.com/demo');

  // Click text="View Dine in Menu"
  await page.click('text="View Dine in Menu"');
  // assert.equal(page.url(), 'https://staging.mryum.com/demo/dine-in');

  // Click input[name="tableNumber"]
  await page.click('input[name="tableNumber"]');

  // Fill input[name="tableNumber"]
  await page.fill('input[name="tableNumber"]', '1');

  // Click text="Confirm"
  await page.click('text="Confirm"');

  // Click text="Drinks 🍻"
  await page.click('text="Drinks 🍻"');
  // assert.equal(page.url(), 'https://staging.mryum.com/demo/dine-in/drinks');

  // Click text="Mocha"
  await page.click('text="Mocha"');
  // assert.equal(page.url(), 'https://staging.mryum.com/demo/dine-in/drinks/mocha-3d5e9');

  // Fill //label[normalize-space(.)='Almond Milk+$0.50']/input[normalize-space(@type)='radio' and normalize-space(@name)='modifiers.9019b0ff-2c45-4458-aaed-b224f08bc270']
  await page.fill('//label[normalize-space(.)=\'Almond Milk+$0.50\']/input[normalize-space(@type)=\'radio\' and normalize-space(@name)=\'modifiers.9019b0ff-2c45-4458-aaed-b224f08bc270\']', '754e692f-17c1-4723-ae74-8346ff7c5deb');

  // Click //label[normalize-space(.)='Almond Milk+$0.50']/div[1]/div
  await page.click('//label[normalize-space(.)=\'Almond Milk+$0.50\']/div[1]/div');

  // Click text="Almond Milk"
  await page.click('text="Almond Milk"');

  // Click text="Add to cart"
  await page.click('text="Add to cart"');

  // Go to https://staging.mryum.com/demo/dine-in/drinks
  await page.goto('https://staging.mryum.com/demo/dine-in/drinks');

  // ---------------------
  await context.close();
  await browser.close();
})();