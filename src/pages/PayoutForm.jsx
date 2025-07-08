import React, { useState } from 'react';
import './PayoutForm.css';

export default function PayoutForm() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('PayPal');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid payout amount.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate success
    setMessage(`✅ Payout of $${Number(amount).toFixed(2)} requested via ${method}.`);
    setAmount('');
    setEmail('');
  };

  return (
    <div className="payout-form">
      <h1>💸 Request a Payout</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Amount (USD)
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>

        <label>
          Payout Method
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="PayPal">PayPal</option>
            <option value="Venmo">Venmo</option>
            <option value="Cash App">Cash App</option>
          </select>
        </label>

        <label>
          Account Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <button type="submit">Submit Request</button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
}
