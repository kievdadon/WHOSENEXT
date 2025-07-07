import React from "react";

export default function WorkerDashboard() {
  const sampleGigs = [
    { id: "G123", title: "Deliver groceries", status: "In Progress" },
    { id: "G124", title: "Move sofa", status: "Pending" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>WHOSENXT JOB Dashboard</h2>
      <div style={styles.list}>
        {sampleGigs.map((gig) => (
          <div key={gig.id} style={styles.card}>
            <h3>{gig.title}</h3>
            <p>Status: <strong>{gig.status}</strong></p>
            <p>ID: {gig.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 700,
    margin: "0 auto",
  },
  heading: {
    color: "#6A1B9A",
    textAlign: "center",
    marginBottom: 24,
  },
  list: {
    display: "grid",
    gap: 16,
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};
