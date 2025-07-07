import React from "react";

export default function MarketplaceBoard() {
  const posts = [
    { title: "Used Couch", price: "$40", emoji: "🛋️" },
    { title: "Gaming Chair", price: "$60", emoji: "🪑" },
  ];

  return (
    <div>
      <h2>Marketplace 🛍️</h2>
      <div style={styles.list}>
        {posts.map((item, idx) => (
          <div key={idx} style={styles.card}>
            <span style={{ fontSize: 32 }}>{item.emoji}</span>
            <h4>{item.title}</h4>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    gap: "20px",
    marginTop: 10,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    background: "#E1BEE7",
    textAlign: "center",
    width: 150,
  },
};
