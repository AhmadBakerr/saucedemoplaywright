import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { TestData } from '../config/test-data';

test.describe('Remove from Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    await loginPage.navigateTo('/');
    await loginPage.login(TestData.users.standard, TestData.password);
    await inventoryPage.addProductToCart(TestData.products.backpack);
    await inventoryPage.addProductToCart(TestData.products.bikeLight);
    await inventoryPage.goToCart();
  });

  test('Remove item from cart page', async () => {
    await cartPage.removeItem(TestData.products.backpack);
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('Remove item from inventory page', async ({ page }) => {
    await page.goBack();
    await inventoryPage.removeProductFromCart(TestData.products.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });
});