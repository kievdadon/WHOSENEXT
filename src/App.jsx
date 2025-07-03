import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import ProductSearch from "./ProductSearch";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";
import VoiceAssistant from "./VoiceAssistant";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const is_worker = localStorage.getItem("is_worker") === "true";
    const is_admin = localStorage.getItem("is_admin") === "true";
    if (token && username) {
      setUser({ username, is_worker, is_admin });
    }
  }, []);

  function handleLoginSuccess(res) {
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("username", res.username);
    localStorage.setItem("is_worker", res.is_worker);
    localStorage.setItem("is_admin", res.is_admin);
    setUser({
      username: res.username,
      is_worker: res.is_worker,
      is_admin: res.is_admin,
    });
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.logo}>WHOSENXT</h1>
        {user && (
          <div>
            <strong>{user.username}</strong>{" "}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </header>

      <VoiceAssistant />

      {!user && <AuthForm onLoginSuccess={handleLoginSuccess} />}

      {user && (
        <>
          {user.is_admin && <AdminDashboard />}
          {user.is_worker && !user.is_admin && <WorkerDashboard />}
          {!user.is_admin && !user.is_worker && <ProductSearch />}
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#fafafa",
    minHeight: "100vh",
    padding: "20px 16px 80px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: "28px",
    color: "#333",
  },
  logoutBtn: {
    marginLeft: 10,
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default App;
