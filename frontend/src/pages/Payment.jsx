import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);

  // Check user login and get event from cookie
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const eventCookie = Cookies.get("selectedEvent");

    if (!userCookie) {
      alert("Please login to continue to payment!");
      navigate("/login");
    } else {
      setUser(JSON.parse(userCookie));
    }

    if (!eventCookie) {
      alert("No event selected for payment!");
      navigate("/user-home");
    } else {
      try {
        setEvent(JSON.parse(eventCookie)); // ✅ parse full object
      } catch {
        setEvent({ name: eventCookie }); // fallback if old cookie
      }
    }
  }, [navigate]);

  const handlePayment = () => {
    const rzpUrl = "https://rzp.io/rzp/yV9XZzmP";
    const paymentWindow = window.open(rzpUrl, "_blank");

    const paymentCheck = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(paymentCheck);
        alert("Payment completed! Ticket will be issued.");
        navigate(`/ticket-confirmation/${encodeURIComponent(event?.name)}`);
      }
    }, 1000);
  };

  const handleBackHome = () => {
    navigate("/user-home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #8e2de2, #4a00e0, #ff416c, #ff4b2b)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          💳 Complete Payment
        </h1>

        {event && (
          <>
            <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
              <strong>{event.name}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
              📅 {event.date}
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
              📍 {event.location}
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
              💰 ₹{event.price} + Additional Charges
            </p>
          </>
        )}

        <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
          User: <strong>{user?.name || "Guest"}</strong>
        </p>

        <button
          onClick={handlePayment}
          style={{
            padding: "15px 30px",
            background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            marginBottom: "15px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💰 Pay Now
        </button>

        {/* ✅ Back button */}
        <button
          onClick={handleBackHome}
          style={{
            padding: "12px 25px",
            background: "#222",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#444")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
        >
          🏠 Back to Home
        </button>
      </div>

      <p style={{ marginTop: "40px", fontSize: "0.85rem", opacity: 0.8 }}>
        After completing the payment, you will be redirected to the ticket confirmation page.
      </p>
    </div>
  );
};

export default Payment;
