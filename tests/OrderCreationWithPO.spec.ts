import { test, expect } from "@playwright/test";

import { json } from 'stream/consumers';
import { readExcelData } from '../utils_ts/excelReader';
import path from 'path';
import { CartPage } from '../pageObject_ts/CartPage';
import { ProductSelectionPage } from '../pageObject_ts/ProductSelectionPage';
import { CheckoutPage } from '../pageObject_ts/CheckoutPage';


import { readTestData } from '../utils_ts/readExcelForTest';

const jsonData = JSON.parse(JSON.stringify(require('../data.json')));

test.describe.configure({mode:'parallel'});

// test.describe.configure({mode:'serial'});

test("@UI Create Order with Page Object", async ({ page }) => {

    //UI Test
    const productSelectionPage = new ProductSelectionPage(page);

    await productSelectionPage.launchWebApp("http://localhost:3000/");

    //Add Product To Cart
    const productName = "Business Laptop";
    await productSelectionPage.filterProduct(productName);
    await productSelectionPage.addProductToCart(productName);
    await productSelectionPage.goToCart();

    //Cart Page Actions
    const cartPage = new CartPage(page);
    await cartPage.assertCartPage();
    await cartPage.assertProductInCart(productName);
    await cartPage.proceedToCheckout();

    //Checkout Page Actions
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertCheckoutPage();
    await checkoutPage.completeShipingInfo("Sarav Ramaswamy", "sarav@test.com", "20 GraceChruch Street", "London", "EC2M", "standard");
    const paymentMethod = "Credit Card";
    await checkoutPage.choosePaymentMethod(paymentMethod);
    if (paymentMethod === "Credit Card") {
        await checkoutPage.completePaymentInfo("4111-1111-1111-1111", "Sarav Ramaswamy", "12/26", "123");
    }
    await checkoutPage.placeOrder();
});


test("@UI Create Order with Page Object using Test Data", async ({ page }) => {

    const excelPath = path.join(__dirname, '../TestData.xlsx');
    const testData = await readExcelData(excelPath, 'Sheet1');

    console.log(testData);

    //UI Test
    const productSelectionPage = new ProductSelectionPage(page);

    await productSelectionPage.launchWebApp("http://localhost:3000/");

    //Add Product To Cart
    //const productName = "Business Laptop";    
    const productName = testData[0]['ProductName'];
    console.log(`Product Name from Excel: ${productName}`);
    await productSelectionPage.filterProduct(productName);
    await productSelectionPage.addProductToCart(productName);
    await productSelectionPage.goToCart();

    //Cart Page Actions
    const cartPage = new CartPage(page);
    await cartPage.assertCartPage();
    await cartPage.assertProductInCart(productName);
    await cartPage.proceedToCheckout();

    //Checkout Page Actions
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertCheckoutPage();
    //await checkoutPage.completeShipingInfo("Sarav Ramaswamy","sarav@test.com","20 GraceChruch Street","London","EC2M","standard");
    await checkoutPage.completeShipingInfo(testData[0]['FullName'], testData[0]['Email'], testData[0]['StreetAddress'], testData[0]['City'], testData[0]['PostCode'], testData[0]['ShippingMethod']);
    // const paymentMethod = "Credit Card";
    const paymentMethod = testData[0]['paymentMethod'];
    await checkoutPage.choosePaymentMethod(paymentMethod);
    if (paymentMethod === "Credit Card") {
        await checkoutPage.completePaymentInfo(testData[0]['cardNumber'], testData[0]['cardName'], testData[0]['cardExpiry'], testData[0]['cardCVV']);
    }
    await checkoutPage.placeOrder();
});


test("Create Order with Page Object using different Test Data", async ({ page }) => {

    const excelPath = path.join(__dirname, '../TestData.xlsx');
    const testData = await readExcelData(excelPath, 'Sheet1');

    console.log(testData);

    for (const data of testData) {

        //UI Test
        const productSelectionPage = new ProductSelectionPage(page);

        await productSelectionPage.launchWebApp("http://localhost:3000/");

        //Add Product To Cart
        //const productName = "Business Laptop";    
        const productName = data.ProductName;
        console.log(`Product Name from Excel: ${productName}`);
        await productSelectionPage.filterProduct(productName);
        await productSelectionPage.addProductToCart(productName);
        await productSelectionPage.goToCart();

        //Cart Page Actions
        const cartPage = new CartPage(page);
        await cartPage.assertCartPage();
        await cartPage.assertProductInCart(productName);
        await cartPage.proceedToCheckout();

        //Checkout Page Actions
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.assertCheckoutPage();
        //await checkoutPage.completeShipingInfo("Sarav Ramaswamy","sarav@test.com","20 GraceChruch Street","London","EC2M","standard");
        await checkoutPage.completeShipingInfo(data.FullName, data.Email, data.StreetAddress, data.City, data.PostCode, data.ShippingMethod);
        // const paymentMethod = "Credit Card";
        const paymentMethod = data['paymentMethod'];
        await checkoutPage.choosePaymentMethod(paymentMethod);
        if (paymentMethod === "Credit Card") {
            await checkoutPage.completePaymentInfo(data.cardNumber, data.cardName, data.cardExpiry, data.cardCVV);
        }
        await checkoutPage.placeOrder();
    }

});


test("Create Order using TestData with TestName as filter", async ({ page }) => {

    const excelPath = path.join(__dirname, '../TestData.xlsx');
    //const testData = await readExcelData(excelPath, 'Sheet1');
    const testData = await readTestData(excelPath, 'Sheet1', 'Create Order using TestData with TestName as filter');

    console.log(testData);

    const productName = testData.ProductName;
    console.log(`Product Name from Excel: ${productName}`);

});


for (const data of jsonData) {
    test(`Read TestData from Json with ${data.testName}`, async ({ page }) => {
        console.log(data);
        console.log(`${data.testName}`)
    });
}
