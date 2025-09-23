import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GarbaImage from "../components/Garba.png";

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const events = [
    {
      _id: "1",
      name: "Garba Night",
      date: "26th September 2025",
      location: "Shree L. R. Tiwari Educational Campus, Mira Road",
      price: "150 + Additional Charges",
      description:
        "A night full of traditional Garba dance and music. Join the fun!",
      image: GarbaImage,
    },
  ];

  // Get cookies
  const userCookie = Cookies.get("user");
  const adminCookie = Cookies.get("admin");
  const staffCookie = Cookies.get("staff");

  const user = userCookie ? JSON.parse(userCookie) : null;
  const admin = adminCookie ? JSON.parse(adminCookie) : null;
  const staff = staffCookie ? JSON.parse(staffCookie) : null;

  // Handle login/logout
  const handleAuth = () => {
    if (user || admin || staff) {
      Cookies.remove("user");
      Cookies.remove("admin");
      Cookies.remove("staff");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  // Redirect based on type or show "No user found"
  const handleBookTicket = (eventId) => {
    navigate(`/login`)
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>
          🎉 EventHub
        </h1>
        <button
          onClick={handleAuth}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            fontWeight: "bold",
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "white",
            cursor: "pointer",
          }}
        >
          {user || admin || staff ? "Logout" : "Login"}
        </button>
      </div>

      {/* Page Heading */}
      <h2
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🎊 Upcoming Event
      </h2>

      {/* Event Card */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              width: "300px",
              margin: "15px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              background: "white",
              textAlign: "center",
            }}
          >
            <img
              src={event.image}
              alt={event.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#ff416c", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>
                {event.name}
              </h3>
              <p style={{ color: "#333", marginBottom: "10px" }}>{event.description}</p>
              <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "15px" }}>
                📅 {event.date} <br />
                📍 {event.location} <br />
                💰 ₹{event.price}
              </p>
              <button
                onClick={() => handleBookTicket(event._id)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                🎫 Book Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message for no user */}
      {message && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "rgba(255,255,255,0.8)",
            color: "#ff0000",
            borderRadius: "12px",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Home;
