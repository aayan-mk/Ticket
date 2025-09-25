const express = require("express");
const crypto = require("crypto");
const Booking = require("../models/Booking");

const router = express.Router();

router.post(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // ✅ keep raw body for signature
    },
  }),
  async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      const signature = req.headers["x-razorpay-signature"];

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("❌ Invalid Razorpay signature");
        return res.status(400).json({ error: "Invalid signature" });
      }

      console.log("✅ Webhook verified:", req.body.event);

      // 🔹 Handle events
      if (req.body.event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        // Find booking linked to this orderId
        const booking = await Booking.findOne({
          razorpayOrderId: payment.order_id,
        });

        if (booking) {
          booking.paid = true;
          booking.razorpayPaymentId = payment.id;
          await booking.save();
          console.log("💰 Booking updated as paid:", booking._id);
        } else {
          console.log("⚠️ No booking found for order:", payment.order_id);
        }
      }

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("⚠️ Webhook error:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
