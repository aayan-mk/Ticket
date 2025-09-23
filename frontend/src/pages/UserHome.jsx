import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Local image import
import garbaImage from "../components/Garba.png"; // adjust path if needed

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Single Garba Night event
  const garbaNightEvent = {
    _id: "garba2025", // give a static ID for consistency
    name: "Garba Night",
    date: "26th September 2025",
    location: "Shree L. R. Tiwari Educational Campus, Mira Road",
    price: 150, // store as number (₹150) → GST can be handled separately
    description:
      "An electrifying night of Garba and Dandiya, full of energy, colors, and traditional dance.",
    image: garbaImage,
  };

  // Check user login
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userCookie));
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
  };

  const handleBookTicket = (event) => {
    // ✅ Save full event object (stringified JSON)
    Cookies.set("selectedEvent", JSON.stringify(event), { expires: 0.05 }); // ~1 hour
    navigate("/payment");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ color: "#fff" }}>🎟 Welcome {user?.name}</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#ff4b5c",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Event Card */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <img
          src={garbaNightEvent.image}
          alt={garbaNightEvent.name}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "12px",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
        <h4 style={{ margin: "10px 0", color: "#222" }}>
          {garbaNightEvent.name}
        </h4>
        <p style={{ fontSize: "14px", color: "#555" }}>
          {garbaNightEvent.description}
        </p>
        <p style={{ fontSize: "13px", margin: "10px 0", color: "#333" }}>
          📅 {garbaNightEvent.date} <br />
          📍 {garbaNightEvent.location} <br />
          💰 ₹{garbaNightEvent.price} + Additional Charges,
        </p>
        <button
          onClick={() => handleBookTicket(garbaNightEvent)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🎫 Book Now
        </button>
      </div>

      {/* View My Tickets */}
      <div
        style={{
          marginTop: "40px",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#333" }}>
          📌 Manage Your Bookings
        </h3>
        <button
          onClick={() => navigate("/my-bookings")}
          style={{
            padding: "14px 20px",
            borderRadius: "12px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            background: "linear-gradient(90deg, #ff512f, #dd2476)",
            cursor: "pointer",
            width: "100%",
          }}
        >
          📜 View My Tickets
        </button>
      </div>
    </div>
  );
};

export default UserHome;
