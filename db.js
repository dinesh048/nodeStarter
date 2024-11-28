const mongoose = require("mongoose");
mongoose.connect("connection string");
const db = mongoose.connection;
db.on("error", () => {
  console.log("error");
});
db.once("open", () => {
  console.log("connected");
});
