const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");

async function getnotiondata(app_id, token) {
  const notion = new Client({
    auth: token,
  });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(app_id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString;
}

module.exports = {
  getnotiondata,
};

