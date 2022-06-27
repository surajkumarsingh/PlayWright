const {test, expect} = require('@playwright/test')


test('Creating BrowserState Context', async ({browser})=>{
  const browserContext = await browser.newContext();
  const page =  await browserContext.newPage();
await page.goto('https://rahulshettyacademy.com/client/')
await page.locator('#userEmail').type('anshika@gmail.com')
await page.locator('#userPassword').type('Iamking@000')
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
console.log(await page.locator('.card-body b').allTextContents());
await browserContext.storageState({path:'browserState.json'})
});

test.only('Using BrowserState Context', async ({browser})=>{
const browserContext = await browser.newContext({storageState:'browserState.json'});
const page =  await browserContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client/')
  console.log(await page.locator('.card-body b').allTextContents());
  await browserContext.storageState({path:'browserState.json'})
  });