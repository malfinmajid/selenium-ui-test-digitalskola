const { By } = require('selenium-webdriver');

class CheckOutPage {
    constructor(driver) {
        this.driver = driver;
        this.pageCheckOutTitle = By.className('title');
        this.firstNameInput = By.id('first-name'); // Input field First Name
        this.lastNameInput = By.id('last-name'); // Input field Last Name
        this.zipCodeInput = By.id('postal-code'); // Input field Zip/Postal Code
        this.continueButton = By.id('continue'); // Button Continue
    }

    async isOnCheckOutPage() {
        return await this.driver.findElement(this.pageCheckOutTitle).getText();
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeInput).sendKeys(zipCode);
    }
  
    async clickContinue() {
        await this.driver.findElement(this.continueButton).click();
    }
}

module.exports = CheckOutPage;
