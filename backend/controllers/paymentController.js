// controllers/paymentController.js
const crypto = require("crypto");
const Booking = require("../models/Booking");

exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payload = req.body.payload.payment.entity;

    // Save booking in DB
    const booking = await Booking.create({
      user: req.body.notes.userId, // 👈 send userId as metadata when creating Razorpay order
      event: req.body.notes.eventId,
      seats: req.body.notes.seats || 1,
      price: payload.amount / 100,
      paid: true,
      razorpayOrderId: payload.order_id,
      razorpayPaymentId: payload.id,
    });

    res.json({ success: true, booking });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};
