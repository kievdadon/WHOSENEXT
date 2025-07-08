// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="container">
      <h1>Welcome to WHOSENXT</h1>
      <p>Find gigs, hire workers, and more—all in one place.</p>
      <div style={{display:'flex', gap:16}}>
        <Link to="/marketplace/feed" className="button">Marketplace</Link>
        <Link to="/gig/feed"       className="button">Gig Services</Link>
        <Link to="/payout"         className="button">Payouts</Link>
      </div>
    </div>
  );
}
