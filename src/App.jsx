import React, { useState } from "react";
import AuthForm from "./AuthForm";
import VoiceAssistant from "./VoiceAssistant";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";
import ProductSearch from "./ProductSearch";
import MarketplaceBoard from "./MarketplaceBoard";
import FamilyGroup from "./FamilyGroup";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.logo}>WHOSENXT</h1>

      {!user ? (
        <AuthForm onLoginSuccess={handleLogin} />
      ) : (
        <>
          {/* AI Assistant always shown */}
          <VoiceAssistant />

          {/* Role-based dashboards */}
          {user.is_admin && <AdminDashboard />}
          {user.is_worker && !user.is_admin && <WorkerDashboard />}
          {!user.is_admin && !user.is_worker && <ProductSearch />}

          {/* Marketplace board for everyone */}
          <MarketplaceBoard />

          {/* Family group for all */}
          <FamilyGroup />
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Baloo 2', cursive",
    background: "#F3E5F5",
    minHeight: "100vh",
    padding: 24,
  },
  logo: {
    color: "#6A1B9A",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
};

