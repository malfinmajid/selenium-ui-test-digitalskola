const { Builder } = require ('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshot/';
if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase3', function () {
    this.timeout(40000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

     // Assertion login
    // Validate user in dashboard after login
    it ('Login successfully and verify dashboard', async function() {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title is not found');
    });

    // Assertion add item to cart
    // Add all item to cart
    it('Successfully add item to cart and verify', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addItemToCart(); // Add item to cart
        
    // Successfully validate add item to cart page
        const cartPage = new CartPage(driver);
        await cartPage.navigate(); // Navigate to cart page
        const pageTitle = await cartPage.isOnCartPage();
        assert.strictEqual(pageTitle, 'Your Cart', 'Expected cart title is not found in cart');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });
    
    after(async function () {
        // await driver.quit();
    });
});
