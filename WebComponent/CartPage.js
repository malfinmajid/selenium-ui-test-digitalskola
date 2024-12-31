const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.className('title');
        this.checkOutButton = By.xpath("//button[@id='checkout']");
    }

    async isOnCartPage() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async navigateToCheckOut(){
        await this.driver.findElement(this.checkOutButton).click();    
    }
}  

module.exports = CartPage;
