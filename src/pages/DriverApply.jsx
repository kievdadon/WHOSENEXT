import React, { useState, useEffect } from "react";

export default function DriverApply() {
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate verification delay (24–48 hours)
    setTimeout(() => {
      setVerified(true);
    }, 2000); // You can change this to 86400000 for 24hrs if desired
  };

  return (
    <div style={styles.container}>
      <div style={styles.floatingEmojis}>
        <span style={styles.emoji}>💼</span>
        <span style={styles.emoji}>🚗</span>
        <span style={styles.emoji}>💰</span>
        <span style={styles.emoji}>📦</span>
      </div>

      {!submitted && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>Apply to WHOSENXT 🚗</h1>
          <p style={styles.subtitle}>We're glad to have you aboard! 🎉</p>
          <input type="text" placeholder="Full Name" required style={styles.input} />
          <input type="email" placeholder="Email Address" required style={styles.input} />
          <input type="text" placeholder="Phone Number" required style={styles.input} />
          <input type="text" placeholder="Driving Experience" required style={styles.input} />
          <input type="file" accept="image/*" required style={styles.input} />
          <button type="submit" style={styles.button}>Submit Application</button>
        </form>
      )}

      {submitted && !verified && (
        <div style={styles.message}>
          <h2>🕓 Application Received</h2>
          <p>Your application is under review. Please allow 1–2 days for confirmation.</p>
        </div>
      )}

      {verified && (
        <div style={styles.message}>
          <h2>✅ You’re Verified!</h2>
          <p>Welcome to WHOSENXT DELIVERY. You can now start receiving orders!</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    padding: 32,
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f3e5f5, #e1bee7)",
    fontFamily: '"Comic Sans MS", "Bubblegum Sans", cursive',
    overflow: "hidden",
  },
  form: {
    maxWidth: 480,
    margin: "auto",
    padding: 24,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    zIndex: 2,
    position: "relative",
  },
  title: {
    fontSize: "28px",
    marginBottom: 4,
    textAlign: "center",
    color: "#6A1B9A",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: 16,
    textAlign: "center",
    color: "#555",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#8E24AA",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    maxWidth: 480,
    margin: "100px auto",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  floatingEmojis: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    pointerEvents: "none",
    animation: "float 10s linear infinite",
  },
  emoji: {
    position: "absolute",
    fontSize: "2rem",
    animation: "floaty 12s infinite ease-in-out",
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 90}%`,
    opacity: 0.3,
  },
};
