import React from "react";

const stores = [
  { name: "Walmart", logo: "🛒" },
  { name: "Popeyes", logo: "🍗" },
  { name: "Target", logo: "🎯" },
];

export default function DeliveryScreen() {
  return (
    <div>
      <h2>WHOSENXT DELIVERY 🛵</h2>
      <p>Select a store to view items:</p>
      <div style={styles.storeList}>
        {stores.map((store, i) => (
          <div key={i} style={styles.card}>
            <span style={{ fontSize: 32 }}>{store.logo}</span>
            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  storeList: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#F3E5F5",
    padding: "20px",
    borderRadius: "10px",
    width: "150px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};
