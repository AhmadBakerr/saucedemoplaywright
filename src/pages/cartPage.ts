import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private cartItems = '.cart_item';
  private removeButton = (productName: string) => 
    `//div[text()='${productName}']/ancestor::div[@class='cart_item']//button`;
  private checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount() {
    return (await this.page.$$(this.cartItems)).length;
  }

  async removeItem(productName: string) {
    await this.page.click(this.removeButton(productName));
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}