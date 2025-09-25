const Booking = require("../models/Booking");

// Get logged-in user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event", "name date price") // only include needed fields
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};
