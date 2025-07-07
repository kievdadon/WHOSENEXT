import React, { useState } from "react";

const sampleGigs = [
  {
    id: 1,
    title: "Help move a couch",
    description: "Need help moving a couch down from 3rd floor apartment to curb.",
    pay: "$60",
    image: "https://i.imgur.com/YOZbQ5R.jpg",
  },
  {
    id: 2,
    title: "Yard work needed",
    description: "Weeding, bagging leaves, general cleanup — small front yard.",
    pay: "$45",
    image: "https://i.imgur.com/URf7tF3.jpg",
  },
  {
    id: 3,
    title: "Assemble IKEA furniture",
    description: "1 dresser and 1 nightstand, IKEA flat-pack assembly. Tools provided.",
    pay: "$35",
    image: "https://i.imgur.com/Bp3gQFH.jpg",
  },
];

export default function GigBoard() {
  const [appliedGigId, setAppliedGigId] = useState(null);

  const handleApply = (id) => {
    setAppliedGigId(id);
    setTimeout(() => {
      alert("✅ Application submitted! You’ll get a response soon.");
    }, 300);
  };

  return (
    <div style={styles.container}>
      <h2>📋 WHOSENXT Gigs</h2>
      <div style={styles.grid}>
        {sampleGigs.map((gig) => (
          <div key={gig.id} style={styles.card}>
            <img src={gig.image} alt="gig" style={styles.image} />
            <h3>{gig.title}</h3>
            <p>{gig.description}</p>
            <p><strong>{gig.pay}</strong></p>
            <button
              onClick={() => handleApply(gig.id)}
              style={{
                ...styles.button,
                backgroundColor: appliedGigId === gig.id ? "#ccc" : "#6A1B9A",
              }}
              disabled={appliedGigId === gig.id}
            >
              {appliedGigId === gig.id ? "Applied ✅" : "Apply"}
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
    gap: 20,
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#f7ebff",
    borderRadius: 12,
    padding: 16,
    width: 280,
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
    width: "100%",
    padding: "10px 16px",
    fontSize: 16,
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
