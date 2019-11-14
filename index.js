require("dotenv").config();

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/airbnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db_room = require("./models/db_room");
const db_user = require("./models/db_user");
const room = require("./routes/room");
const user = require("./routes/user");
app.use(room);
app.use(user);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Launched");
});
