const { Client } = require("@notionhq/client");

// initialize client
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});
