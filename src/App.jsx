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

    switch (screen) {
      case "home":
        return <HomeScreen setScreen={setScreen} />;
      case "voice":
        return <VoiceAssistant />;
      case "order":
        return <ProductSearch />;
      case "marketplace":
        return <MarketplaceBoard />;
      case "family":
        return <FamilyGroup />;
      case "worker":
        return (
          <>
            <WorkerDashboard />
            <WorkerPayoutDashboard />
          </>
        );
      case "admin":
        return (
          <>
            <AdminDashboard />
            <AdminPayoutTracker />
          </>
        );
      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        {user && (
          <>
            <button onClick={() => setScreen("home")} style={styles.btn}>🏠 Home</button>
            <button onClick={() => setScreen("voice")} style={styles.btn}>🎙️ Voice</button>
            <button onClick={() => setScreen("order")} style={styles.btn}>🛍️ Order</button>
            <button onClick={() => setScreen("marketplace")} style={styles.btn}>🏠 Marketplace</button>
            <button onClick={() => setScreen("family")} style={styles.btn}>👨‍👩‍👧 Family</button>
            <button onClick={() => setScreen(user.is_admin ? "admin" : "worker")} style={styles.btn}>
              {user.is_admin ? "🧾 Admin" : "💼 Worker"}
            </button>
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
    gap: 10,
    flexWrap: "wrap",
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

