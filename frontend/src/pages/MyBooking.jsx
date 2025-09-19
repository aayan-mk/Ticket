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
        const res = await axios.get("http://localhost:5000/api/bookings/my");
        setBookings(res.data.bookings || []);
      } catch (err) {
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
        background: "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "15px" }}>
          📋 My Bookings
        </h1>
        <button
          onClick={() => navigate("/user-home")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "10px",
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
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center", gridColumn: "1 / -1" }}>
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: "#fff",
              }}
            >
              {/* Top Gradient Bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "5px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  background: "linear-gradient(90deg, #4c6ef5, #845ef7, #f783ac)",
                }}
              ></div>

              <div style={{ marginTop: "10px", lineHeight: "1.5" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#ffd700" }}>
                  {booking.eventName}
                </h2>
                <p>
                  <strong>Date:</strong> {booking.eventDate}
                </p>
                <p>
                  <strong>Seat:</strong> {booking.seat || "General"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{booking.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {booking.entered ? (
                    <span style={{ color: "#00ff00", fontWeight: "bold" }}>✅ Entered</span>
                  ) : (
                    <span style={{ color: "#ffeb3b", fontWeight: "bold" }}>⌛ Not Entered</span>
                  )}
                </p>
              </div>

              <button
                onClick={() => alert("Show detailed info logic here")}
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
  );
};

export default MyBooking;
