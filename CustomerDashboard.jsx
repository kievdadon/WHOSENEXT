// CustomerDashboard.jsx
import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const handleStoreClick = async (store) => {
    if (store.name === selectedStore?.name) return;
    setSelectedStore(store);
    setMenu([]);
    setLoading(true);

    try {
      const { menu: fetchedMenu = [] } = await getMenu(store.name);
      setMenu(fetchedMenu);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-bold mb-6 text-primary">
          WHOSENXT Marketplace
        </h1>
      </header>

      {/* Store Selector */}
      <section aria-label="Choose a store" className="mb-8">
        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {stores.map((store) => {
            const isActive = selectedStore?.name === store.name;
            return (
              <li key={store.name}>
                <button
                  type="button"
                  onClick={() => handleStoreClick(store)}
                  aria-pressed={isActive}
                  aria-label={`Select ${store.name}`}
                  className={`
                    flex flex-col items-center p-4 border rounded-2xl
                    transition-shadow hover:shadow-lg focus:outline-none focus:ring-4
                    ${isActive ? 'ring-primary/50 ring-4' : 'ring-transparent'}
                  `}
                >
                  <img
                    src={store.image}
                    alt={`Logo of ${store.name}`}
                    loading="lazy"
                    width="100"
                    height="100"
                    className="object-contain mb-2 rounded"
                  />
                  <span className="font-medium text-lg">{store.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Menu Section */}
      <section aria-labelledby="menu-heading">
        {/* Loading State */}
        {loading && (
          <p role="status" className="text-center italic text-gray-500">
            Loading menu…
          </p>
        )}

        {/* Menu Results */}
        {!loading && selectedStore && (
          <>
            <h2
              id="menu-heading"
              className="text-2xl font-semibold mb-4 text-primary"
            >
              Menu – {selectedStore.name}
            </h2>

            {menu.length === 0 ? (
              <p role="alert" className="text-center">
                No items available right now.
              </p>
            ) : (
              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {menu.map((item, idx) => (
                  <li
                    key={idx}
                    className="border rounded-xl p-4 shadow-sm bg-secondary dark:bg-secondary-dark transition-colors"
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Image of ${item.name}`}
                      loading="lazy"
                      width="240"
                      height="160"
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>
                    <p className="text-primary font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
