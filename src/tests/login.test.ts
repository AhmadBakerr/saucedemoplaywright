import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TestData } from '../config/test-data';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo('/');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login(TestData.users.standard, TestData.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Failed login with locked user', async ({ page }) => {
    await loginPage.login(TestData.users.locked, TestData.password);
    await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Failed login with invalid password', async ({ page }) => {
    await loginPage.login(TestData.users.standard, 'wrong_password');
    await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Username and password do not match');
  });
});