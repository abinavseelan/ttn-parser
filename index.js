const puppeteer = require('puppeteer');
const currentPlan = require('./config');
const {
  parseTable,
  compareFup,
  comparePrice,
  compareSpeed,
} = require('./utils');

const COLUMNS = {
  PLAN_NAME: 0,
  SPEED: 1,
  FUP: 2,
  PRICE: 6,
};


(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://www.ttnetwork.net/tariff.html');
    /**
     * Select the table
     * iterate through each row until we reach the current plan
     * Alert if any row's value better than the configured threshold
     */
    const plans = await page.evaluate(parseTable, 'table[style="border-collapse: collapse;"]');

    await browser.close();

    for (let i = 0; i < plans.length; i += 1) {
      const speed = compareSpeed(plans[i][COLUMNS.SPEED], currentPlan.speed);
      const fup = compareFup(plans[i][COLUMNS.FUP], currentPlan.fup);
      const price = comparePrice(plans[i][COLUMNS.PRICE], currentPlan.price);

      if (speed && fup && price) {
        console.log(`Better plan found: ${plans[i][COLUMNS.PLAN_NAME]}`);
        process.exit(2);
      }
    }

    console.log('You\'re on the best plan!');
  } catch (err) {
    console.error('Puppeteer error');
    if (err) {
      console.error(err);
      console.error(err.stack);
    }

    process.exit(1);
  }
})();
