const puppeteer = require("puppeteer");

async function scrapeProblems() {
  const browser = await puppeteer.launch({
    headless: false, //show the browser
    slowMo: 50, //slow down the actions
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto("https://neetcode.io/practice?tab=neetcode250");

  await page.waitForSelector("app-pattern-table", { visible: true });

  //iterate through each pattern and all of its patterns
  const data = await page.evaluate(() => {
    const tables = document.querySelectorAll("app-pattern-table");
    const result = [];

    tables.forEach((table) => {
      const pattern = table.querySelector("button p")?.textContent.trim();

      const problems = Array.from(table.querySelectorAll("table tbody tr")).map(
        (row) => {
          const link = row.querySelector("a.table-text");
          const difficultyElement = row.querySelector("button b");

          return {
            name: link.textContent.trim(),
            url: link ? `https://neetcode.io${link.getAttribute("href")}` : "",
            difficulty: difficultyElement?.textContent.trim() || "Unknown",
          };
        }
      );

      result.push({ pattern, problems });
    });

    return result;
  });
  await browser.close();

  return data;
}

module.exports = scrapeProblems;
