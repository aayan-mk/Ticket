import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const VerifyTicket = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null);
  const [message, setMessage] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      try {
        const res = await axios.post("http://localhost:5000/api/ticket/verify", {
          qrCode: data,
        });
        setTicketDetails(res.data.ticket || null);
        setMessage(res.data.message);
        setScanning(false);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error verifying ticket");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setMessage("QR scanning error");
  };

  const markAsEntered = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ticket/mark-entered", {
        qrCode: result,
      });
      setMessage(res.data.message || "Ticket marked as entered ✅");
      setTicketDetails(null);
      setResult("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error marking entry");
    }
  };

  const handleLogout = () => {
    Cookies.remove("staff");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          🎟 Staff Ticket Verification
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#ff4b5c",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          🚪 Logout
        </motion.button>
      </div>

      {/* Camera Controls */}
      {!scanning ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setMessage("");
            setTicketDetails(null);
            setResult("");
            setScanning(true);
          }}
          style={{
            padding: "15px 30px",
            background: "linear-gradient(90deg, #00c853, #64dd17)",
            borderRadius: "25px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            marginBottom: "30px",
          }}
        >
          📷 Start Scanning
        </motion.button>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "linear-gradient(135deg, #5e35b1, #d81b60, #8e24aa)",
            padding: "15px",
            borderRadius: "25px",
            boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
            marginBottom: "30px",
          }}
        >
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(res, err) => {
              if (!!res) handleScan(res?.text);
              if (!!err) handleError(err);
            }}
            style={{
              width: "100%",
              borderRadius: "20px",
              border: "4px solid rgba(255,255,255,0.5)",
            }}
          />
          <button
            onClick={() => setScanning(false)}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#ff1744",
              border: "none",
              color: "white",
              fontSize: "1rem",
            }}
          >
            ❌ Stop Scanning
          </button>
        </div>
      )}

      {/* Ticket Info */}
      {result && ticketDetails && (
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "linear-gradient(135deg, #f50057, #651fff, #2979ff)",
            borderRadius: "25px",
            padding: "25px",
            boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
            marginBottom: "30px",
            position: "relative",
          }}
        >
          {/* Status Badge */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 15px",
              borderRadius: "25px",
              fontWeight: "bold",
              backgroundColor: ticketDetails.entered ? "#00c853" : "#ffd600",
              color: ticketDetails.entered ? "white" : "#333",
            }}
          >
            {ticketDetails.entered ? "Entered" : "Pending"}
          </div>

          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>
            🎉 Ticket Verified
          </h2>
          <div style={{ lineHeight: "1.6rem", marginBottom: "20px" }}>
            <p><strong>👤 Name:</strong> {ticketDetails.name}</p>
            <p><strong>🎫 Event:</strong> {ticketDetails.eventName}</p>
            <p><strong>📅 Date:</strong> {ticketDetails.eventDate}</p>
            <p><strong>💺 Seat:</strong> {ticketDetails.seat || "General"}</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={markAsEntered}
              style={{
                flex: 1,
                padding: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
                border: "none",
                background: "linear-gradient(90deg, #2979ff, #00b0ff)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✅ Mark as Entered
            </button>
            <button
              onClick={() => {
                setTicketDetails(null);
                setResult("");
                setMessage("");
              }}
              style={{
                flex: 1,
                padding: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
                border: "none",
                background: "linear-gradient(90deg, #d500f9, #ff4081)",
                color: "white",
                cursor: "pointer",
              }}
            >
              🔄 Next Scan
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      {message && !ticketDetails && (
        <div
          style={{
            maxWidth: "500px",
            padding: "15px",
            background: "linear-gradient(135deg, #ff4081, #651fff, #2979ff)",
            borderRadius: "20px",
            textAlign: "center",
            fontWeight: "bold",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            marginBottom: "20px",
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default VerifyTicket;
