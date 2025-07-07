import React, { useState } from "react";

export default function AuthForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Simulate login (replace with real API if needed)
    const mockUser = {
      name: "Test User",
      email,
      is_admin: email.includes("admin"),
      is_worker: email.includes("worker"),
    };

    onLoginSuccess(mockUser);
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h2 style={styles.title}>WHOSENXT Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 320,
    margin: "80px auto",
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 20,
    color: "#6A1B9A",
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#8E24AA",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};
