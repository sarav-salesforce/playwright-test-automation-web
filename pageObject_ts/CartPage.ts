import { expect, type Locator, type Page } from '@playwright/test';


export class CartPage {
    
    page:Page;
    proceedToCheckoutButton :  Locator;
    continueShoppingButton : Locator;
    
    constructor(page:Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.getByRole('link', { name: 'Proceed to Checkout' });
        this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });
    }

    async assertCartPage() {
        await expect(this.page).toHaveTitle("Shopping Cart | QA Test Playground");
    }

    async assertProductInCart(productName:string) {
        const productInCart = this.page.locator(`//h2[text()='${productName}']`);
        await productInCart.waitFor();
        await expect(productInCart).toBeVisible();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = {CartPage};