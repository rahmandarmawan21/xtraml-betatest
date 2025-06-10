import { expect } from '@playwright/test';

export class inventoryPage {
  constructor(page) {
    this.page = page;
    // Selectors for inventory page elements
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('.btn_inventory');
    this.productImages = page.locator('.inventory_item_img');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartRemoveButton = page.getByRole('button', { name: 'REMOVE' }).first();
    this.checkoutButton = page.locator('.checkout_button');
    this.formFirstName = page.locator('[data-test="firstName"]');
    this.formLastName = page.locator('[data-test="lastName"]');
    this.formZipCode = page.locator('id=postal-code');
    this.continueButton = page.getByRole('button', { name: 'CONTINUE' });
    this.orderId = page.getByText('SauceCard #');
    this.shipId = page.getByText('FREE PONY EXPRESS DELIVERY!');
    this.itemTotal = page.getByText('Item total: $');
    this.finishButton = page.getByRole('link', { name: 'FINISH' });
    this.finishCheckout = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
    this.imagThanks = page.locator('#checkout_complete_container').getByRole('img');
    this.checkOutInfo = page.locator('checkout_info');
  }

  // Verify all products are displayed (6 products)
  async verifyProductList() {
    await expect(this.productItems).toHaveCount(6);
    for (const item of await this.productItems.all()) {
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_description')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      await expect(item.locator('.btn_inventory')).toBeVisible();
    }
  }

  // Select sort option from dropdown
  async selectSortOption(option) {
    await this.sortDropdown.selectOption({ label: option });
  }

  // Verify product names in specified order
  async verifyProductOrder(expectedOrder) {
    const names = await this.productNames.allTextContents();
    if (expectedOrder === 'A to Z') {
      expect(names).toEqual([...names].sort());
    } else if (expectedOrder === 'Z to A') {
      expect(names).toEqual([...names].sort().reverse());
    }
  }

  // Verify first product name
  async verifyFirstProduct(expectedName) {
    const firstProduct = this.productNames.first();
    await expect(firstProduct).toHaveText(expectedName);
  }

  // Verify first product price
  async verifyFirstProductPrice(expectedPrice) {
    const firstPrice = this.productPrices.first();
    await expect(firstPrice).toHaveText(expectedPrice);
  }

  // Verify price order (low to high or high to low)
  async verifyPriceOrder(order) {
    const prices = await this.productPrices.allTextContents();
    const priceValues = prices.map(price => parseFloat(price.replace('$', '')));
    if (order === 'low to high') {
      expect(priceValues).toEqual([...priceValues].sort((a, b) => a - b));
    } else if (order === 'high to low') {
      expect(priceValues).toEqual([...priceValues].sort((a, b) => b - a));
    }
  }

  // Click product by name to view details
  async clickProductName(productName) {
    const productLink = this.page.locator(`.inventory_item_name:text("${productName}")`);
    await productLink.click();
  }

  // Verify product detail page
  async verifyProductDetails(name, price, description) {
    await expect(this.page.locator('.inventory_details_name')).toHaveText(name);
    await expect(this.page.locator('.inventory_details_price')).toHaveText(price);
    await expect(this.page.locator('.inventory_details_desc')).toContainText(description);
    await expect(this.page.locator('.inventory_details_img')).toBeVisible();
  }

  // Verify product images load
  async verifyProductImages() {
    for (const img of await this.productImages.all()) {
      await expect(img).toHaveAttribute('src', /.*\.jpg$/);
    }
  }

  // Click Add to cart for a specific product
  async addProductToCart(productName) {
    const product = this.productItems.filter({ hasText: productName });
    await product.locator('.btn_inventory').click();
  }

  // Click Add to cart for all products
  async addAllProductsToCart() {
    for (const button of await this.addToCartButtons.all()) {
      await button.click();
    }
  }

  // Verify cart badge count
  async verifyCartBadge(count) {
    if (count === '0') {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(count);
    }
  }

  // Click cart icon to navigate to cart page
  async clickCartIcon() {
    await this.cartIcon.click();
  }

  // click cart button in shoping cart
  async clickCartRemoveButton() {
    await this.cartRemoveButton.click();
  }

  // flow checkout
  async inputFormCheckout(fname,lname,zip) {
    await this.checkoutButton.click();
    await this.formFirstName.fill(fname); 
    await this.formLastName.fill(lname);
    await this.formZipCode.click();
    await this.formZipCode.fill(zip);  
    await this.continueButton.click(); 
    await expect(this.orderId).toBeVisible();
    await expect(this.shipId).toBeVisible();
    await expect(this.itemTotal).toBeVisible(); 
    await this.finishButton.click();
    await expect(this.finishCheckout).toBeVisible();
    await expect(this.imagThanks).toBeVisible();
  }

  // Measure page load time for performance glitch user
  async measurePageLoadTime() {
    const startTime = Date.now();
    await this.page.waitForLoadState('networkidle');
    return Date.now() - startTime;
  }
}