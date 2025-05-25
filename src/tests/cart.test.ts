import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { TestData } from '../config/test-data';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateTo('/');
    await loginPage.login(TestData.users.standard, TestData.password);
  });

  test('Add single item to cart', async () => {
    await inventoryPage.addProductToCart(TestData.products.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });

  test('Add multiple items to cart', async () => {
    await inventoryPage.addProductToCart(TestData.products.backpack);
    await inventoryPage.addProductToCart(TestData.products.bikeLight);
    expect(await inventoryPage.getCartItemCount()).toBe(2);
  });
});