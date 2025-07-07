import React, { useState } from "react";

function PayoutForm() {
  const [amount, setAmount] = useState("");
  const [driverAccountId, setDriverAccountId] = useState("");
  const [message, setMessage] = useState("");

  const handlePayout = async () => {
    const formData = { amount, driver_account_id: driverAccountId };

    try {
      const res = await fetch("https://your-backend-url/api/payout/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      console.error("Payout failed:", err);
      setMessage("Failed to initiate payout.");
    }
  };

  return (
    <div>
      <h2>Initiate Payout</h2>
      <input
        type="text"
        placeholder="Driver Account ID"
        value={driverAccountId}
        onChange={(e) => setDriverAccountId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayout}>Initiate Payout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PayoutForm;
