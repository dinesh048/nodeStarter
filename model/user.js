const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});
let user = mongoose.model("user", userSchema);
module.exports = user;
