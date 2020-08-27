const puppeteer = require('puppeteer');
const secrets = require('./secrets');
 
(async () => {
  const browser = await puppeteer.launch(/* {headless: false} */);
  const page = await browser.newPage();
  await page.goto('https://instagram.com');

  await page.waitForSelector('input');
  const inputs = await page.$$('input');
  await inputs[0].type(secrets.USERNAME);
  await inputs[1].type(secrets.PASSWORD);
  //CSS selector method
  const loginButton = (await page.$$('button'))[2];
  loginButton.click();
  await page.waitForNavigation();

  const USERNAMES = ['aaronjack']
  for(let USERNAME of USERNAMES) {
    await page.goto(`https://www.instagram.com/${USERNAME}/`);
    await page.waitForSelector('img');
    const imgSrc = await page.$eval('img', el => el.getAttribute('src'));
    const headerData = await page.$$eval('header li', els => els.map(el => el.textContent));
    const name = await page.$eval('header h1', el => el.textContent);
    const desc = await page.$$eval('span', els => els[8].textContent);
    const profile = {imgSrc, headerData, name, desc};
    console.log({profile});

  }

  // await browser.close();
})();
