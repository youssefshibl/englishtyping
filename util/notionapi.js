const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const fetch = require("node-fetch");

async function getnotiondata(app_id, token) {
  let mdString = null;
  try {
    let checked = await checkauth(token);
    if (checked) {
      const notion = new Client({
        auth: token,
      });
      //let users = await notion.users.list();
      const n2m = new NotionToMarkdown({ notionClient: notion });

      const mdblocks = await n2m.pageToMarkdown(app_id);
      mdString = n2m.toMarkdownString(mdblocks);
    } else {
      throw new Error("error in auth");
    }
  } catch (ex) {
    console.log("error -> ", ex.message);
  }
  return mdString;
}

module.exports = {
  getnotiondata,
};

async function checkauth(token) {
  const NOTION_TOKEN = token;
  const database_id = "252d08b0aa6b41478a325f6208e4c3b6";

  let res = await fetch(
    `https://api.notion.com/v1/databases/${database_id}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Your query data here
      }),
    }
  ).then((res) => res.json());
  //console.log(res);

  if (res.status != 401) {
    return true;
  }
  return false;
}
