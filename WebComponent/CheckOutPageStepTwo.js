const { By } = require('selenium-webdriver');

class checkOutPageStepTwo {
    constructor(driver) {
        this.driver = driver;
        this.pageTitleStepTwo = By.className('title');
        this.finishButton = By.xpath("//button[@id='finish']"); // Tombol Finish
    }

    async isOnCheckOutStepTwo() {
        return await this.driver.findElement(this.pageTitleStepTwo).getText();
    }
    

    async clickFinishButton() {
        await this.driver.findElement(this.finishButton).click();
    }
}

module.exports = checkOutPageStepTwo;
