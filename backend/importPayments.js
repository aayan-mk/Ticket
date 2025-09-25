const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env
dotenv.config({ path: "./.env" });

// Your Booking model
const Booking = require("./models/Booking");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

// Path to CSV file
const csvFilePath = path.join(__dirname, "data", "payments.csv");

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    console.log(`📥 Found ${results.length} payments in CSV`);

    for (let row of results) {
      try {
        await Booking.create({
          razorpay_payment_id: row["Payment Id"],
          email: row["Email"] || row["Contact"], // adjust depending on CSV headers
          amount: row["Amount"] / 100, // Razorpay usually stores paise
          status: row["Status"],
        });
      } catch (err) {
        console.error("⚠️ Error inserting payment:", row, err.message);
      }
    }

    console.log("✅ Import finished");
    mongoose.connection.close();
  });
