// CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getMenu } from './api';

const stores = [
  { name: 'Walmart', image: 'https://logo.clearbit.com/walmart.com' },
  { name: "McDonald's", image: 'https://logo.clearbit.com/mcdonalds.com' },
  { name: 'Sonic', image: 'https://logo.clearbit.com/sonicdrivein.com' },
  { name: 'Hollister', image: 'https://logo.clearbit.com/hollisterco.com' },
];

export default function CustomerDashboard() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);

  const handleStoreClick = async (store) => {
    if (store.name === selectedStore?.name) return;
    setSelectedStore(store);
    setMenu([]);
    setLoadingMenu(true);

    try {
      const data = await getMenu(store.name);
      setMenu(data.menu || []);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setMenu([]);
    } finally {
      setLoadingMenu(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">WHOSENXT Marketplace</h1>

      {/* Store Selector */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {stores.map((store) => (
          <li key={store.name}>
            <button
              type="button"
              onClick={() => handleStoreClick(store)}
              className={`
                flex flex-col items-center p-4 border rounded-2xl
                transition-shadow hover:shadow-lg focus:outline-none focus:ring-4
                ${
                  selectedStore?.name === store.name
                    ? 'ring-primary/50 ring-4'
                    : 'ring-transparent'
                }
              `}
              aria-pressed={selectedStore?.name === store.name}
            >
              <img
                src={store.image}
                alt={`${store.name} logo`}
                loading="lazy"
                width="100"
                height="100"
                className="object-contain mb-2"
              />
              <span className="font-medium text-lg">{store.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Menu Section */}
      {loadingMenu && (
        <p className="text-center italic text-gray-500">Loading menu…</p>
      )}

      {!loadingMenu && selectedStore && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Menu – {selectedStore.name}
          </h2>

          {menu.length === 0 ? (
            <p className="text-center">No items available right now.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {menu.map((item, idx) => (
                <li
                  key={idx}
                  className="border rounded-xl p-4 shadow-sm bg-secondary dark:bg-secondary-dark transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    width="240"
                    height="160"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-primary font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
