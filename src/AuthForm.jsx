// AuthForm.jsx
import React, { useState } from 'react';
import './AuthForm.css'; // make sure to create this and/or merge into App.css

export default function AuthForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = {
      name: 'Test User',
      email,
      is_admin: email.includes('admin'),
      is_worker: email.includes('worker'),
    };
    onLoginSuccess(mockUser);
  };

  // Floating-emoji positions
  const emojis = [
    { symbol: '💵', style: { top: '15%', left: '10%' } },
    { symbol: '👕', style: { top: '40%', left: '75%' } },
    { symbol: '🚗', style: { top: '60%', left: '20%' } },
    { symbol: '🛋️', style: { top: '80%', left: '65%' } },
  ];

  return (
    <main className="auth-page">
      <div className="auth-background">
        {emojis.map((e, i) => (
          <div
            key={i}
            className="floating-emoji"
            style={e.style}
            aria-hidden="true"
          >
            {e.symbol}
          </div>
        ))}

        <form
          onSubmit={handleLogin}
          className="auth-form"
          noValidate
          aria-labelledby="auth-title"
        >
          <header>
            <h2 id="auth-title" className="auth-title">
              WHOSENXT Login
            </h2>
          </header>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn primary-btn">
            Login
          </button>

          <div className="divider" aria-hidden="true">
            or
          </div>

          <button type="button" className="btn social-btn">
            Continue with Google
          </button>
          <button type="button" className="btn social-btn">
            Continue with iCloud
          </button>

          <p className="signup-text">
            New to WHOSENXT?{' '}
            <a href="#" className="signup-link">
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
