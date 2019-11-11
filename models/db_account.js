const mongoose = require("mongoose");

const Account = mongoose.model("Account", {
  username: { type: String },
  biography: { type: String }
});

module.exports = Account;
