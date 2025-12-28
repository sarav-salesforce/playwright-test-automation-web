//const { default: test } = require("@playwright/test");

const {test, expect} =  require("@playwright/test");

test('With browser context', async ({browser}) => {    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev");
    console.log(await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
});

test('With page context', async ({page}) => {
    await page.goto("https://playwright.dev/docs/test-assertions");
    console.log(await page.title());
    await expect(page).toHaveTitle("Assertions | Playwright");
});


test('Web automation sauce lab - error validation', async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Swag Labs");

    //css, xpath - to be used for locators

    //css - only as it is most compatible

    //await page.locator("#user-name").type("standard_user"); //older version of playwright supports type
    await page.locator("#user-name").fill("standard_user"); //new version of playwright supports fill
    await page.locator("#password").fill("");
    await page.locator("#login-button").click();
    console.log(await page.locator("[data-test='error']").textContent());
    await expect(page.locator("[data-test='error']")).toContainText("requried");
});


test('Web automation sauce lab - mulitple element tackle', async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Swag Labs");
    //await page.locator("#user-name").fill("standard_user");
    //1st way
    //await page.locator("[class='input_error form_input']").first().fill("standard_user");

    //2nd way
    await page.locator("[class='input_error form_input']").nth(0).fill("standard_user");

    await page.locator("[class='input_error form_input']").first().fill("");

    await page.locator("#user-name").fill("standard_user");

    await page.locator("[class='input_error form_input']").last().fill("secret_sauce");
    await page.locator("#login-button").click();    
    
    console.log(await page.locator("div.inventory_item_name").nth(1).textContent());
    
});


test('Web automation sauce lab - print all element text', async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Swag Labs");

    const textBox = page.locator("[class='input_error form_input']");


    await textBox.nth(0).fill("standard_user");
    await textBox.last().fill("secret_sauce");
    await page.locator("#login-button").click();    
    
    console.log(await page.locator("div.inventory_item_name").nth(1).textContent());
    console.log(await page.locator("div.inventory_item_name").allTextContents());
    
});


