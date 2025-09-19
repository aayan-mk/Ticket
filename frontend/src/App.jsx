import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import VerifyTicket from "./pages/VerifyTicket";
import UserHome from "./pages/UserHome";
import AdminHomepage from "./pages/AdminHomepage";
import MyBooking from "./pages/MyBooking";
import TicketConfirmation from "./pages/EventTicket";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="659272477310-1u3rb83oe9b6pab8vuul7m5395npdprl.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/verify-ticket" element={<VerifyTicket />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/admin-home" element={<AdminHomepage />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route
            path="/ticket-confirmation/:eventName"
            element={<TicketConfirmation />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
