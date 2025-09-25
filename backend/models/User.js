const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "staff", "admin"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
