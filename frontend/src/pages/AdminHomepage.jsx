import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import GarbaImage from "../components/Garba.png";

const AdminHomepage = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  // Single event (replace with your real event/image)
  const event = {
          _id: "1",
          name: "Garba Night",
          date: "2025-10-05",
          location: "Community Hall, Mumbai",
          price: 500,
          description:
            "A night full of traditional Garba dance and music. Join the fun!",
          image: GarbaImage,
        };

  useEffect(() => {
    const adminCookie = Cookies.get("admin");
    if (!adminCookie) {
      navigate("/login");
    } else {
      setAdmin(JSON.parse(adminCookie));
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("admin");
    navigate("/login");
  };

  const handleEdit = () => {
    navigate(`/edit-event/${event._id}`);
  };

  const handleDelete = () => {
    alert("Delete event logic here");
  };

  const handleVerify = () => {
    navigate("/verify-ticket");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #6a11cb, #2575fc, #ff416c)",
        color: "white",
        paddingBottom: "80px",
        position: "relative",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          borderRadius: "0 0 20px 20px",
          marginBottom: "30px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          👋 Hello, {admin?.name || "Admin"}
        </motion.h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            background: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            color: "white",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Single Event Card */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.9)",
          color: "#333",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "2px 2px 15px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <img
          src={event.image}
          alt={event.name}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
        <div style={{ padding: "15px", textAlign: "center" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff416c",
              marginBottom: "10px",
            }}
          >
            {event.name}
          </h3>
          <p style={{ fontSize: "1rem", marginBottom: "10px" }}>{event.description}</p>
          <p style={{ fontSize: "0.9rem", marginBottom: "15px" }}>
            📅 {event.date} <br />
            📍 {event.location} <br />
            💰 ₹{event.price}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleEdit}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "15px",
                border: "none",
                background: "linear-gradient(90deg, #2979ff, #00b0ff)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "15px",
                border: "none",
                background: "linear-gradient(90deg, #ff1744, #f50057)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {/* Verify Tickets Button */}
      <motion.button
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.2 }}
        onClick={handleVerify}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "20px",
          borderRadius: "50%",
          background: "linear-gradient(90deg, #8e2de2, #ff416c, #ff4b2b)",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
        }}
      >
        📷
      </motion.button>
    </div>
  );
};

export default AdminHomepage;
