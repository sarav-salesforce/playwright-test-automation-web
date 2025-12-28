const {test, expect} =  require("@playwright/test");


test('@Smoke Web automation - product selection', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    //Option 1: Adding to cart
    
    // const products = await page.locator("[class='text-lg font-semibold leading-tight']");

    // const addToCartButton = await page.locator("//button[text()='Add to Cart']");

    // console.log(await products.allTextContents());

    // const count = await products.count();

    // console.log(count);

    // const productName = "Gaming Headset";

    // const addToCartSuccessMessage = page.locator("//div[contains(text(),'"+productName+" has been added to your cart.')]");

    // for(let i=0; i<count; i++) {
    //     const name = await products.nth(i).textContent();
    //     console.log("From UI: ", name);
    //     if(name === productName) {
    //         console.log("Name matched: ", name);
    //         await addToCartButton.nth(i).click();
    //         await addToCartSuccessMessage.waitFor();
    //         console.log(await addToCartSuccessMessage.textContent());
    //         expect(await addToCartSuccessMessage.isVisible());
    //         break;
    //     }
    // }

    //Option 2: Adding to cart

    const productName = "Business Laptop";

    const addToCartButton = page.locator("//h3[text()='"+productName+"']/following::button[1]");

    //await addToCartButton.waitFor();

    await addToCartButton.click();

    const addToCartSuccessMessage = page.locator("//div[contains(text(),'"+productName+" has been added to your cart.')]");
    await addToCartSuccessMessage.waitFor();
    console.log(await addToCartSuccessMessage.textContent());
    expect(await addToCartSuccessMessage.isVisible());

    //click the cart icon

    const cartIcon = page.locator("[data-testid='cart-nav-link']");

    await cartIcon.click();

    //Assert the product is present in cart or not

    //Option 1: Asserting if you are in cart page and then asserting the product name
    const cartPageTitle = page.locator("[data-testid='cart-page-title']");
    await cartPageTitle.waitFor();
    expect(await cartPageTitle.isVisible());

    const productInCart = page.locator("//h3[text()='"+productName+"']");
    await productInCart.waitFor();
    expect(await productInCart.isVisible());
    

    //Option 2: Using a different locator the product name in cart page

    const productInCart1 = page.locator("[data-testid*='cart-item-name']");
    expect(await productInCart1.textContent() === productName);
   

    //Proceed to checkout

    const checkoutButton = page.locator("[data-testid='proceed-to-checkout-button']");

    await checkoutButton.click();

    //Complete Address details

    const name = page.locator("#name");
    await name.fill("Saravanan Ramaswamy");

    await page.locator("#email").fill("test@test.com");

    await page.locator("#address").fill("20 Gracechruch Street");
    
    await page.locator("#city").fill("London");

    await page.locator("#zipCode").fill("EC13");

    //for reference
    // const dropdown = page.locator("select.product_sort_container");
    // await dropdown.selectOption("lohi");

    const dropdown = page.locator("//button[@role='combobox']/following::select[1]");
    await dropdown.selectOption("express");


    //Complete Payment details

    await page.locator("#cardNumber").fill("4111-1111-1111-1111");

    await page.locator("#cardName").fill("Saravanan Ramaswamy");
    
    await page.locator("#expiry").fill("02/28");

    await page.locator("#cvv").fill("123");

    //Place order
    await page.locator("[data-testid='place-order-button']").click();

    //Verify Order

    const orderConfirmation = page.locator("[data-testid='confirmation-title']");
    orderConfirmation.waitFor();
    expect(orderConfirmation.isVisible());

    //Retrieve the Order Id
    
    const orderId = page.locator("[data-testid='order-id']");
    orderId.waitFor();
    expect(orderId.isVisible());
    console.log("Order Id is: ",await orderId.textContent());

});


//GetByRole, GetByLabel, GetByPlaceholder & GetByText



