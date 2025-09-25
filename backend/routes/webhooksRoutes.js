const express = require("express");
const crypto = require("crypto");
const Booking = require("../models/Booking"); // ✅ import your Booking model
const Event = require("../models/Event");     // ✅ import your Event model if needed

const router = express.Router();

// 🔑 Razorpay webhook endpoint
router.post(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Keep raw body for signature verification
    },
  }),
  async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!secret) {
        throw new Error("Missing RAZORPAY_WEBHOOK_SECRET in .env");
      }

      const signature = req.headers["x-razorpay-signature"];
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("❌ Invalid signature");
        return res.status(400).json({ error: "Invalid signature" });
      }

      console.log("✅ Webhook verified:", req.body.event);

      switch (req.body.event) {
        case "payment.captured": {
          const payment = req.body.payload.payment.entity;

          // 👇 Extract details you passed in `notes` while creating order
          const { eventId, userId, seats } = payment.notes;

          // ✅ Create booking
          const booking = new Booking({
            user: userId, // or userEmail if that’s what you store
            event: eventId,
            seats: seats || 1,
            price: payment.amount / 100, // Razorpay sends in paise
            paid: true,
            razorpayPaymentId: payment.id,
          });

          await booking.save();

          // (Optional) Update Event seat availability
          await Event.findByIdAndUpdate(eventId, { $inc: { bookedSeats: seats || 1 } });

          console.log("🎟️ Booking created:", booking);
          break;
        }

        case "order.paid": {
          const order = req.body.payload.order.entity;
          console.log("📦 Order fully paid:", order.id);
          break;
        }

        default:
          console.log("ℹ️ Unhandled event:", req.body.event);
      }

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("⚠️ Webhook error:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
