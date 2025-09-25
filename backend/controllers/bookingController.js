const Booking = require("../models/Booking");

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.userId }).populate("event");
  res.json({ bookings });
};
