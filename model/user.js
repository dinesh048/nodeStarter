const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  registered_on: {
    type: Date,
    default: new Date(),
  },
});

var studentdata = mongoose.model("user", userSchema);
module.exports = studentdata;
