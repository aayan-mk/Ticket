import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Correct ESM import for Vite

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle normal login
  const handleLogin = (e) => {
    e.preventDefault();

    let userData = null;
    let isStaff = false;
    let isAdmin = false;

    if (email === "user@example.com" && password === "user123") {
      userData = { name: "Demo User", email };
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    } else if (email === "staff@example.com" && password === "staff123") {
      userData = { name: "Demo Staff", email };
      isStaff = true;
      Cookies.set("staff", JSON.stringify(userData), { expires: 1 });
    } else if (email === "admin@example.com" && password === "admin123") {
      userData = { name: "Demo Admin", email };
      isAdmin = true;
      Cookies.set("admin", JSON.stringify(userData), { expires: 1 });
    } else {
      alert("Invalid credentials!");
      return;
    }

    if (isAdmin) {
      navigate("/admin-home");
    } else if (isStaff) {
      navigate("/verify-ticket");
    } else {
      const redirectTo = location.state?.from || "/user-home";
      navigate(redirectTo);
    }
  };

  // Handle Google OAuth login
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // ✅ works fine
    const email = decoded.email;
    const name = decoded.name;
    const picture = decoded.picture;

    let userData = { name, email, picture };
    let isStaff = false;
    let isAdmin = false;

    if (email === "staff@example.com") {
      userData.role = "staff";
      isStaff = true;
      Cookies.set("staff", JSON.stringify(userData), { expires: 1 });
    } else if (email === "admin@example.com") {
      userData.role = "admin";
      isAdmin = true;
      Cookies.set("admin", JSON.stringify(userData), { expires: 1 });
    } else {
      userData.role = "user";
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    }

    if (isAdmin) {
      navigate("/admin-home");
    } else if (isStaff) {
      navigate("/verify-ticket");
    } else {
      const redirectTo = location.state?.from || "/user-home";
      navigate(redirectTo);
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed. Try again!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#333" }}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "15px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            🚀 Login Now
          </button>
        </form>

        {/* Google Login */}
        <div style={{ marginTop: "20px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {/* Register Option */}
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2575fc",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
