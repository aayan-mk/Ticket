import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my", {
          withCredentials: true, // ✅ include cookies (JWT)
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("❌ Booking fetch error:", err);
        setMessage(err.response?.data?.message || "Failed to load bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>📋 My Bookings</h1>
          <button
            onClick={() => navigate("/user-home")}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#333",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🔙 Back
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}

        {/* Booking Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {bookings.length === 0 ? (
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                gridColumn: "1 / -1",
              }}
            >
              No bookings found.
            </p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  padding: "20px",
                  position: "relative",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Gradient Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "5px",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    background:
                      "linear-gradient(90deg, #4c6ef5, #845ef7, #f783ac)",
                  }}
                ></div>

                {/* Booking Details */}
                <div style={{ marginTop: "10px", lineHeight: "1.5" }}>
                  <h2
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      color: "#ffd700",
                    }}
                  >
                    {booking.event?.name || "Event"}
                  </h2>
                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.event?.date
                      ? new Date(booking.event.date).toLocaleDateString()
                      : "TBA"}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.seats}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{booking.price}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {booking.entered ? (
                      <span style={{ color: "#00ff00", fontWeight: "bold" }}>
                        ✅ Entered
                      </span>
                    ) : (
                      <span style={{ color: "#ffeb3b", fontWeight: "bold" }}>
                        ⌛ Not Entered
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Booking Details:\nEvent: ${
                        booking.event?.name
                      }\nSeats: ${booking.seats}\nPrice: ₹${
                        booking.price
                      }\nStatus: ${
                        booking.entered ? "Entered ✅" : "Not Entered ⌛"
                      }`
                    )
                  }
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: "#1e40af",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🔍 View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
          📩 Your ticket will be sent to your Email / WhatsApp Soon.
        </p>
        <p>
          For any queries, contact: <br />
          📞 Aayan Shaikh: <strong>+91 8104216280</strong> <br />
          📞 Krish Dubey: <strong>+91 9152808144</strong> <br />
          📞 Vineet Sharma: <strong>+91 8657357781</strong>
        </p>
      </div>
    </div>
  );
};

export default MyBooking;
