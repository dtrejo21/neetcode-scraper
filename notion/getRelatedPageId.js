const notion = require("./client");

async function getRelatedPageIdByName(pattern, databaseId) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Pattern",
      rich_text: { equals: pattern },
    },
  });

  if (response.results.length === 0) {
    return null; // no matching pattern found
  }
  return response.results[0].id;
}

module.exports = getRelatedPageIdByName;