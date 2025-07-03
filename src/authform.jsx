import React, { useState } from "react";
import { register, login } from "./api";

export default function AuthForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (isRegister) {
      const res = await register(username, password);
      if (res.error || res.msg?.includes("already")) {
        setError(res.error || res.msg);
      } else {
        alert("Registration successful! You can now log in.");
        setIsRegister(false);
      }
    } else {
      const res = await login(username, password);
      if (res.error) {
        setError(res.error);
      } else {
        onLoginSuccess(res);
      }
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: "auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button type="submit" style={{ width: "100%", padding: 8 }}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}
      <p style={{ marginTop: 12 }}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
