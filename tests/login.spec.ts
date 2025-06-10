import { test, expect } from '@playwright/test';
import { loginPage } from '../pageObjects/loginPage';

test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.navigate();
});

test('Verify successful login with valid credentials', async ({ page }) => {
    const login = new loginPage(page);
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginButton();
});

test('Verify login failure with invalid credentials', async ({ page }) => {
    const login = new loginPage(page);
    await login.enterUsername('invalid_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginButton();
    await login.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
});