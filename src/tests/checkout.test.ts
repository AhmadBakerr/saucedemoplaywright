import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { TestData } from '../config/test-data';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigateTo('/');
    await loginPage.login(TestData.users.standard, TestData.password);
    await inventoryPage.addProductToCart(TestData.products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('Complete checkout process', async () => {
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.getCompleteMessage()).toContain('Thank you for your order!');
  });

  test('Validation for missing first name', async ({ page }) => {
    await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
  });
});