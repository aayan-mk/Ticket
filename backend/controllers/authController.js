const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

exports.googleLogin = async (req, res) => {
  const { googleId, name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ googleId, name, email, role: "user" });
  }
  generateToken(res, user._id);
  res.json({ success: true, user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  generateToken(res, user._id);
  res.json({ success: true, user });
};
