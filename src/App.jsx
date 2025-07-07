import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Add Route here
import StoreUpload from "./pages/StoreUpload";
import MarketplaceFeed from "./pages/MarketplaceFeed";
import PostMarketplaceItem from "./pages/PostMarketplaceItem";
import GigFeed from "./pages/GigFeed";
import PostGig from "./pages/PostGig";
import PayoutForm from "./pages/PayoutForm";
import FamilyGroupChat from "./pages/FamilyGroupChat";

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>WHOSENXT</h1>
        <Routes>
          {/* Store Routes */}
          <Route path="/upload-store" element={<StoreUpload />} />
          
          {/* Marketplace Routes */}
          <Route path="/marketplace/feed" element={<MarketplaceFeed />} />
          <Route path="/marketplace/post" element={<PostMarketplaceItem />} />

          {/* Gig Routes */}
          <Route path="/gig/feed" element={<GigFeed />} />
          <Route path="/gig/post" element={<PostGig />} />

          {/* Payout Routes */}
          <Route path="/payout" element={<PayoutForm />} />

          {/* Family Chat Routes */}
          <Route path="/family/group/:groupId" element={<FamilyGroupChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
