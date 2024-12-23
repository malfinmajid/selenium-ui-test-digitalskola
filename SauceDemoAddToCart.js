const { Builder, By, Key, until } = require ('selenium-webdriver');
const assert = require('assert');

async function sauceDemoTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get("https://www.saucedemo.com");

        // Massukan username dan pasword
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        // Click button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Memastikan kita di dashboard dengan mencari judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        // Memastikan kita di dashboard dengan mencaru "Burger Button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        // Menambahkan item ke cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']")).click();
        
        // Validasi item sukses ditambahkan ke cart
        let shoppingCart = await driver.wait(until.elementLocated(By.xpath("//div[@id='shopping_cart_container']")),5000);
        assert.strictEqual(await shoppingCart.isDisplayed(), true, "Shopping Cart Badge is not visible");
        
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']")).click();

    }finally{
        // await driver.quit();
    }
}

sauceDemoTest();
