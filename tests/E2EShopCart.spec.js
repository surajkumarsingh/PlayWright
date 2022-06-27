const {test, expect} = require('@playwright/test')


test('E2E Shop',async ({page})=>{

    let product = 'zara coat 3';
    const products =  page.locator('div.card');
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('#userEmail').type('anshika@gmail.com')
    await page.locator('#userPassword').type('Iamking@000')
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body b').allTextContents());
    for(let i =0; i < await products.count(); ++i){
        if(await products.nth(i).locator('.card-body b').textContent()===product){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
 await page.locator('button[routerlink="/dashboard/cart"]').click();
 //**waiting for elemet to load beacuse auto wait is not available for visisblity
 await page.locator('div.infoWrap').waitFor();
 //**Below is playwright locator used this checks contains
expect(await page.locator(`h3:has-text('${product}')`).isVisible()).toBeTruthy();
await page.locator('button:has-text("Checkout")').click();
await page.locator("input[placeholder='Select Country']").type('I', {delay:2000});
let section = page.locator('section.ng-star-inserted');
await section.scrollIntoViewIfNeeded()
await section.waitFor();
console.log(await section.locator('span').count())
for(let i =0;  i<await section.locator('span').count(); i++){
    if((await section.locator('span').nth(i).textContent()).trim() === 'India'){
        await section.locator('span').nth(i).click();
        break;
    }
}
await page.locator('a:has-text("PLACE ORDER")').click();
expect((await page.locator('.hero-primary').textContent()).trim()==='Thankyou for the order.').toBeTruthy();
let orderNo = await page.locator('label.ng-star-inserted').textContent();
console.log(orderNo);
await page.locator("label:has-text('Orders History Page')").click();
await page.locator('table .ng-star-inserted').first().waitFor();
//await page.pause();
for(let i =0; i < await page.locator('table .ng-star-inserted').count(); i++){
    console.log(await page.locator('table .ng-star-inserted').nth(i).locator('th').textContent())
  if(orderNo.includes(await page.locator('table .ng-star-inserted').nth(i).locator('th').textContent())){
    await page.locator('table .ng-star-inserted').nth(i).locator("button.btn.btn-primary").click();
    break; 
  } 
}
console.log(await page.locator('div.col-text.-main').textContent())
});