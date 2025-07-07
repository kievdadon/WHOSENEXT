import React, { useState, useEffect } from "react";

export default function DeliveryScreen() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch store data from backend
    fetch("/api/upload-store") // Adjust the endpoint based on your backend
      .then((res) => res.json())
      .then((data) => {
        setStores(data.stores); // Assuming 'stores' is the array of store objects returned from backend
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading stores...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>🚚 WHOSENXT DELIVERY</h2>
      <div style={styles.grid}>
        {stores.map((store) => (
          <div key={store.name} style={styles.card}>
            <img src={store.logo} alt={`${store.name} logo`} style={styles.logo} />
            <h3>{store.name}</h3>
            <p>{store.category}</p>
            <p style={{ color: store.isOpen ? "green" : "red" }}>
              {store.isOpen ? "Open Now ✅" : "Closed ❌"}
            </p>
            <button
              disabled={!store.isOpen}
              style={{
                ...styles.button,
                backgroundColor: store.isOpen ? "#4CAF50" : "#ccc",
                cursor: store.isOpen ? "pointer" : "not-allowed",
              }}
            >
              {store.isOpen ? "Order Now" : "Come Back Later"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
