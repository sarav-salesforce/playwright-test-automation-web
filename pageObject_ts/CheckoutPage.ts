import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {

    page:Page;
    FullName : Locator;
    Email : Locator;
    StreetAddress : Locator;
    City : Locator;
    ZipCode : Locator;
    ShippingMethod : Locator;
    CardNumber : Locator;
    NameOnCard : Locator;
    ExpirationDate : Locator;
    CVV : Locator;
    PlaceOrderButton : Locator;



    constructor(page:Page) {
        this.page = page;
        this.FullName = page.locator("[name='customerName']");
        this.Email = page.locator("[name='email']");
        this.StreetAddress = page.locator("[name='streetAddress']");
        this.City = page.locator("[name='city']");
        this.ZipCode = page.locator("[name='zipCode']");
        this.ShippingMethod = page.locator("[name='shippingMethod']");
        this.CardNumber = page.locator("[name='cardNumber']");
        this.NameOnCard = page.locator("[name='cardName']");
        this.ExpirationDate = page.locator("[name='expiry']");
        this.CVV = page.locator("[name='cvv']");
        this.PlaceOrderButton = page.getByRole('button', { name: 'Place Order' });
    }

    async assertCheckoutPage() {
        await expect(this.page).toHaveTitle("Checkout | QA Test Playground");
    }

    async completeShipingInfo(fullName:string, email:string, streetAddress:string, city:string, zipCode:string, shippingMethod:string) {
        await this.FullName.fill(fullName);
        await this.Email.fill(email);
        await this.StreetAddress.fill(streetAddress);
        await this.City.fill(city);
        await this.ZipCode.fill(zipCode);
        await this.ShippingMethod.selectOption(shippingMethod);
    }

    async choosePaymentMethod(method:string) {
        const paymentMethodRadio = this.page.locator(`//input[@name='paymentMethod' and @value='${method}']`);
        await paymentMethodRadio.check();
    }

    async completePaymentInfo(cardNumber:string, nameOnCard:string, expirationDate:string, cvv:string) {
        await this.CardNumber.fill(cardNumber);
        await this.NameOnCard.fill(nameOnCard);
        await this.ExpirationDate.fill(expirationDate);
        await this.CVV.fill(cvv);
    }

    async placeOrder() {
        await this.PlaceOrderButton.click();
    }   
}

module.exports = {CheckoutPage};