test('@Smoke Web automation - Advanced Selectors / Locators - GetByLabel', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    //traditional locator
    const outOfStockCheckbox = page.locator("#hide-out-of-stock");
    await outOfStockCheckbox.check();

    // new locator

    const outOfStock = page.getByLabel("Hide out of stock items");
    await outOfStock.click();

    //Add code related to adding to cart and proceeding to checkout
    
    const productName = "Business Laptop";

    const addToCartButton = page.locator("//h3[text()='"+productName+"']/following::button[1]");

    //await addToCartButton.waitFor();

    await addToCartButton.click();

    const addToCartSuccessMessage = page.locator("//div[contains(text(),'"+productName+" has been added to your cart.')]");
    await addToCartSuccessMessage.waitFor();
    console.log(await addToCartSuccessMessage.textContent());
    expect(await addToCartSuccessMessage.isVisible());

    //click the cart icon

    const cartIcon = page.locator("[data-testid='cart-nav-link']");

    await cartIcon.click();

    //Assert the product is present in cart or not

    //Option 1: Asserting if you are in cart page and then asserting the product name
    const cartPageTitle = page.locator("[data-testid='cart-page-title']");
    await cartPageTitle.waitFor();
    expect(await cartPageTitle.isVisible());

    const productInCart = page.locator("//h3[text()='"+productName+"']");
    await productInCart.waitFor();
    expect(await productInCart.isVisible());
    

    //Option 2: Using a different locator the product name in cart page

    const productInCart1 = page.locator("[data-testid*='cart-item-name']");
    expect(await productInCart1.textContent() === productName);
   

    //Proceed to checkout

    const checkoutButton = page.locator("[data-testid='proceed-to-checkout-button']");

    await checkoutButton.click();

    //in checkout page

    //Old way
    const paymentType =  page.locator("//button[@value='paypal']");

    await paymentType.check();

    //New way
    const paymentMethod = page.getByLabel("Bank Transfer (Test Mode)");
    await paymentMethod.click();

});

test('Web automation - Advanced Selectors / Locators - GetByPlaceholder', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    const productSearchBar = page.getByPlaceholder("Search products...");

    const productName = "Business Laptop";

    //type all characters at once
    await productSearchBar.fill(productName);   

    //type one character at a time
    //await productSearchBar.pressSequentially(productName);

    const addToCartButton = page.locator("//h3[text()='"+productName+"']/following::button[1]");

    //await addToCartButton.waitFor();

    await addToCartButton.click();

    const addToCartSuccessMessage = page.locator("//div[contains(text(),'"+productName+" has been added to your cart.')]");
    await addToCartSuccessMessage.waitFor();
    console.log(await addToCartSuccessMessage.textContent());
    expect(await addToCartSuccessMessage.isVisible());

    //click the cart icon

    const cartIcon = page.locator("[data-testid='cart-nav-link']");

    await cartIcon.click();

    //Assert the product is present in cart or not

    //Option 1: Asserting if you are in cart page and then asserting the product name
    const cartPageTitle = page.locator("[data-testid='cart-page-title']");
    await cartPageTitle.waitFor();
    expect(await cartPageTitle.isVisible());

    const productInCart = page.locator("//h3[text()='"+productName+"']");
    await productInCart.waitFor();
    expect(await productInCart.isVisible());
    

    //Option 2: Using a different locator the product name in cart page

    const productInCart1 = page.locator("[data-testid*='cart-item-name']");
    expect(await productInCart1.textContent() === productName);
   

    //Proceed to checkout

    const checkoutButton = page.locator("[data-testid='proceed-to-checkout-button']");

    await checkoutButton.click();

    //payment

    //await page.locator("#cardNumber").fill("4111-1111-1111-1111");

    await page.getByPlaceholder("4111-1111-1111-1111").fill("4111-1111-1111-1111")

    await page.locator("#cardName").fill("Saravanan Ramaswamy");
    
    //await page.locator("#expiry").fill("02/28");

    await page.getByPlaceholder("MM/YY").fill("02/28");

    //await page.locator("#cvv").fill("123");

    await page.getByPlaceholder("123").fill("123");

});


test('Web automation - Advanced Selectors / Locators - GetByText', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    const checkbox = page.getByText("Hide out of stock items");
    await checkbox.check();
    
    //click the cart icon

    const cartIcon = page.locator("[data-testid='cart-nav-link']");

    await cartIcon.click();

    const playGroundText = page.getByText("Test Playground");

    await playGroundText.click();

    const productSearchBar = page.getByPlaceholder("Search products...");

    const productName = "Business Laptop";

    //type all characters at once
    await productSearchBar.fill(productName);   

    //type one character at a time
    //await productSearchBar.pressSequentially(productName);

    const addToCartButton = page.locator("//h3[text()='"+productName+"']/following::button[1]");

    //await addToCartButton.waitFor();

    await addToCartButton.click();

    const addToCartSuccessMessage = page.getByText("Added to cart");
    await addToCartSuccessMessage.first().waitFor();
    expect(await addToCartSuccessMessage.nth(0).isVisible());

    const addToCartSuccessMessage1 = page.getByText(productName+" has been added to your cart.");
    await addToCartSuccessMessage1.first().waitFor();
    expect(await addToCartSuccessMessage1.nth(0).isVisible());
});

