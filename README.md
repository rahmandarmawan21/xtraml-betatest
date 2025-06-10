Xtraml-BetaTest
This repository contains automation testing scripts for the web application at https://www.saucedemo.com/v1/index.html. The scripts are designed to test key functionalities of the e-commerce platform, including user login, adding items to the cart, completing the checkout process, and logging out.
Features
The automation testing scripts cover the following features:

Login: Automates the login process to verify user authentication.
Add Item to Cart: Tests the functionality of adding products to the shopping cart.
Checkout Flow: Simulates the complete checkout process, including entering user information and confirming the order.
Logout: Validates the logout functionality to ensure secure session termination.

Prerequisites
Before running the tests, ensure you have the following installed:

Node.js (if using JavaScript-based testing frameworks like Cypress or Selenium WebDriver)
A modern web browser (e.g., Chrome, Firefox)
Any required dependencies listed in the project (check package.json or equivalent configuration file)

Setup

Clone the Repository:
git clone https://github.com/rahmandarmawan21/xtraml-betatest.git
cd xtraml-betatest


Install Dependencies:Run the following command to install the necessary dependencies:
npm install


Configure Environment:Ensure the test scripts are configured to point to the correct URL (https://www.saucedemo.com/v1/index.html). Update any configuration files if needed (e.g., cypress.json or equivalent).


Running the Tests
To execute the automation tests, use the following command:
npx playwright test or npx playwright test --ui

Test Framework
The repository uses [insert testing framework, e.g., Cypress, Selenium, or Playwright] for automation. The scripts are written in [insert language, e.g., JavaScript/TypeScript] and organized to ensure modularity and maintainability.
Folder Structure

/tests: Contains the test scripts for each feature (login, add to cart, checkout, logout).
/utils: Utility functions or helper scripts used across tests.
/config: Configuration files for the testing framework and environment settings.

Contributing
Contributions are welcome! If you find any issues or want to add new test cases, please:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License.
Contact
For any questions or issues, please reach out to the repository owner at rahmandarmawan21.