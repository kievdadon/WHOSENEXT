import React, { useState } from "react";

export default function DriverApply() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.confirm}>
        <h3>✅ Thank you!</h3>
        <p>We'll review your driver application.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Become a WHOSENXT Driver 🚗</h2>
      <input type="text" placeholder="Full Name" required style={styles.input} />
      <input type="email" placeholder="Email" required style={styles.input} />
      <input type="file" accept="image/*" required style={styles.input} />
      <input type="text" placeholder="Driving Experience" required style={styles.input} />
      <button type="submit" style={styles.button}>Submit Application</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#7E57C2",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  confirm: {
    textAlign: "center",
    marginTop: "80px",
  },
};
