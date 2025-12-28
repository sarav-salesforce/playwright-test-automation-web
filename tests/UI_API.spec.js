import {test, expect } from '@playwright/test';
import { request } from 'http';
//const {test, expect} =  require("@playwright/test");

const base_url = "http://localhost:3000/api";


test('@E2E UI And Api Test', async({request, page}) => {

//API Test
const payload = {
      customerName: 'Playwright Order',
      email: `test123@example.com`,
      streetAddress: '1 Test Lane',
      city: 'Austin',
      zipCode: '73301',
      shippingMethod: 'Standard (5-7 days) - Free',
      paymentMethod: 'Credit Card',
      paymentDetails: { cardEnding: '1111' },
      items: [
        { name: 'Business Laptop', sku: 'BL-01', price: 899.99, quantity: 1 },
        { name: 'Wireless Mouse', sku: 'WM-15', price: 49.99, quantity: 2 },
      ],
      subtotal: 999.97,
      shipping: 0,
      total: 999.97,
      status: 'Order Placed',
};

const response = await request.post(`${base_url}/orders`, {
    data : payload,
});

expect(response.ok()).toBeTruthy();

console.log((await response.body()).toString());

const result = await response.json();

const orderNumber = result.orderNumber;

//UI Test
await page.goto("http://localhost:3000/");

console.log(await page.title());
await expect(page).toHaveTitle("Product Catalog | QA Test Playground");

await page.locator("//a[text()='Orders']").click();

const orderPageFrame = page.frameLocator("[title='Recent Orders']");

const orderLocatorInOrderTable = orderPageFrame.locator("//td[text()='"+orderNumber+"']");
await orderLocatorInOrderTable.waitFor();
expect(await orderLocatorInOrderTable.isVisible());

const viewOrderDetailsLink = orderPageFrame.locator("//a[@href='/orders/"+orderNumber+"']");
//await viewOrderDetailsLink.waitFor();

await viewOrderDetailsLink.click();

const cancelOrderBtn = page.getByRole('button', {name : "Cancel Order"});

//await cancelOrderBtn.waitFor();

await cancelOrderBtn.click();

await page.locator("[class='btn danger']").click();

const orderCancellationSuccessMsg = page.locator("//div[text()='Order "+orderNumber+" cancelled.']");

await orderCancellationSuccessMsg.waitFor();

expect(await orderCancellationSuccessMsg.isVisible());

const orderStatus = page.locator("[class='status-badge status-cancelled']");

await orderStatus.waitFor();

expect(await orderStatus.textContent() === "Cancelled");

});