import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

      {/* Spotlight Notice Image */}
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <img
          src={<img src="/spotlight.png" alt="Spotlight Notice" />}
          alt="Spotlight Notice"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default UserHome;
