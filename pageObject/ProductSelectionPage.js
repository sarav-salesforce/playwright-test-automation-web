const {expect} =  require("@playwright/test");

class ProductSelectionPage {

    constructor(page) {
        this.page = page;
        this.filterProductInput = page.locator("[placeholder='Search products...']");
        this.cartIcon = page.getByRole('link', { name: 'Cart' });     
    }

     async launchWebApp(url) {
        await this.page.goto(url);
        console.log(await this.page.title());
        await expect(this.page).toHaveTitle("Product Catalog | QA Test Playground");
     }
   
   
    async filterProduct(productName) {
        await this.filterProductInput.fill(productName);
    }

    async addProductToCart(productName) {
        const addToCartButton = this.page.locator(`//button[@data-product-name='${productName}']`);
        // const addToCartButton1 = this.page.locator("//button[@data-product-name='"+productName+"']");
        await addToCartButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

}

module.exports = {ProductSelectionPage};