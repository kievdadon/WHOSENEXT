import React, { useState, useEffect } from 'react';
import { getGigs } from '../api'; // Replace with your actual API call
import './GigFeed.css';

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState('All');

  useEffect(() => {
    async function fetchGigs() {
      const data = await getGigs(); // Replace with real API
      setGigs(data || []);
      setFiltered(data || []);
    }
    fetchGigs();
  }, []);

  useEffect(() => {
    let result = gigs;
    if (type !== 'All') {
      result = result.filter(g => g.type === type.toLowerCase());
    }
    setFiltered(result);
  }, [type, gigs]);

  const types = ['All', 'Standard', 'Quick'];

  return (
    <div className="gig-feed">
      <h1>🧰 Gig Feed</h1>

      <div className="gig-filters">
        <label>Filter by Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="gig-grid">
        {filtered.map((gig, i) => (
          <div key={i} className="gig-card">
            <div className="gig-header">
              <h3>{gig.title}</h3>
              {gig.priority && <span className="badge">🔥 Priority</span>}
            </div>
            <p>{gig.description}</p>
            <div className="gig-meta">
              <span>📍 {gig.location || 'Remote'}</span>
              <span className={`status ${gig.accepted ? 'accepted' : 'open'}`}>
                {gig.accepted ? 'Accepted' : 'Open'}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No gigs found.</p>}
      </div>
    </div>
  );
}
