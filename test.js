//Add to Cart Validation
/*
Test Goal:
1 Dine in Path to Cart
2 Add 4 items to a Cart 3 of them are different, atleast one has amod/upsell/upgrade
3 AssertonCart-Table-Number/Discount/Item/$/ModORUpgradeORUpsell/CorrectNumberofItems
4 Checkout with Existing User

TestData
1. TableNumber = Limitedto1to100
2. User-61400000000/3066
*/

const {chromium} = require('playwright');
const assert = require('assert');
(async () =>{
    const browser = await chromium.launch({
        headless: false,
        slowMo: 20
    });
    const page = await browser.newPage();
    const context = await browser.newContext();
    const url = 'https://staging.mryum.com/demo';

    
    await page.goto(url);
    // const viewDineIn = await page.textContent('text="View Dine in Menu"');
    // assert(viewDineIn === 'View Dine in Menu');
    await page.click('text="View Dine in Menu"');

    await page.click('input[name="tableNumber"]');
    await page.fill('input[name="tableNumber"]', '1');
    await page.click('text="Confirm"');
    await page.click('text="Drinks 🍻"');
    
    // //mocha
    await page.click('text="Mocha"');
    await page.click('text="Skim Milk"');
    await page.click('text="Add to cart"');

    // //Negroni
    await page.click('//img');
    await page.click('text="Add to cart"');

    // //latte
    await page.click('text="Latte"');
    await page.click('text="Full Cream Milk"');
    await page.click('text="2 Sugars"');
    await page.click('span[role="checkbox"]');
    await page.click('text="Add to cart"');

    // //addtoCart
    await page.click('div[aria-label="Cart"]');
    await page.click('button[aria-label="Add one"]');
    
    // Verify Latte
    const latteTxt = await page.textContent('text="Latte"');
    const upsellSugar = await page.textContent('text="2x 2 Sugars"');
    const upsellFullCream = await page.textContent('text="2x Full Cream Milk"');
    const upsellChips = await page.textContent('text="2x Potato Chips"');
    const lattePrice = await page.textContent('text="$28.00"');
    //actual === expected
    assert(latteTxt === 'Latte');
    assert(upsellSugar === '2x 2 Sugars');
    assert(upsellFullCream === '2x Full Cream Milk');
    assert(upsellChips === '2x Potato Chips');
    assert(lattePrice === '$28.00');


    //Verify Negroni Item
    const negroni = await page.textContent('text="Left Hand Negroni"');
    const negroniPrice = await page.textContent('text="$18.00"');
    //actual === expected
    assert(negroni === 'Left Hand Negroni');
    assert(negroniPrice === '$18.00');

    //Verify Mocha
    const mochaTxt = await page.textContent('text="Mocha"');
    const mochaUpgrade = await page.textContent('text="1x Skim Milk"');
    const mochaPrice = await page.textContent('text="$4.00"');
    assert(mochaTxt === 'Mocha');
    assert(mochaUpgrade === '1x Skim Milk');
    assert(mochaPrice === '$4.00');


    // //Verify Computation
    const subTotalTxt = await page.textContent('text="Subtotal"');
    const discountTxt = await page.textContent('text="test"');
    const totalTxt = await page.textContent('text="Total"');
    const subPrice = await page.textContent('text="$50.00"');
    const disPrice = await page.textContent('text="-$25.00"');
    const totalPrice = await page.textContent('text="$25.00"');
    assert(subTotalTxt === 'Subtotal');
    assert(discountTxt === 'test');
    assert(totalTxt === 'Total');
    assert(subPrice === '$50.00');
    assert(disPrice === '-$25.00');
    assert(totalPrice === '$25.00');

    //checkout
    await page.click('text="CHECKOUT FOR TABLE 1"');
    await page.click('text="Maybe next time"');
    // await browser.close();
    // await context.close();
})();