import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Gigs from "./pages/Gigs";
import Delivery from "./pages/Delivery";
import Family from "./pages/Family";
import Payment from "./pages/Payment";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">🏠 Home</Link>
        <Link to="/marketplace">🛒 Marketplace</Link>
        <Link to="/gigs">🎯 Gigs</Link>
        <Link to="/delivery">🚚 Delivery</Link>
        <Link to="/family">👨‍👩‍👧‍👦 Family</Link>
        <Link to="/payment">💳 Payment</Link>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/family" element={<Family />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
