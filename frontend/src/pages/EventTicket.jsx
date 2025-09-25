import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_BASE || "https://ticket-22ic.onrender.com";

const TicketConfirmation = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // ✅ Check user cookie
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      alert("Please login to view your ticket!");
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userCookie));

    // ✅ Verify payment with backend
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/payment/verify-payment`, {
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
      } catch (error) {
        console.error("Verification failed", error);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  // ✅ Download ticket as text file
  const handleDownloadTicket = () => {
    const ticketText = `
🎟 Ticket Confirmation 🎟
Name: ${user?.name}
Event: ${eventName}
Date: 26th September 2025
Location: Shree L. R. Tiwari Educational Campus, Mira Road

📩 Ticket will also be sent to your registered Email / WhatsApp.
For any queries, contact:
- Aayan Shaikh: +91 8104216280
- Krish Dubey: +91 9152808144
- Vineet Sharma: +91 8657357781
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

  // ⏳ Loading UI
  if (loading) {
    return (
      <div style={styles.page("linear-gradient(135deg, #36d1dc, #5b86e5)")}>
        ⏳ Verifying Payment...
        <button onClick={handleBackHome} style={styles.button("#000")}>
          🏠 Back to Home
        </button>
      </div>
    );
  }

  // ❌ Payment failed
  if (!verified) {
    return (
      <div style={styles.page("linear-gradient(135deg, #ff416c, #ff4b2b)")}>
        <p>❌ Payment Not Verified</p>
        <button onClick={() => navigate("/payment")} style={styles.button("#000")}>
          Try Again
        </button>
        <button onClick={handleBackHome} style={styles.button("#222")}>
          🏠 Back to Home
        </button>
        {renderContactInfo()}
      </div>
    );
  }

  // ✅ Payment success
  return (
    <div style={styles.page("linear-gradient(135deg, #36d1dc, #5b86e5)")}>
      <div style={styles.card}>
        <h1>🎉 Ticket Confirmed!</h1>
        <p>Name: <strong>{user?.name}</strong></p>
        <p>Event: <strong>{eventName}</strong></p>
        <p>Date: <strong>26th September 2025</strong></p>
        <p>Location: <strong>Shree L. R. Tiwari Educational Campus, Mira Road</strong></p>
        <p style={{ marginTop: "15px" }}>
          📩 Ticket will also be sent to your Email / WhatsApp.
        </p>
        <div style={{ marginTop: "25px" }}>
          <button onClick={handleDownloadTicket} style={styles.button("#007bff", true)}>
            📥 Download Ticket
          </button>
          <button onClick={handleBackHome} style={styles.button("#222")}>
            🏠 Back to Home
          </button>
        </div>
        {renderContactInfo()}
      </div>
    </div>
  );
};

const renderContactInfo = () => (
  <div style={styles.contactBox}>
    <p>For queries, contact:</p>
    <ul style={{ listStyle: "none", padding: 0 }}>
      <li>📞 Aayan Shaikh: <strong>+91 8104216280</strong></li>
      <li>📞 Krish Dubey: <strong>+91 9152808144</strong></li>
      <li>📞 Vineet Sharma: <strong>+91 8657357781</strong></li>
    </ul>
  </div>
);

const styles = {
  page: (bg) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: bg,
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  }),
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "40px",
    borderRadius: "20px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  },
  button: (bg, primary = false) => ({
    margin: "10px",
    padding: "12px 25px",
    background: primary ? "linear-gradient(90deg, #ff8a00, #e52e71)" : bg,
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  }),
  contactBox: {
    marginTop: "30px",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
  },
};

export default TicketConfirmation;
