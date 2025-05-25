import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private productSortDropdown = 'select.product_sort_container';
  private inventoryItems = '.inventory_item';
  private addToCartButton = (productName: string) => 
    `//div[text()='${productName}']/ancestor::div[@class='inventory_item_description']//button`;
  private removeFromCartButton = (productName: string) => 
    `//div[text()='${productName}']/ancestor::div[@class='inventory_item_description']//button[text()='Remove']`;
  private shoppingCartBadge = '.shopping_cart_badge';
  private shoppingCartLink = '.shopping_cart_link';

  constructor(page: Page) {
    super(page);
  }

  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.waitForSelector(this.productSortDropdown, { state: 'visible', timeout: 10000 });
    await this.page.selectOption(this.productSortDropdown, option);
    await this.page.waitForTimeout(500); 
  }

  async getProductNames(): Promise<string[]> {
    await this.page.waitForSelector('.inventory_item_name', { state: 'attached' });
    const names = await this.page.$$eval('.inventory_item_name', elements => 
      elements.map(el => el.textContent?.trim() || '')
    );
    return names.filter(name => name !== '');
  }

  async getProductPrices(): Promise<number[]> {
    await this.page.waitForSelector('.inventory_item_price', { state: 'attached' });
    return await this.page.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
    );
  }

  async addProductToCart(productName: string) {
    await this.page.click(this.addToCartButton(productName));
  }

  async removeProductFromCart(productName: string) {
    await this.page.click(this.removeFromCartButton(productName));
  }

  async getCartItemCount(): Promise<number> {
    const badge = await this.page.$(this.shoppingCartBadge);
    return badge ? parseInt(await badge.textContent() || '0') : 0;
  }

  async goToCart() {
    await this.page.click(this.shoppingCartLink);
  }
}