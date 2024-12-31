const { Builder } = require ('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const CheckOutPage = require('../WebComponent/CheckOutPage');
const CheckOutPageStepTwo = require('../WebComponent/CheckOutPageStepTwo');
const FinishPage = require('../WebComponent/FinishPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();    

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 6 [finish checkout] #Regression', function () {
    this.timeout(40000);
    let driver;
    // Testing on Multiple Browser
    switch(browser.toLocaleLowerCase()){
        case 'firefox':
                const firefox = require('selenium-webdriver/firefox');
                options = new firefox.Options();
                options.addArguments('--headless');

        case 'chrome':
        default:
                const chrome = require('selenium-webdriver/chrome');
                options = new chrome.Options();
                options.addArguments('--headless');
                break;
    }
    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });
    
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

   // Assertion login
   // Validate user in dashboard after login
   it ('Login successfully and verify dashboard', async function() {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title is not found');
    });

    // Assertion add item 
    // Add all item to cart
    it('Successfully add item and verify', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addItemToCart(); // Add item to cart

        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected item did not add to cart');
    });

    // Assertion item in cart
    // All item on the cart
    it('Successfully item on cart and verify', async function () {
        const dashboardPage = new DashboardPage(driver);
        // await dashboardPage.addItemToCart(); // Add item to cart
        await dashboardPage.navigateToCart(); // Navigate to cart page
        
    // Successfully validate add item to cart page
        const cartPage = new CartPage(driver);
        const pageTitle = await cartPage.isOnCartPage();
        assert.strictEqual(pageTitle, 'Your Cart', 'Expected cart title is not found in cart');
    });
 
    // Assertion: Validate checkout step one page
    // Fill out the checkout form
    it('Successfully Checkout Step One and verify', async function () {
        // Initialize DashboardPage
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigateToCart(); // Navigate to cart page
    
        // Navigate to checkout page
        const cartPage = new CartPage(driver);
        await cartPage.navigateToCheckOut();

        // Validate checkout step one
        const checkOutPage = new CheckOutPage(driver);
        const pageCheckOutTitle = await checkOutPage.isOnCheckOutPage();
        assert.strictEqual(pageCheckOutTitle, 'Checkout: Your Information', 'Expected checkout step one title is not found');

        // Fill out the checkout form
        await checkOutPage.fillCheckoutForm('Kevin', 'Parker', '12345');
    });

    // Assertion validate all information 
    // Check the information
    it('Successfully Checkout Step Two and verify', async function () {
        // Initialize DashboardPage
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigateToCart(); // Navigate to cart page
    
        // Navigate to checkout page
        const cartPage = new CartPage(driver);
        await cartPage.navigateToCheckOut();
    
        // Validate checkout step one
        const checkOutPage = new CheckOutPage(driver);

        // Fill out the checkout form
        await checkOutPage.fillCheckoutForm('Kevin', 'Parker', '12345');
    
        // Click continue button
        await checkOutPage.clickContinue();
    
        // Validate checkout step two
        const checkOutPageStepTwo = new CheckOutPageStepTwo(driver);
        const pageTitleStepTwo = await checkOutPageStepTwo.isOnCheckOutStepTwo();
        assert.strictEqual(pageTitleStepTwo, 'Checkout: Overview', 'Expected Checkout Step Two title is not found');
    });
    
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });
    
    after(async function () {
        await driver.quit();
    });
});