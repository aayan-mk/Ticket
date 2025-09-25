const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔑 Generate JWT and set in cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Render/Netlify
    sameSite: "None", // ✅ allow cross-site cookies (frontend + backend diff domains)
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

// 🎯 Google Login (only login method)
exports.googleLogin = async (req, res) => {
  try {
    const { googleId, name, email } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ success: false, message: "Missing Google data" });
    }

    let user = await User.findOne({ email });

    // If new user → create
    if (!user) {
      user = await User.create({ googleId, name, email, role: "user" });
    } else {
      // If exists but missing googleId, update it
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    const token = generateToken(res, user._id);

    res.json({ success: true, user, token });
  } catch (error) {
    console.error("❌ Google login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
