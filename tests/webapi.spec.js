import {test, expect } from '@playwright/test';
import { request } from 'http';
//const {test, expect} =  require("@playwright/test");

const base_url = "http://localhost:3000/api";

//GET Method
test('@API Get call to fetch all the orders', async({request}) => {

    const response = await request.get(`${base_url}/orders`);

    console.log((await response.body()).toString());
    //200 => OK
    expect(response.ok()).toBeTruthy();

    const responseArray = await response.json();

    expect (Array.isArray(responseArray)).toBeTruthy();

    expect(responseArray.length).toBeGreaterThan(0);

    expect(responseArray[0]).toEqual(
        expect.objectContaining({
            orderNumber: expect.any(String),
            email: expect.any(String),
            total: expect.any(Number),
            items: expect.any(Array),
        }),
    );
});

test('@API Get call to fetch specific order using order #', async({request}) => {

    const orderNumber = 'ORD-1763417458819';
    const response = await request.get(`${base_url}/orders/${orderNumber}`);

    console.log((await response.body()).toString());
    //200 => OK
    expect(response.ok()).toBeTruthy();

    const responseArray = await response.json();

    expect(responseArray).toEqual(
        expect.objectContaining({
            orderNumber: expect.any(String),
            email: expect.any(String),
            total: expect.any(Number),
            items: expect.any(Array),
        }),
    );
});

test('@API Get call to fetch specific order using email id', async({request}) => {

    const emailAddress = 'jamie@example.com';
    const response = await request.get(`${base_url}/orders/${emailAddress}`);

    console.log((await response.body()).toString());
    //200 => OK
    expect(response.ok()).toBeTruthy();

    const responseArray = await response.json();

    //if only one order comes back use below
    // expect(responseArray).toEqual(
    //     expect.objectContaining({
    //         orderNumber: expect.any(String),
    //         email: expect.any(String),
    //         total: expect.any(Number),
    //         items: expect.any(Array),
    //     }),
    // );

    //if more than one order comes back as response then use below:
    expect (Array.isArray(responseArray)).toBeTruthy();

    expect(responseArray.length).toBeGreaterThan(0);

    expect(responseArray[0]).toEqual(
        expect.objectContaining({
            orderNumber: expect.any(String),
            email: expect.any(String),
            total: expect.any(Number),
            items: expect.any(Array),
        }),
    );
});


//POST Method

test('@API POST to create order', async({request}) => {
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

});


//How to parse the json response and retrieve the value
//GET Call

test('@API Get call to fetch all the orders and parse the response', async({request}) => {

    const response = await request.get(`${base_url}/orders`);

    console.log((await response.body()).toString());
    //200 => OK
    expect(response.ok()).toBeTruthy();

    const responseArray = await response.json();

    const firstOrderNumber = responseArray[10].orderNumber;
    console.log('Order number is: ', firstOrderNumber)

    //const playwrightOrder = responseArray.find((o: any) => o.customerName === 'Playwright Order');
    const playwrightOrder = responseArray.find( o => 
        o.customerName && o.customerName.toLowerCase().includes('playwright')
    );

    console.log ('Playwright Order:', playwrightOrder);

    expect(playwrightOrder).toBeTruthy();


    //how to use the first order number
    const filteredOrder = responseArray.filter(o => o.orderNumber === firstOrderNumber);

    console.log('Filtered order is: ', filteredOrder);

    expect(filteredOrder.length).toBe(1);

    //how to use read the order number from the playwright order and then filter
    const playwrightCustomerOrder = playwrightOrder.orderNumber;
    console.log('Order number is: ',playwrightCustomerOrder);

});


//POST Call

test('@API POST to create order and then parse the ordernumber', async({request}) => {
const payload = [{
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
},
{
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
}
];

const response = await request.post(`${base_url}/orders`, {
    data : payload,
});

expect(response.ok()).toBeTruthy();

console.log((await response.body()).toString());

const result = await response.json();

//console.log('Order Number:', result.orderNumber);

console.log('First order:', result.orderNumbers[0]);
console.log('Second order:', result.orderNumbers[1]);

});


