import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { TestData } from '../config/test-data';

test.describe('Sort Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    await loginPage.navigateTo('/');
    await loginPage.login(TestData.users.standard, TestData.password);
    await page.waitForURL(/inventory.html/);
  });

  test('Sort products by name A-Z', async () => {
    await inventoryPage.sortProductsBy('az');
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by name Z-A', async () => {
    await inventoryPage.sortProductsBy('za');
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by price low to high', async () => {
    await inventoryPage.sortProductsBy('lohi');
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('Sort products by price high to low', async () => {
    await inventoryPage.sortProductsBy('hilo');
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });
});