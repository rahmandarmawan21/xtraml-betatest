import { expect } from '@playwright/test';

export class loginPage {
  constructor(page) {
    this.page = page;
    // Selectors for login page elements
    this.usernameInput = page.locator('id=user-name');
    this.passwordInput = page.locator('id=password');
    this.loginButton = page.locator('id=login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.buttonBurger = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.locator('id=logout_sidebar_link');

  }

  // Navigate to the login page
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/index.html');
    // Verify the page is loaded by checking the login button
    await expect(this.loginButton).toBeVisible();
  }

  // Enter username (handles blank input)
  async enterUsername(username) {
    if (username) {
      await this.usernameInput.fill(username);
    } else {
      await this.usernameInput.fill('');
    }
  }

  // Enter password (handles blank input)
  async enterPassword(password) {
    if (password) {
      await this.passwordInput.fill(password);
    } else {
      await this.passwordInput.fill('');
    }
  }

  // Click the login button
  async clickLoginButton() {
    await this.loginButton.click();
  }

  // Verify error message text
  async verifyErrorMessage(message) {
    await expect(this.errorMessage).toHaveText(message);
  }

  //logout
  async clickLogoutButton() {
    await this.buttonBurger.click();
    await this.logoutButton.click();
    await expect(this.loginButton).toBeVisible();
  }
}