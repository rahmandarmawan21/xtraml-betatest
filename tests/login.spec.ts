import { test, expect } from '@playwright/test';
import { loginPage } from '../pageObjects/loginPage';

const login = new loginPage();

test.beforeEach(async ({ page }) => {
    await login.navigate()
});

test('Verify successful login with valid credentials', async ({ page }) => {
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginButton();
    await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('Verify login failure with invalid credentials', async ({ page }) => {
    await login.enterUsername('invalid_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginButton();
    await login.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
});