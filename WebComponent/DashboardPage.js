const { By } = require ('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
        this.addToCartButtonBackpack = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCartButtonBikelight = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.addToCartButtonTshirt = By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
    }
 
    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async navigateToCart(){
        const cartButton = await this.driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        return cartButton.click();
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButtonBackpack).click();
        await this.driver.findElement(this.addToCartButtonBikelight).click();
        await this.driver.findElement(this.addToCartButtonTshirt).click();
    }
}

module.exports = DashboardPage; 