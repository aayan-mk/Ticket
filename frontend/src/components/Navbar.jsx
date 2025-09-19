import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = ({ user, staff, setUser, setStaff }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setStaff(null);
    Cookies.remove("user");
    Cookies.remove("staff");
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", position: "relative" }}>
      {/* Hamburger icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <span style={{ height: "3px", background: "#333" }}></span>
        <span style={{ height: "3px", background: "#333" }}></span>
        <span style={{ height: "3px", background: "#333" }}></span>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "0",
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            zIndex: 10,
            borderRadius: "6px",
          }}
        >
          {!user && !staff && (
            <button
              style={{ display: "block", marginBottom: "10px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {(user || staff) && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
