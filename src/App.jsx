import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import ProductSearch from "./ProductSearch";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [user, setUser] = useState(null);

  // Try to reload user from localStorage on refresh
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

  if (!user) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>WHOSENXT Dashboard</h1>
        <div>
          <strong>{user.username}</strong>{" "}
          <button onClick={handleLogout} style={{ marginLeft: 12 }}>
            Logout
          </button>
        </div>
      </header>

      <hr style={{ margin: "20px 0" }} />

      {user.is_admin && <AdminDashboard />}
      {!user.is_admin && user.is_worker && <WorkerDashboard />}
      {!user.is_admin && !user.is_worker && <ProductSearch />}
    </div>
  );
}

export default App;
