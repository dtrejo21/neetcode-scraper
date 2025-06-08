const notion = require("./client")

async function addProblemToNotion({ name, url, difficulty, relatedPageId }) {
  // Construct properties upfront
  const properties = {
    "Problem Name": {
      title: [
        {
          text: { content: name },
        },
      ],
    },
    URL: {
      url: url,
    },
    Pattern: {
      relation: [
        {
          id: relatedPageId,
        },
      ],
    },
    Difficulty: {
      select: {
        name: difficulty,
      },
    },
  };

  try {
    // Use the full properties object here
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: properties,
    });
    console.log(`✅ Added: ${name}`);
  } catch (error) {
    console.error(`❌ Failed to add ${name}:`, error.message);
  }
}

module.exports = addProblemToNotion;