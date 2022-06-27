const{expect, test} = require('@playwright/test')
//**we stoping network request to happen */
test('Netwok Request Abort', async({page})=>{
 //** stoping any img file to load */   
await page.route('**/*.{png,jpg,jpeg}',  async route =>route.abort());
await page.goto('https://rahulshettyacademy.com/client/')
await page.locator('#userEmail').type('anshika@gmail.com')
await page.locator('#userPassword').type('Iamking@000')
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
console.log(await page.locator('.card-body b').allTextContents());
await page.pause();
})
