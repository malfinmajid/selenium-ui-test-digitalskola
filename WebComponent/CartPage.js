const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.className('title');
    }

    async navigate() {
        await this.driver.get('https://www.saucedemo.com/cart.html');
    }

    async isOnCartPage() {
        return await this.driver.findElement(this.pageTitle).getText();
    }
}

module.exports = CartPage;
