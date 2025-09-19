import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const TicketConfirmation = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      alert("Please login to view your ticket!");
      navigate("/login");
    } else {
      setUser(JSON.parse(userCookie));
    }

    // ✅ verify payment with backend
    const verifyPayment = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: Cookies.get("order_id"),
            razorpay_payment_id: Cookies.get("payment_id"),
            razorpay_signature: Cookies.get("signature"),
          }),
        });

        const data = await res.json();
        setVerified(data.success);
        setLoading(false);
      } catch (error) {
        console.error("Verification failed", error);
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  const handleDownloadTicket = () => {
    const ticketText = `
      🎟 Ticket Confirmation 🎟
      Name: ${user?.name}
      Event: ${eventName}
      Date: 26th September 2025
      Location: Shree L. R. Tiwari Educational Campus, Mira Road
    `;

    const element = document.createElement("a");
    const file = new Blob([ticketText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${eventName}-ticket.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBackHome = () => {
    navigate("/user-home");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
          color: "#fff",
          fontSize: "1.5rem",
        }}
      >
        ⏳ Verifying Payment...
      </div>
    );
  }

  if (!verified) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
          color: "#fff",
          fontSize: "1.5rem",
          flexDirection: "column",
        }}
      >
        ❌ Payment Not Verified
        <button
          onClick={() => navigate("/payment")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#000",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ✅ if verified, show ticket
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "40px",
          borderRadius: "20px",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
          🎉 Ticket Confirmed!
        </h1>
        <p>Name: <strong>{user?.name}</strong></p>
        <p>Event: <strong>{eventName}</strong></p>
        <p>Date: <strong>26th September 2025</strong></p>
        <p>Location: <strong>Shree L. R. Tiwari Educational Campus, Mira Road</strong></p>

        <button onClick={handleDownloadTicket} style={{ marginRight: "10px" }}>
          📥 Download Ticket
        </button>
        <button onClick={handleBackHome}>🏠 Back to Home</button>
      </div>
    </div>
  );
};

export default TicketConfirmation;
