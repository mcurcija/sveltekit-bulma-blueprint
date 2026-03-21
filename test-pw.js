import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  
  console.log('Current heading:', await page.textContent('h1'));
  
  console.log('Clicking Deutsch...');
  await page.click('button:has-text("Deutsch")');
  await page.waitForTimeout(1000);
  
  console.log('Heading after click:', await page.textContent('h1'));
  
  await browser.close();
})();
