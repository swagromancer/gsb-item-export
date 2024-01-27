import puppeteer from 'puppeteer';

(async () => {
  // Create a new (headless) browser and launch a new page/tab
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // Navigate to our URL and wait for the page to fully load
  await page.goto('https://ledger.thegriffonssaddlebag.com/');
  await page.waitForNetworkIdle();

  // Find the table, then extract all the rows and column data
  const table = await page.$$eval(
    'table.ItemList_itemtable__FfU5F.table.table-striped.table-hover > tbody > tr',
    (rows) =>
      rows.map((row) => Array.from(row.cells).map((cell) => cell.textContent))
  );

  // Test that we actually get data
  console.log(table.length);
  console.log(table);

  await browser.close();
})();
