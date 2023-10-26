const puppeteer = require("puppeteer");
let browser;

module.exports = async function(htmlCode, width, height, replacements, selector) {
    if (!browser) {
        browser = await puppeteer.launch({ headless: "new" });
    }
    const page = await browser.newPage();

    await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: 1,
    });

    if (replacements) {
        for (let key in replacements) {
            /*
                {
                    [key]: replacementData
                }
    
                e.g: items: "{}"
            */
    
            htmlCode = htmlCode.replace(`{{${key}}}`, replacements[key]);  
        }
    }
    await page.setContent(htmlCode);
    await page.waitForNetworkIdle();

    let base64;

    if (selector) {
        await page.waitForSelector(selector);
        const element = await page.$(selector);
        //await element.screenshot({ path: "test.png" })
        base64 = await element.screenshot({ encoding: "base64" })
    } else {
        //await page.screenshot({ path: "test.png" })
        base64 = await page.screenshot({ encoding: "base64" })
    }


    await page.close();

    return base64
}