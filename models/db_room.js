const mongoose = require("mongoose");

const Room = mongoose.model("Room", {
  title: { type: String },
  description: { type: String },
  photo: { type: String },
  price: { type: Number },
  ratingValue: { type: Number, default: null },
  reviews: { type: Number, default: null },
  city: { type: String },
  loc: { type: [Number], index: "2dsphere" }
});

module.exports = Room;
