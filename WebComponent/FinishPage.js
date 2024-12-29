const { By } = require('selenium-webdriver');

class FinishPage {
    constructor(driver) {
        this.driver = driver;
        this.pageFinishTitle = By.className('title');
    }

    async isOnFinishPage() {
        return await this.driver.findElement(this.pageFinishTitle).getText();
    }
    
}

module.exports = FinishPage;
