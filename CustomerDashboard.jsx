import React, { useState, useEffect } from "react";

const stores = [
  {
    id: 1,
    name: "Walmart",
    imageUrl: "https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png",
    isOpen: true,
  },
  {
    id: 2,
    name: "Popeyes",
    imageUrl: "https://1000logos.net/wp-content/uploads/2021/04/Popeyes-logo.png",
    isOpen: false,
  },
  {
    id: 3,
    name: "McDonald's",
    imageUrl: "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png",
    isOpen: true,
  },
  {
    id: 4,
    name: "Sonic",
    imageUrl: "https://1000logos.net/wp-content/uploads/2018/04/Sonic-Logo-2009.png",
    isOpen: true,
  },
  {
    id: 5,
    name: "Kim's Wings",
    imageUrl: "https://via.placeholder.com/150?text=Kim's+Wings", // Replace with real image later
    isOpen: true,
  },
];

export default function CustomerDashboard() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [menu, setMenu] = useState([]);

  const fetchMenu = async (storeName) => {
    try {
      const response = await fetch(`https://your-backend-url.com/api/menu/${storeName}`);
      const data = await response.json();
      setMenu(data.menu);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  };

  const handleStoreClick = (store) => {
    if (store.isOpen) {
      setSelectedStore(store.name);
      fetchMenu(store.name);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Choose a Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className={`cursor-pointer border rounded-xl p-4 shadow-md transition-transform hover:scale-105 ${
              !store.isOpen ? "opacity-40 pointer-events-none" : ""
            }`}
            onClick={() => handleStoreClick(store)}
          >
            <img src={store.imageUrl} alt={store.name} className="h-24 object-contain mx-auto mb-2" />
            <h2 className="text-lg text-center font-semibold">{store.name}</h2>
            {!store.isOpen && <p className="text-red-500 text-sm text-center">Closed</p>}
          </div>
        ))}
      </div>

      {selectedStore && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{selectedStore} Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.map((item, index) => (
              <div key={index} className="border p-4 rounded-xl shadow-md">
                <img src={item.imageUrl} alt={item.name} className="h-32 object-cover w-full rounded" />
                <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
