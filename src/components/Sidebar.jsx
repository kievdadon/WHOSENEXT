import React from "react";

export default function Sidebar({ onNavigate }) {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>WHOSENXT</h2>
      <button onClick={() => onNavigate("home")}>🏠 Home</button>
      <button onClick={() => onNavigate("delivery")}>🍔 Delivery</button>
      <button onClick={() => onNavigate("marketplace")}>🛍️ Marketplace</button>
      <button onClick={() => onNavigate("gigs")}>📋 Gigs</button>
      <button onClick={() => onNavigate("family")}>👨‍👩‍👧 Family</button>
      <button onClick={() => onNavigate("apply")}>🚗 Become a Driver</button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    background: "#6A1B9A",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "10px",
    fontSize: "16px",
  },
  logo: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
};
