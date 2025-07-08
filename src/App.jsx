import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Switch>
          {/* Store Routes */}
          <Route path="/upload-store" component={StoreUpload} />

          {/* Marketplace Routes */}
          <Route path="/marketplace/feed" component={MarketplaceFeed} />
          <Route path="/marketplace/post" component={PostMarketplaceItem} />

          {/* Gig Routes */}
          <Route path="/gig/feed" component={GigFeed} />
          <Route path="/gig/post" component={PostGig} />

          {/* Payout Routes */}
          <Route path="/payout" component={PayoutForm} />

          {/* Family Chat Routes */}
          <Route path="/family/group/:groupId" component={FamilyGroupChat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
