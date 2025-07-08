import React from 'react';
import './PricingPage.css';

export default function PricingPage() {
  const handleCheckout = async (priceId) => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="pricing-page">
      <h1>💳 Choose Your Plan</h1>
      <div className="pricing-grid">
        <div className="plan-card">
          <h2>Gold</h2>
          <p className="price">$9.99/month</p>
          <ul>
            <li>✅ Access to gigs</li>
            <li>✅ Sell in marketplace</li>
            <li>✅ Community chat</li>
          </ul>
          <button onClick={() => handleCheckout('price_gold_id')}>
            Subscribe to Gold
          </button>
        </div>

        <div className="plan-card premium">
          <h2>Platinum</h2>
          <p className="price">$19.99/month</p>
          <ul>
            <li>✨ Everything in Gold</li>
            <li>🚀 Priority listing</li>
            <li>📈 Analytics dashboard</li>
          </ul>
          <button onClick={() => handleCheckout('price_platinum_id')}>
            Subscribe to Platinum
          </button>
        </div>
      </div>
    </div>
  );
}
