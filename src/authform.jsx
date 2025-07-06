import React, { useState } from "react";
import { loginUser, registerUser } from "./api";

export default function AuthForm({ onLoginSuccess }) {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res =
        formType === "login"
          ? await loginUser(username, password)
          : await registerUser(username, password);

      if (res.access_token) {
        onLoginSuccess(res);
      } else {
        setError("Login failed. Check your credentials.");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {formType === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            {formType === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p style={styles.switch}>
          {formType === "login" ? "Need an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setFormType(formType === "login" ? "register" : "login")}
            style={styles.link}
          >
            {formType === "login" ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#F3E5F5",
    fontFamily: "'Baloo 2', cursive",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
  },
  title: {
    color: "#6A1B9A",
    fontSize: "26px",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 16px",
    margin: "10px 0",
    borderRadius: 12,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  button: {
    padding: "12px",
    backgroundColor: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    marginTop: 12,
    cursor: "pointer",
  },
  error: {
    color: "#D32F2F",
    marginTop: 6,
    fontSize: 14,
  },
  switch: {
    marginTop: 16,
    fontSize: 15,
  },
  link: {
    color: "#6A1B9A",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
