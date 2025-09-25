const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    seats: { type: Number, default: 1 },
    price: Number,
    paid: { type: Boolean, default: false },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    entered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
