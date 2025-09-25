import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🚀 Normal login (demo only)
  const handleLogin = (e) => {
    e.preventDefault();

    let userData = null;
    let role = "user";

    if (email === "user@example.com" && password === "user123") {
      userData = { name: "Demo User", email, role: "user" };
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    } else if (email === "staff@example.com" && password === "staff123") {
      userData = { name: "Demo Staff", email, role: "staff" };
      Cookies.set("staff", JSON.stringify(userData), { expires: 1 });
      role = "staff";
    } else if (email === "admin@example.com" && password === "admin123") {
      userData = { name: "Demo Admin", email, role: "admin" };
      Cookies.set("admin", JSON.stringify(userData), { expires: 1 });
      role = "admin";
    } else {
      alert("Invalid credentials!");
      return;
    }

    // Navigate based on role
    if (role === "admin") navigate("/admin-home");
    else if (role === "staff") navigate("/verify-ticket");
    else navigate(location.state?.from || "/user-home");
  };

  // ✅ Google OAuth login (calls backend)
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await fetch("http://localhost:5001/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // allow cookies
        body: JSON.stringify({
          googleId: decoded.sub,
          name: decoded.name,
          email: decoded.email,
  }),
});


      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      // Save user in cookie (fallback if cookie not set by backend)
      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin-home");
      else if (data.user.role === "staff") navigate("/verify-ticket");
      else navigate(location.state?.from || "/user-home");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Try again!");
    } finally {
      setLoading(false);
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

        {/* Email/Password Login */}
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
          {loading && <p style={{ marginTop: "10px" }}>Signing in...</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
