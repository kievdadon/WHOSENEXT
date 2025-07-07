import React, { useState } from "react";

export default function AuthForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = {
      name: "Test User",
      email,
      is_admin: email.includes("admin"),
      is_worker: email.includes("worker"),
    };
    onLoginSuccess(mockUser);
  };

  return (
    <div style={styles.background}>
      {/* Floating Emojis */}
      <div style={{ ...styles.floatingEmoji, top: "15%", left: "10%" }}>💵</div>
      <div style={{ ...styles.floatingEmoji, top: "40%", left: "75%" }}>👕</div>
      <div style={{ ...styles.floatingEmoji, top: "60%", left: "20%" }}>🚗</div>
      <div style={{ ...styles.floatingEmoji, top: "80%", left: "65%" }}>🛋️</div>

      {/* Login Form */}
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

        <button type="submit" style={styles.loginButton}>Login</button>

        <div style={styles.divider}>or</div>

        <button type="button" style={styles.socialButton}>Continue with Google</button>
        <button type="button" style={styles.socialButton}>Continue with iCloud</button>

        <p style={styles.signupText}>
          New to WHOSENXT? <a href="#" style={styles.link}>Sign up here</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  background: {
    position: "relative",
    background: "linear-gradient(to bottom right, #F3E5F5, #E1BEE7)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  floatingEmoji: {
    position: "absolute",
    fontSize: 44,
    opacity: 0.08,
    animation: "float 8s ease-in-out infinite",
  },
  form: {
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    maxWidth: 350,
    width: "90%",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    zIndex: 1,
  },
  title: {
    marginBottom: 20,
    fontSize: 26,
    color: "#6A1B9A",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    padding: 12,
    background: "#8E24AA",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 15,
  },
  divider: {
    textAlign: "center",
    margin: "16px 0",
    color: "#999",
  },
  socialButton: {
    width: "100%",
    padding: 12,
    background: "#EDE7F6",
    color: "#4A148C",
    fontWeight: "bold",
    border: "none",
    borderRadius: 10,
    marginBottom: 10,
    cursor: "pointer",
  },
  signupText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#6A1B9A",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
