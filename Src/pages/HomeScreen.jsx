import React from "react";

export default function HomeScreen() {
  const features = [
    { icon: "🎙️", label: "Check In" },
    { icon: "🛍️", label: "Order" },
    { icon: "🏠", label: "Marketplace" },
    { icon: "👨‍👩‍👧", label: "Family Chat" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>WHOSENXT</h1>
      <p style={styles.tagline}>Your future awaits you and we are here to help!</p>

      <div style={styles.grid}>
        {features.map((item) => (
          <div key={item.label} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <div style={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Baloo 2', cursive",
    background: "#F3E5F5",
    minHeight: "100vh",
    padding: 24,
    textAlign: "center",
  },
  logo: {
    color: "#6A1B9A",
    fontSize: 40,
    marginBottom: 8,
  },
  tagline: {
    color: "#6A1B9A",
    fontSize: 16,
    marginBottom: 40,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
    maxWidth: 400,
    margin: "0 auto",
