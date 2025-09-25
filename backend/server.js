const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (allow frontend to talk to backend)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Cookie parser
app.use(cookieParser());

// ✅ Razorpay webhook needs RAW body
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

// ✅ Normal JSON for all other routes
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // ✅ Always return index.html for React Router routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
