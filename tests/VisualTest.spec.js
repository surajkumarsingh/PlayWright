const { test, expect } = require('@playwright/test');


test('Take Screen Shot', async ({page})=>{
 await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
 await page.locator("input[value='Hide']").click();
 //Take screenShot
  await page.screenshot({path:'./ScreenShots/page.png'})
  //Take Screenshot of element Only
  await page.locator("input[value='Hide']").screenshot({path:'./ScreenShots/element.png'});
});

test.only('Visual Test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator("input[value='Hide']").click(); 
    /*
     * Comapre Screento the give path screenShot
     * if ScreenShot is not available to compare 
     * it will take screeshot on 1st run and fail and on 2nd it  will compare 
     * and create a folder in test/*.spec.js/ 
     * Note **It will compare each and every element and fail it any change found
     * 
     */
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
   });