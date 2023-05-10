const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");

async function getnotiondata(app_id, token) {
  let mdString = null;
  try {
    const notion = new Client({
      auth: token,
    });
    //let users = await notion.users.list();
    const n2m = new NotionToMarkdown({ notionClient: notion });

    const mdblocks = await n2m.pageToMarkdown(app_id);
    mdString = n2m.toMarkdownString(mdblocks);
  } catch (ex) {
    console.log("error -> ", ex.message);
  }
  return mdString;
}

module.exports = {
  getnotiondata,
};

