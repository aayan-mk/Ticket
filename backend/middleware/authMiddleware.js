const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};
