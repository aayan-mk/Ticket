const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

// Load env
dotenv.config();
connectDB();

const app = express();

// ✅ 1. CORS should be FIRST
app.use(
  cors({
    origin: ["https://reculturals.netlify.app", "http://localhost:5173"], // allowed frontends
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ 2. Handle preflight (OPTIONS) globally
app.options("*", cors());

// ✅ 3. Cookies
app.use(cookieParser());

// ✅ 4. JSON parsing (for most routes)
app.use(express.json());

// ✅ 5. Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ✅ 6. Razorpay webhook (must use raw body & ONLY for this route)
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/paymentWebhookRoute") // 👉 move logic into a separate controller/route
);

// ✅ Health check
app.get("/api/health", (req, res) => res.send("✅ API is running..."));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
