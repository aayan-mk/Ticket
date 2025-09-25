const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: String,
    date: String,
    location: String,
    price: Number,
    description: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
