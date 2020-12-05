const puppeteer = require('puppeteer');
const fse = require('fs-extra');

async function scrapePage(urlToFetch, config) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('response', async (response) => {
        await fse.outputFile(`${config.outputFile}`, await response.buffer());
    });

    await page.goto(urlToFetch, {
        waitUntil: 'networkidle2'
    });

    await browser.close()
}

exports.scrapePage = scrapePage