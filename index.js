const express = require("express");
const app = express();
const port = 3001;
const db = require("./db");
const user = require("./routes/user");
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about-us", (req, res) => {
  res.send("About US!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
