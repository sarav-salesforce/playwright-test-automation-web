import { expect, type Locator, type Page } from '@playwright/test';

export class ProductSelectionPage {

    page: Page;
    filterProductInput : Locator;
    cartIcon : Locator;

    constructor(page:Page) {
        this.page = page;
        this.filterProductInput = page.locator("[placeholder='Search products...']");
        this.cartIcon = page.getByRole('link', { name: 'Cart' });     
    }

     async launchWebApp(url:string) {
        await this.page.goto(url);
        console.log(await this.page.title());
        await expect(this.page).toHaveTitle("Product Catalog | QA Test Playground");
     }
   
   
    async filterProduct(productName:string) {
        await this.filterProductInput.fill(productName);
    }

    async addProductToCart(productName:string) {
        const addToCartButton = this.page.locator(`//button[@data-product-name='${productName}']`);
        // const addToCartButton1 = this.page.locator("//button[@data-product-name='"+productName+"']");
        await addToCartButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

}

module.exports = {ProductSelectionPage};