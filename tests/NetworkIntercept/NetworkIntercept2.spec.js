const { expect, test, request } = require('@playwright/test')
const { APIUtils } = require('../../utils/APIUtils');
const loginPayload = { userEmail: "surajAU@gamil.com", userPassword: "Iamking@00" };
//** Used Edge test cases and security testing*/
//** We are trying to access and order which does not belong our account */
test('Intercept API Request URL', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await new APIUtils(await request.newContext(), loginPayload).getToken());
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=629db2bee26b7e1a10ed0d7e',
        async route => {
            //** we are routing network to newUrl*/
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=629c3bf5e26b7e1a10ecf44e' })
        })
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("button:has-text('View')").first().click();
    expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');

});