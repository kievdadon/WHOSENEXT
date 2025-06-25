import React, { useState } from "react";
import { createPayment } from "../api";

function Payment() {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  const handlePay = async () => {
    const result = await createPayment(Number(amount));
    if (result.clientSecret) {
      setClientSecret(result.clientSecret);
      alert("PaymentIntent created! Client secret: " + result.clientSecret);
    } else {
      alert("Error: " + result.error);
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
      <button onClick={handlePay}>Create PaymentIntent</button>

      {clientSecret && (
        <p style={{ marginTop: 20 }}>
          ✅ PaymentIntent created.<br />Client Secret: <code>{clientSecret}</code>
        </p>
      )}
    </div>
  );
}

export default Payment;
