import React from "react";

const sampleItems = [
  {
    id: 1,
    title: "Black Floor Lamp",
    price: "$25",
    image: "https://i.imgur.com/8oMZgLD.jpg",
  },
  {
    id: 2,
    title: "Used Coffee Table",
    price: "$30",
    image: "https://i.imgur.com/fv9X8RR.jpg",
  },
  {
    id: 3,
    title: "Mini Fridge (Works!)",
    price: "$75",
    image: "https://i.imgur.com/t7QdcGw.jpg",
  },
];

export default function MarketplaceBoard() {
  return (
    <div style={styles.container}>
      <h2>🛍️ WHOSENXT Marketplace</h2>
      <div style={styles.grid}>
        {sampleItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <h3>{item.title}</h3>
            <p><strong>{item.price}</strong></p>
            <button style={styles.button}>Message Seller</button>
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
    gap: 20,
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
    width: 260,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FB8C00",
    color: "white",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
