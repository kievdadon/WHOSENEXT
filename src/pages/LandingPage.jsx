import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="landing">
      <header className="hero">
        <div className="hero-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🚀</span> WHOSENXT
          </Link>
          <h1>Welcome to <span className="brand">WHOSENXT</span></h1>
          <p>Your all-in-one platform for gigs, marketplace listings, and community support.</p>
          <div className="hero-buttons">
            <Link to="/gig/feed" className="button primary">Explore Gigs</Link>
            <Link to="/marketplace/feed" className="button secondary">Browse Marketplace</Link>
            <Link to="/voice" className="button secondary">🎤 Talk to WHOSENXT</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <h2>What You Can Do</h2>
        <div className="feature-grid">
          <div className="feature-card" data-aos="fade-up">
            <span role="img" aria-label="briefcase">💼</span>
            <h3>Post or Accept Gigs</h3>
            <p>Find flexible work or hire help in your area.</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <span role="img" aria-label="store">🛍️</span>
            <h3>Sell in the Marketplace</h3>
            <p>List items, promote your store, and reach local buyers.</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <span role="img" aria-label="money">💸</span>
            <h3>Track Payouts</h3>
            <p>Manage your earnings and submit payout requests easily.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What People Are Saying</h2>
        <div className="testimonial-grid">
          <blockquote data-aos="fade-right">
            <p>"WHOSENXT helped me find work the same day I signed up."</p>
            <footer>— Jordan, Cleveland</footer>
          </blockquote>
          <blockquote data-aos="fade-up">
            <p>"I posted a gig and had it completed within hours. Super smooth."</p>
            <footer>— Maya, Columbus</footer>
          </blockquote>
          <blockquote data-aos="fade-left">
            <p>"The marketplace is a game-changer for local sellers."</p>
            <footer>— Devon, Cincinnati</footer>
          </blockquote>
        </div>
      </section>

      <section className="video-section">
        <h2>See WHOSENXT in Action</h2>
        <div className="video-wrapper" data-aos="zoom-in">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="WHOSENXT Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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

      <div className="fab">
        <Link to="/gig/post">+</Link>
      </div>
    </main>
  );
}
