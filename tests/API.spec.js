const { test, expect, request } = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = { userEmail: "surajAU@gamil.com", userPassword: "Iamking@00" };
const orderPayload = { orders: [{ country: "Guadeloupe", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
let token;
let orderNo;
test.beforeAll(async () => {
    const newRequest = await request.newContext(); 
   const apiutils = new APIUtils(newRequest,loginPayload);
   token = await apiutils.getToken();
   orderNo = await apiutils.createOrder(orderPayload);  
});

test('Place Order Through API', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);  
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator('table .ng-star-inserted').first().waitFor();
    for(let i =0; i < await page.locator('table .ng-star-inserted').count(); i++){
        console.log(await page.locator('table .ng-star-inserted').nth(i).locator('th').textContent())
      if(orderNo.includes(await page.locator('table .ng-star-inserted').nth(i).locator('th').textContent())){
        await page.locator('table .ng-star-inserted').nth(i).locator("button.btn.btn-primary").click();
        break; 
      } 
    }
    console.log(await page.locator('div.col-text.-main').textContent())
})