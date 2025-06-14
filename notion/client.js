require("dotenv").config(); //load in env file

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

module.exports = notion;