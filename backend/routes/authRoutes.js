const express = require("express");
const { googleLogin, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/google", googleLogin);
router.post("/login", loginUser);

module.exports = router;
