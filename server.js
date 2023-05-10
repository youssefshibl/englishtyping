const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const notionapi = require("./util/notionapi");
const uirender = require("./util/uirender");

app = express();
app.use(express.static("."));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.port || 3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(MainDir(), "view", "data.html"));
});

app.post("/", async (req, res) => {
  let page_id = req.body.page_id;
  let token = req.body.token;
  //   res.sendFile(path.join(MainDir(), "view", "index.html"));
  res.render("index", { page_id: page_id, token: token });
});

app.post("/data", async (req, res) => {
  let page_id = req.body.page_id;
  let token = req.body.token;
  let data = await notionapi.getnotiondata(page_id, token);
  //console.log(data);
  if (data && data.hasOwnProperty("parent")) {
    let AllWords = uirender.getWords(data.parent);
    res.json({
      data: AllWords,
    });
  } else {
    res.json({
      data: null,
    });
  }
});

function MainDir() {
  return path.dirname(process.mainModule.filename);
}

