import React from "react";

const PaymentForm = () => {
  const handlePayment = async () => {
    alert("Payment integration with Razorpay goes here.");
  };

  return (
    <div>
      <h3>Proceed to Pay</h3>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentForm;
