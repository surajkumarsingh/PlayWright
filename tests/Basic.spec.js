const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('',async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    //context.close()
    })

test('Test',async ({page})=>{
   const userName = page.locator('#username');
   const pwd = page.locator('#password');
   const role = 'select[class=form-control]';
   const signInBtn = page.locator('#signInBtn');

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
await userName.type('rahulshettyacademy ');
await pwd.type('learning');
await page.selectOption(role,{label:'Consultant'});
await page.locator('#usertype').last().click();
await expect(page.locator('#usertype').last()).toBeChecked();
await page.locator('#okayBtn').click();
//await page.pause();
await signInBtn.click();
let errText = await page.locator("div[style*='block']").textContent();
console.log(errText);
 await expect(page.locator("div[style*='block']")).toContainText('Incorrect username/password.')
// ***type/fill both do same job but fill clear text
await userName.fill("");
await userName.type('rahulshettyacademy');
await Promise.all(
    [
    // waiting for page have navigated to new page
     page.waitForNavigation(),
     signInBtn.click()
    ]
)

await expect(page).toHaveTitle('ProtoCommerce')
//console.log(await page.locator('.card-body a').nth(0).textContent());
console.log(await page.locator('.card-body a').allTextContents());

});



test('Wait for idle network call',  async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/')
await page.locator('#userEmail').type('anshika@gmail.com')
await page.locator('#userPassword').type('Iamking@000')
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
console.log(await page.locator('.card-body b').allTextContents());
})

test('Multi Tabs Handling',  async ({browser})=>{

    const  context  = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    
    
//**if multiple tabs opening we can take multiple page in array
 const [newPage]= await Promise.all([
    // taking browser context and looking for new Page Event
    context.waitForEvent('page'),
     page.locator("a[href*='documents-request']").click()
])

await newPage.locator('li.dropdown').last().hover();
await newPage.locator(".dropdown a[href*='contact-us']").first().click();
const contact =  await newPage.locator(".contact-info li").first().textContent();
console.log(contact.split('E-mail')[1]);

})

test('Hide and Display',async ({page})=>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
await page.locator("input[value='Hide']").click();
expect(await page.locator('#displayed-text').isHidden()).toBeTruthy();
await page.locator("input[value='Show']").click();
expect(await page.locator('#displayed-text').isVisible()).toBeTruthy();
await page.goBack();
await page.goForward();
});

 test('Alert Handle',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator("input[value='Alert']").click();
    //Alert is an Event 
    page.on('dialog', dialog => dialog.accept())
    await page.locator("input[value='Confirm']").click();
    page.on('dialog', dialog => dialog.dismiss())
    });

    test.only('iFrames Handle',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
   const framePage = page.frameLocator('#courses-iframe')
   await framePage.locator('a[href="learning-path"]:visible').click();
      
});