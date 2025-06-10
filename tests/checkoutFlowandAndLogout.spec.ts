import { test, expect } from '@playwright/test';
import { loginPage } from '../pageObjects/loginPage';
import { inventoryPage } from '../pageObjects/inventoryPage';


test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.navigate();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginButton();
});

test('Checkout flow name, address, complete order', async ({ page }) => {
    const inven = new inventoryPage(page);
    await inven.addProductToCart('Sauce Labs Backpack');
    await inven.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inven.verifyCartBadge('2');
    await inven.clickCartIcon();
    await inven.inputFormCheckout('rahman','darmawan','18790');
});

test('Logout flow', async ({ page }) => {
    const login = new loginPage(page);
    await login.clickLogoutButton();
});