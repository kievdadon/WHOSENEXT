// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <main className="landing">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="brand">WHOSENXT</span></h1>
          <p>Your all-in-one platform for gigs, marketplace listings, and community support.</p>
          <div className="hero-buttons">
            <Link to="/gig/feed" className="button primary">Explore Gigs</Link>
            <Link to="/marketplace/feed" className="button secondary">Browse Marketplace</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <h2>What You Can Do</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span role="img" aria-label="briefcase">💼</span>
            <h3>Post or Accept Gigs</h3>
            <p>Find flexible work or hire help in your area.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="store">🛍️</span>
            <h3>Sell in the Marketplace</h3>
            <p>List items, promote your store, and reach local buyers.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="money">💸</span>
            <h3>Track Payouts</h3>
            <p>Manage your earnings and submit payout requests easily.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} WHOSENXT. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/payout">Payouts</Link>
          <Link to="/family/group/1">Family Chat</Link>
          <a href="mailto:support@whosenxt.com">Contact Support</a>
        </div>
      </footer>
    </main>
  );
}
