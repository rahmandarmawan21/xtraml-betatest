// playwright.config.js
// Configuration file for Playwright test runner, defining browser settings and Cucumber integration
const { devices } = require('@playwright/test');

module.exports = {
  // Define test directory where feature files and step definitions are located
  testDir: './tests',
  // Timeout for each test to prevent hanging (30 seconds)
  timeout: 30000,
  // Reporter for test results (console output for learning)
  reporter: [['list']],
  // Browser configuration
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Headless mode for CI, set to false for debugging
        headless: false,
        // Viewport size for consistent testing
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  // Cucumber-specific settings
  use: {
    // Base URL for the application
    baseURL: 'https://www.saucedemo.com',
    // Take screenshots on failure for debugging
    screenshot: 'only-on-failure',
  },
};