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

  await page.waitForSelector("app-pattern-table", { visible: true });

  //iterate through each pattern and all of its patterns
  const data = await page.evaluate(() => {
    const tables = document.querySelectorAll("app-pattern-table");
    const result = [];
    // Extract pattern name
    //const pattern = await page.$eval("button p", (el) => el.textContent.trim());

    tables.forEach((table) => {
      const pattern = table.querySelector("button p")?.textContent.trim();

      const problems = Array.from(table.querySelectorAll("table tbody tr")).map(
        (row) => {
          const link = row.querySelector("a.table-text");
          const difficultyElement = row.querySelector("button b");

          return {
            name: link.textContent.trim(),
            url: link ? `https://neetcode.io${link.getAttribute("href")}` : "",
            difficulty: difficultyElement?.textContent.trim() || "Unknown"
          };
        }
      );

      result.push({ pattern, problems });
    });

    return result;
  });
  await browser.close();
  
  return data;
  /*
  data.forEach((group) => {
    console.log(`\n📚 Pattern: ${group.pattern}`);
    group.problems.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} → ${p.url} → ${p.difficulty}`);
    });
  });

  //const { pattern, problems } = data[0] || { pattern: null, problems: [] };
  //return { pattern, problems };
  */

  /*
   This is to call the notion problem
  for (let i = 0; i < Math.min(3, problems.length); i++) {
    await addProblemToNotion({
      pattern,
      name: problems[i].name,
      url: problems[i].url,
      difficulty: problems[i].difficulty,
    });
  } */
}

module.exports = scrapeProblems;
