// CustomerDashboard.jsx
import React, { useState } from 'react';
import { getMenu } from './api';

const stores = [
  { name: 'Walmart', image: 'https://logo.clearbit.com/walmart.com' },
  { name: 'McDonald\'s', image: 'https://logo.clearbit.com/mcdonalds.com' },
  { name: 'Sonic', image: 'https://logo.clearbit.com/sonicdrivein.com' },
  { name: 'Hollister', image: 'https://logo.clearbit.com/hollisterco.com' }
];

const CustomerDashboard = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [menu, setMenu] = useState([]);

  const handleStoreClick = async (store) => {
    setSelectedStore(store);
    const data = await getMenu(store.name);
    setMenu(data.menu);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">WHOSENXT Marketplace</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stores.map((store) => (
          <div
            key={store.name}
            onClick={() => handleStoreClick(store)}
            className="cursor-pointer border rounded-xl p-2 shadow hover:shadow-lg"
          >
            <img src={store.image} alt={store.name} className="w-full h-24 object-contain mb-2" />
            <h2 className="text-center font-semibold">{store.name}</h2>
          </div>
        ))}
      </div>

      {selectedStore && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Menu - {selectedStore.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menu.map((item, index) => (
              <div key={index} className="border rounded-xl p-3 shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-gray-600">{item.category}</div>
                <div className="text-green-600 font-semibold">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
