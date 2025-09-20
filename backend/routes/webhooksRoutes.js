const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// 🔑 Razorpay webhook endpoint
router.post("/webhook", express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Keep raw body for signature verification
  }
}), (req, res) => {
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

    if (expectedSignature === signature) {
      console.log("✅ Webhook verified:", req.body);

      switch (req.body.event) {
        case "payment.captured":
          console.log("💰 Payment captured:", req.body.payload.payment.entity);
          break;
        case "order.paid":
          console.log("📦 Order fully paid:", req.body.payload.order.entity);
          break;
        default:
          console.log("ℹ️ Unhandled event:", req.body.event);
      }

      res.status(200).json({ status: "ok" });
    } else {
      console.error("❌ Invalid signature");
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (err) {
    console.error("⚠️ Webhook error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
