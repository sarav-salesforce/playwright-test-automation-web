const { Given, When, Then, And } = require('@cucumber/cucumber');
const {expect} =  require("@playwright/test");
const playwright = require('playwright');
const {chromium} = require('playwright');
const { ProductSelectionPage } = require('../../pageObject/ProductSelectionPage');
const { CartPage } = require('../../pageObject/CartPage');

Given('User is on the product catalog page',{timeout: 10000}, async function () {    
    this.productSelectionPage = new ProductSelectionPage(this.page);
    await this.productSelectionPage.launchWebApp("http://localhost:3000/");
});

When('User view the list of products', function () {
    console.log("Viewing products");
});

Then('User should see all available products displayed', function () {
    console.log("All products displayed");
});


When('User adds a {string} product to the cart', async function (productName) {
    await this.productSelectionPage.filterProduct(productName);
    await this.productSelectionPage.addProductToCart(productName);
    await this.productSelectionPage.goToCart();
});

Then('The product {string} should be added to the cart successfully', async function (productName) {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.assertCartPage();
    await this.cartPage.assertProductInCart(productName);
});

