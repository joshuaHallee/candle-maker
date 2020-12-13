require('dotenv').config()
const puppeteer = require('puppeteer');
const fse = require('fs-extra');

async function scrapePage(urlToFetch, config) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(process.env.USER_AGENT)

    page.on('response', async (response) => {
        await fse.outputFile(`${config.outputFile}`, await response.buffer());
    });

    await page.goto(urlToFetch, {
        waitUntil: 'networkidle2'
    });

    await browser.close()
}

exports.scrapePage = scrapePage