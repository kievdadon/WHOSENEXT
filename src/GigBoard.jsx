import React from "react";

export default function GigBoard() {
  const gigs = [
    { title: "Move Furniture", pay: "$100", emoji: "📦" },
    { title: "Help with Lawn", pay: "$60", emoji: "🌱" },
  ];

  return (
    <div>
      <h2>WHOSENXT GIGS 📋</h2>
      <div style={styles.list}>
        {gigs.map((gig, i) => (
          <div key={i} style={styles.card}>
            <div style={{ fontSize: 32 }}>{gig.emoji}</div>
            <h4>{gig.title}</h4>
            <p>{gig.pay}</p>
            <button style={styles.button}>Apply</button>
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
    marginTop: 20,
  },
  card: {
    padding: 16,
    background: "#FCE4EC",
    borderRadius: 10,
    textAlign: "center",
    width: 180,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: 10,
    background: "#EC407A",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
  },
};
