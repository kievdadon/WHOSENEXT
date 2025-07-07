import React, { useState } from "react";
import AuthForm from "./AuthForm";
import HomeScreen from "./HomeScreen";
import VoiceAssistant from "./VoiceAssistant";
import ProductSearch from "./ProductSearch";
import WorkerDashboard from "./WorkerDashboard";
import WorkerPayoutDashboard from "./WorkerPayoutDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminPayoutTracker from "./AdminPayoutTracker";
import MarketplaceBoard from "./MarketplaceBoard";
import FamilyGroup from "./FamilyGroup";

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("home");

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const renderMain = () => {
    if (!user) return <AuthForm onLoginSuccess={handleLogin} />;

    if (screen === "home") return <HomeScreen />;

    return (
      <>
        <VoiceAssistant />

        {user.is_admin && (
          <>
            <AdminDashboard />
            <AdminPayoutTracker />
          </>
        )}

        {user.is_worker && !user.is_admin && (
          <>
            <WorkerDashboard />
            <WorkerPayoutDashboard />
          </>
        )}

        {!user.is_admin && !user.is_worker && (
          <>
            <ProductSearch />
          </>
        )}

        <MarketplaceBoard />
        <FamilyGroup />
      </>
    );
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        {user && (
          <>
            <button onClick={() => setScreen("home")} style={styles.btn}>🏠 Home</button>
            <button onClick={() => setScreen("full")} style={styles.btn}>🔧 Full App</button>
            <button onClick={() => setUser(null)} style={styles.btn}>🚪 Log Out</button>
          </>
        )}
      </nav>

      {renderMain()}
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Baloo 2', cursive",
    background: "#F3E5F5",
    minHeight: "100vh",
    padding: 20,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  btn: {
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "10px 16px",
    fontSize: 14,
    cursor: "pointer",
  },
};
