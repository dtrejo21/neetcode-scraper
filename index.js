const scrapeProblems = require("./scraper/scrapeProblems");
const addProblemToNotion = require("./notion/addProblem");
const getRelatedPageIdByName = require("./notion/getRelatedPageId");

(async () => {
  const data = await scrapeProblems();

  for (const { pattern, problems } of data) {
    if (!pattern) {
      console.warn("Skipping because pattern is undefined or empty.");
      continue; // skip this iteration if pattern is invalid
    }

    // fetch relatedPageId once for the pattern
    const relatedPageId = await getRelatedPageIdByName(
      pattern,
      process.env.RELATION_DATABASE_ID
    );

    if (!relatedPageId) {
      console.warn(`No related page found for pattern: ${pattern}`);
      continue; // skip if no related page ID is found
    }

    // add each problem to Notion
    for (const problem of problems) {
      await addProblemToNotion({ ...problem, relatedPageId });
    }
  }
})();