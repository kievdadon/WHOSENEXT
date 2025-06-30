import React, { useState, useEffect } from "react";

const stores = [
  {
    id: 1,
    name: "Walmart",
    imageUrl:
      "https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png",
    isOpen: true,
    distance: "1.2 mi",
  },
  {
    id: 2,
    name: "Popeyes",
    imageUrl:
      "https://1000logos.net/wp-content/uploads/2021/04/Popeyes-logo.png",
    isOpen: false,
    distance: "2.4 mi",
  },
  {
    id: 3,
    name: "McDonald's",
    imageUrl:
      "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png",
    isOpen: true,
    distance: "0.9 mi",
  },
  {
    id: 4,
    name: "Sonic",
    imageUrl:
      "https://1000logos.net/wp-content/uploads/2018/04/Sonic-Logo-2009.png",
    isOpen: true,
    distance: "1.8 mi",
  },
  {
    id: 5,
    name: "Kim's Wings",
    imageUrl: "https://via.placeholder.com/150?text=Kim's+Wings",
    isOpen: true,
    distance: "0.5 mi",
  },
];

export default function CustomerDashboard() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const fetchMenu = async (storeName) => {
    try {
      const response = await fetch(
        `https://whosenext-4-fh9z.onrender.com/menu/${storeName}`
      );
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

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedMenu = filteredMenu.reduce((groups, item) => {
    const category = item.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

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
            <img
              src={store.imageUrl}
              alt={store.name}
              className="h-24 object-contain mx-auto mb-2"
            />
            <h2 className="text-lg text-center font-semibold">{store.name}</h2>
            <p className="text-center text-sm text-gray-500">{store.distance}</p>
            {!store.isOpen && (
              <p className="text-red-500 text-sm text-center">Closed</p>
            )}
          </div>
        ))}
      </div>

      {selectedStore && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedStore} Menu</h2>
            <input
              type="text"
              placeholder="Search menu..."
              className="border px-3 py-1 rounded shadow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {Object.keys(groupedMenu).map((category) => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMenu[category].map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-xl shadow-md relative"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-32 object-cover w-full rounded"
                    />
                    <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white mt-2 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border p-4 rounded-xl shadow-xl z-50 w-80">
          <h3 className="text-lg font-bold mb-2">Cart ({cart.length} items)</h3>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </p>
          <button className="w-full bg-green-600 mt-2 text-white px-4 py-2 rounded hover:bg-green-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
