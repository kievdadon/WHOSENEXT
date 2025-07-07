import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./pages/HomeScreen";
import DeliveryScreen from "./pages/DeliveryScreen";
import MarketplaceBoard from "./pages/MarketplaceBoard";
import GigBoard from "./pages/GigBoard";
import FamilyGroup from "./pages/FamilyGroup";  // ✅ only this one
import DriverApply from "./pages/DriverApply";
import AuthForm from "./AuthForm";
import StoreUpload from './pages/StoreUpload';

// In Routes:
<Route path="/upload-store" element={<StoreUpload />} />

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  if (!user) {
    return <AuthForm onLoginSuccess={(u) => setUser(u)} />;
  }

  let content;
  switch (page) {
    case "delivery":
      content = <DeliveryScreen />;
      break;
    case "marketplace":
      content = <MarketplaceBoard />;
      break;
    case "gigs":
      content = <GigBoard />;
      break;
    case "family":
      content = <FamilyGroup />;
      break;
    case "apply":
      content = <DriverApply />;
      break;
    default:
      content = <HomeScreen />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onNavigate={setPage} />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>{content}</div>
    </div>
  );
}

export default App;
