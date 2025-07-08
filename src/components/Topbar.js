// src/components/Topbar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar({ dark, toggleDark }) {
  return (
    <nav className="topbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="text-logo">
          WHOSENXT
        </Link>
        <button
          onClick={toggleDark}
          aria-label="Toggle theme"
          className="theme-toggle-btn"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
