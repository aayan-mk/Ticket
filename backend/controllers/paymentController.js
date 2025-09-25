const crypto = require("crypto");
const Booking = require("../models/Booking");

exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const event = req.body.event;

    if (event === "payment.captured" || event === "order.paid") {
      const payment = req.body.payload.payment.entity;

      const booking = await Booking.findOne({ razorpayOrderId: payment.order_id });

      if (booking) {
        booking.paid = true;
        booking.razorpayPaymentId = payment.id;
        booking.razorpaySignature = req.headers["x-razorpay-signature"];
        await booking.save();
        console.log("✅ Booking updated as paid:", booking._id);
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
