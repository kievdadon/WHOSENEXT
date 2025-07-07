import React, { useState, useEffect } from "react";

const stores = [
  {
    name: "Popeyes",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Popeyes_Logo.svg/1920px-Popeyes_Logo.svg.png",
    isOpen: true,
    category: "Food",
  },
  {
    name: "Walmart",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1920px-Walmart_logo.svg.png",
    isOpen: false,
    category: "Retail",
  },
  {
    name: "Target",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/1920px-Target_logo.svg.png",
    isOpen: true,
    category: "Retail",
  },
];

export default function DeliveryScreen() {
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

const styles = {
  container: {
    padding: 24,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f0f0ff",
    borderRadius: 16,
    padding: 20,
    width: 260,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: {
    height: 80,
    objectFit: "contain",
    marginBottom: 12,
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: "bold",
  },
};