test('Web automation - Advanced Selectors / Locators - GetByRole', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");


    const addToCartBtn = page.getByRole('button', {name : "Add to Cart"});

    await addToCartBtn.nth(1).click();

    const cartIcon = page.getByRole('link', {name : "Cart"});

    await cartIcon.click();
});


test('Web automation - Advanced Selectors / Locators - Mulitple', async({page}) => {
    await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    const prodName = "Business Laptop";

    const addtoCartBttn = page.locator("[data-testid*='product-card-prod']").filter({hasText : prodName}).getByRole('button', {name : "Add to Cart"});
    await addtoCartBttn.click();
});


test('Handle Alert', async({page}) => {
 await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    const prodName = "Business Laptop";

    const addtoCartBttn = page.locator("[data-testid*='product-card-prod']").filter({hasText : prodName}).getByRole('button', {name : "Add to Cart"});
    await addtoCartBttn.click();

    const cartIcon = page.getByRole('link', {name : "Cart"});

    await cartIcon.click();

    const removeProduct = page.locator("//h3[text()='"+prodName+"']/following::button[contains(@data-testid,'remove-item-prod')][1]");

    // //to accept the alert
    // page.on('dialog', dialog => dialog.accept());

    //to dismiss the alert
    page.on('dialog', dialog => dialog.dismiss());

    await removeProduct.click();

    const emptyCartMessage = page.getByText("Your cart is empty");

    await emptyCartMessage.waitFor();

    expect(await emptyCartMessage.isVisible());

    // //to dismiss the alert
    // page.on('dialog', dialog => dialog.dismiss());

});



test('Handle iframes', async({page}) => {
 await page.goto("https://qa-journey-play.lovable.app/");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Playground - E-commerce Testing Sandbox");

    //Option 2: Adding to cart

    const productName = "Business Laptop";

    const addToCartButton = page.locator("//h3[text()='"+productName+"']/following::button[1]");

    //await addToCartButton.waitFor();

    await addToCartButton.click();

    const addToCartSuccessMessage = page.locator("//div[contains(text(),'"+productName+" has been added to your cart.')]");
    await addToCartSuccessMessage.waitFor();
    console.log(await addToCartSuccessMessage.textContent());
    expect(await addToCartSuccessMessage.isVisible());

    //click the cart icon

    const cartIcon = page.locator("[data-testid='cart-nav-link']");

    await cartIcon.click();

    //Assert the product is present in cart or not

    //Option 1: Asserting if you are in cart page and then asserting the product name
    const cartPageTitle = page.locator("[data-testid='cart-page-title']");
    await cartPageTitle.waitFor();
    expect(await cartPageTitle.isVisible());

    const productInCart = page.locator("//h3[text()='"+productName+"']");
    await productInCart.waitFor();
    expect(await productInCart.isVisible());
    

    //Option 2: Using a different locator the product name in cart page

    const productInCart1 = page.locator("[data-testid*='cart-item-name']");
    expect(await productInCart1.textContent() === productName);
   

    //Proceed to checkout

    const checkoutButton = page.locator("[data-testid='proceed-to-checkout-button']");

    await checkoutButton.click();

    //Complete Address details

    const name = page.locator("#name");
    await name.fill("Saravanan Ramaswamy");

    await page.locator("#email").fill("test@test.com");

    await page.locator("#address").fill("20 Gracechruch Street");
    
    await page.locator("#city").fill("London");

    await page.locator("#zipCode").fill("EC13");

    //for reference
    // const dropdown = page.locator("select.product_sort_container");
    // await dropdown.selectOption("lohi");

    const dropdown = page.locator("//button[@role='combobox']/following::select[1]");
    await dropdown.selectOption("express");


    //Complete Payment details

    await page.locator("#cardNumber").fill("4111-1111-1111-1111");

    await page.locator("#cardName").fill("Saravanan Ramaswamy");
    
    await page.locator("#expiry").fill("02/28");

    await page.locator("#cvv").fill("123");

    //Place order
    await page.locator("[data-testid='place-order-button']").click();

    //Verify Order

    const orderConfirmation = page.locator("[data-testid='confirmation-title']");
    orderConfirmation.waitFor();
    expect(orderConfirmation.isVisible());

    //Retrieve the Order Id
    
    const orderId = page.locator("[data-testid='order-id']");
    orderId.waitFor();
    expect(orderId.isVisible());
    console.log("Order Id is: ",await orderId.textContent());

    await page.locator("[href*='orders']").first().click();

    const frameLocator = page.frameLocator("[title='All Orders Table']");

    const orderIds = frameLocator.locator("[data-testid*='order-id-ORD-']");

    await orderIds.waitFor();

    console.log(await orderIds.allTextContents());

    await page.locator("[href*='orders']").first().click();


});