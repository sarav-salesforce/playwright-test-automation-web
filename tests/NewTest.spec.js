const {test, expect} =  require("@playwright/test");
const { text } = require("node:stream/consumers");

test('Web automation sauce lab - dynamic wait', async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Swag Labs");

    const textBox = page.locator("[class='input_error form_input']");


    await textBox.nth(0).fill("standard_user");
    await textBox.last().fill("secret_sauce");
    await page.locator("#login-button").waitFor();
    await page.locator("#login-button").click();    
    
    // dynamic wait
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded')
    await page.waitForLoadState('load');

    //waitFor
    await page.locator("div.inventory_item_name").first().waitFor();

    console.log(await page.locator("div.inventory_item_name").nth(1).textContent());

    console.log(await page.locator("div.inventory_item_name").allTextContents());
    
});



test('Web automation sauce lab - dropdown test', async({page}) => {
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title);
    await expect(page).toHaveTitle("Swag Labs");

    const textBox = page.locator("[class='input_error form_input']");


    await textBox.nth(0).fill("standard_user");
    await textBox.last().fill("secret_sauce");
    await page.locator("#login-button").waitFor();
    await page.locator("#login-button").click();  

    //to locate dropdown
    const dropdown = page.locator("select.product_sort_container");

    await dropdown.selectOption("lohi");

});


test('Web automation sauce lab - radio button / checkbox', async({page}) => {
    await page.goto("https://www.techlistic.com/p/selenium-practice-form.html");

    const maleRadioButton = page.locator("#sex-0");
    const femaleRadioButton = page.locator("#sex-1");
    const yearsOfExp = page.locator("#exp-3");

    await maleRadioButton.click();

    console.log(await maleRadioButton.isChecked());

    await expect(maleRadioButton).toBeChecked();

    //checkbox
    const professionCheckbox = page.locator("#profession-1");

    await professionCheckbox.click();

    console.log(await professionCheckbox.isChecked());

    //if expectation is true use below
    //await expect(professionCheckbox.isChecked()).toBeTruthy();

    // dynamic wait
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded')
    await page.waitForLoadState('load');

    //waitFor
    await professionCheckbox.waitFor();

    await professionCheckbox.uncheck();

    //expectation is false use below
    await expect(professionCheckbox.isChecked()).toBeFalsy();
    
});


test('Child Window / Tab handle', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://qaplayground.dev/apps/new-tab/");

    const openNewTabLink = page.locator("#open");   

    //for each line during execution - playwright gives three status back - pending, rejected and fulfilled

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen a new page to be opened
        await openNewTabLink.click()
    ]);
    
    //new page
    const textInNewPage = newPage.locator("h1");

    console.log(await textInNewPage.textContent());

    //coming back to original page

    console.log(await page.locator("h1").textContent());
});