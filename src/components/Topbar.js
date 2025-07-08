import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Topbar({ dark, toggleDark }) {
  return (
    <div className="topbar">
      <Link to="/">
        <img src={logo} alt="WHOSENXT logo" style={{ height: 40 }} />
      </Link>
      <div style={{ marginLeft:'auto' }}>
        <button onClick={toggleDark} aria-label="Toggle theme">
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </div>
  );
}
