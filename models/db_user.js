const mongoose = require("mongoose");

const db_account = require("./db_account");

const User = mongoose.model("User", {
  account: { username: { type: String }, biography: { type: String } },
  email: { type: String },
  token: { type: String },
  hash: { type: String },
  salt: { type: String }
});

module.exports = User;
