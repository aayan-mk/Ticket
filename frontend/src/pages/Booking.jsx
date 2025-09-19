import React, { useState } from "react";
import API from "../utils/api";

const Booking = () => {
  const [eventId, setEventId] = useState("");
  const [seats, setSeats] = useState(1);

  const handleBook = async () => {
    const { data } = await API.post("/booking/book", { eventId, seats });
    alert(`Booking confirmed! Ticket ID: ${data.ticket._id}`);
  };

  return (
    <div>
      <h2>Book Ticket</h2>
      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seats"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />
      <button onClick={handleBook}>Book Now</button>
    </div>
  );
};

export default Booking;
