const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);
