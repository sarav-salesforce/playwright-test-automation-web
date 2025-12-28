import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello, World!";

console.log(message1);

message1 = "20";

console.log(message1);

let count1 : number = 10;

count1 = 30;

console.log(count1);

let numArray : number[] = [1, 2, 3, 4, 5];
numArray.push(6);

let strArray : string[] = ["one", "two", "three"];
strArray.push("4");

let isActive : boolean = true;

let data : any = "This can be any type";
data = 40;


function addition(a:number, b:number) : number {
    return a+b;
}

addition(5, 10);


let user1 : {name: string, role: string, location:string} = {name: "Sarav", role: "Admin", location:"London"};

user1.location = "UK";




class CartPage {   
    
    page:Page;
    proceedToCheckoutButton :  Locator;
    continueShoppingButton : Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.getByRole('link', { name: 'Proceed to Checkout' });
        this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });
    }

    async assertCartPage() {
        await expect(this.page).toHaveTitle("Shopping Cart | QA Test Playground");
    }

    async assertProductInCart(productName:any) {
        const productInCart = this.page.locator(`//h2[text()='${productName}']`);
        await productInCart.waitFor();
        await expect(productInCart).toBeVisible();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = {CartPage};