// src/components/Topbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Topbar({ dark, toggleDark }) {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="topbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="text-logo">WHOSENXT</Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button onClick={toggleDark}>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </nav>
  );
}
