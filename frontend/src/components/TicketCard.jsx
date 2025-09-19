import React from "react";

const TicketCard = ({ event }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </div>
  );
};

export default TicketCard;
