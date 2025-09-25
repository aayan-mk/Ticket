import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
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

      {/* Spotlight Notice Image */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/spotlight.png"
          alt="Spotlight Notice"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
