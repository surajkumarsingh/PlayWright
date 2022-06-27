const { expect, test,request } = require("@playwright/test")
const {APIUtils} = require('../../utils/APIUtils');
const loginPayload = { userEmail: "surajAU@gamil.com", userPassword: "Iamking@00" };
const fakePayload = {data:[],message:"No Orders"};
test('Intercept Response Data',async({page})=>{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await new APIUtils(await request.newContext(), loginPayload).getToken());  
    await page.goto('https://rahulshettyacademy.com/client/')
   
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6289cd65e26b7e1a10ebbe14", 
    async route =>{
     //**Make call to Api and get respone and modify it put fulfill()*/
     const response = await page.request.fetch(route.request());
    console.log(response.url())
    //**intercepting the Response and puttin fake payload*/
      route.fulfill({
      fakePayload,
    });
    });
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.pause();
    expect(page.locator('div.mt-4.ng-star-inserted')).toHaveText('You have No Orders to show at this time. Please Visit Back Us')
    
});