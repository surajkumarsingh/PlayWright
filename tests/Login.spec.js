const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjets/LoginPage');

test('Wait for idle network call',  async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/')
    const login = new LoginPage(page);
    await login.userName().type('anshika@gmail.com')
    await login.password().type('Iamking@000')
    await login.signInBtn().click();
    await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body b').allTextContents());
    })
    