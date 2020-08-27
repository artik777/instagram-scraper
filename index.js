const puppeteer = require('puppeteer');
const secrets = require('./secrets');
 
(async () => {
  const browser = await puppeteer.launch({headless: false});
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

  //Xpath method (last resort :D)
  // const loginButton = await page.$x('/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[3]/button')
  // loginButton[0].click();
  
  const USERNAME = 'aaronjack'
  await page.goto(`https://www.instagram.com/${USERNAME}/`);
  await page.waitForSelector('article a');
  await (await page.$('article a')).click();
  await page.waitFor(1000);
  await (await page.$$('button'))[5].click();



  await browser.close();
})();
