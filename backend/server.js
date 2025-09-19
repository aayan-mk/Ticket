const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// SSL cert and key
const sslOptions = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

// Start HTTPS server
const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Secure server running on https://localhost:${PORT}`);
});
