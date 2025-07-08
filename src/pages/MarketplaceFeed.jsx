import React, { useState, useEffect } from 'react';
import { getMenu } from '../api'; // Replace with your actual API call
import './MarketplaceFeed.css';

export default function MarketplaceFeed() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function fetchItems() {
      const data = await getMenu('all'); // Replace with real store or API
      setItems(data.menu || []);
      setFiltered(data.menu || []);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    let result = items;
    if (search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== 'All') {
      result = result.filter(item => item.category === category);
    }
    setFiltered(result);
  }, [search, category, items]);

  const categories = ['All', ...new Set(items.map(i => i.category).filter(Boolean))];

  return (
    <div className="marketplace">
      <h1>🛍️ Marketplace</h1>

      <div className="marketplace-filters">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="marketplace-grid">
        {filtered.map((item, i) => (
          <div key={i} className="marketplace-card">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} />
            )}
            <h3>{item.name}</h3>
            <p className="price">💵 ${item.price?.toFixed(2)}</p>
            <p className="category">📦 {item.category}</p>
          </div>
        ))}
        {filtered.length === 0 && <p>No items found.</p>}
      </div>
    </div>
  );
}
