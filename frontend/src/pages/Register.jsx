import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user details in cookies (mock register)
    const newUser = { name, email, password };
    Cookies.set("user", JSON.stringify(newUser), { expires: 1 });

    setRegistered(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "380px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!registered ? (
          <>
            <h1 style={{ marginBottom: "25px", color: "#333" }}>
              Create Account
            </h1>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
              <button type="submit" style={registerButtonStyle}>
                🎉 Register Now
              </button>
            </form>

            {/* Go back to login link */}
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{
                  color: "#2575fc",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Login here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 style={{ color: "#2d8a4e", marginBottom: "20px" }}>
              ✅ Registration Successful!
            </h2>
            <p style={{ color: "#444", marginBottom: "25px" }}>
              Welcome, <b>{name}</b>. Your account has been created.
            </p>
            <button onClick={() => navigate("/login")} style={successButtonStyle}>
              🔑 Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

const registerButtonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
  background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const successButtonStyle = {
  padding: "14px 20px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
  background: "linear-gradient(90deg, #ff512f, #dd2476)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default Register;
