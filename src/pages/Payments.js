import React, { useState } from "react";
import { createPayment } from "../api";

function Payment() {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  const handlePayment = async () => {
    const response = await createPayment(Number(amount));
    if (response.clientSecret) {
      setClientSecret(response.clientSecret);
      alert("PaymentIntent created successfully!");
    } else {
      alert("Error creating payment intent");
    }
  };

  return (
    <div>
      <h1>Stripe Payment 💳</h1>
      <input
        type="number"
        placeholder="Amount (in cents)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Create Payment Intent</button>

      {clientSecret && (
        <p>Client Secret: {clientSecret}</p>
      )}
    </div>
  );
}

export default Payment;

