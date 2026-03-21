import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  
  console.log('Current next button:', await page.textContent('button:has-text("Next")'));
  
  console.log('Clicking Deutsch...');
  await page.click('button:has-text("Deutsch")');
  await page.waitForTimeout(1000);
  
  console.log('Next button after click:', await page.textContent('.button.is-light.is-info'));
  
  await browser.close();
})();
