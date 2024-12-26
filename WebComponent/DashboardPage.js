const { By } = require ('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
        this.addToCartButtonBackpack = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCartButtonBikelight = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.addToCartButtonTshirt = By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
        this.addToCartButtonJacket = By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']");
        this.addToCartButtonOnesie = By.xpath("//button[@id='add-to-cart-sauce-labs-onesie']");
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButtonBackpack).click();
        await this.driver.findElement(this.addToCartButtonBikelight).click();
        await this.driver.findElement(this.addToCartButtonTshirt).click();
        await this.driver.findElement(this.addToCartButtonJacket).click();
        await this.driver.findElement(this.addToCartButtonOnesie).click();
    }
}

module.exports = DashboardPage; 