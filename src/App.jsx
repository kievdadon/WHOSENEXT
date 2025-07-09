// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import StoreUpload from './pages/StoreUpload';
import MarketplaceFeed from './pages/MarketplaceFeed';
import PostMarketplaceItem from './pages/PostMarketplaceItem';
import GigFeed from './pages/GigFeed';
import PostGig from './pages/PostGig';
import PayoutForm from './pages/PayoutForm';
import FamilyGroupChat from './pages/FamilyGroupChat';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// new imports for Stripe redirects
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Topbar dark={dark} toggleDark={() => setDark((d) => !d)} />

      <div className="app">
        <Sidebar>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/upload-store" activeClassName="active">
            Upload Store
          </NavLink>
          <NavLink to="/marketplace/feed" activeClassName="active">
            Marketplace
          </NavLink>
          <NavLink to="/marketplace/post" activeClassName="active">
            Post Item
          </NavLink>
          <NavLink to="/gig/feed" activeClassName="active">
            Gig Feed
          </NavLink>
          <NavLink to="/gig/post" activeClassName="active">
            Post Gig
          </NavLink>
          <NavLink to="/payout" activeClassName="active">
            Payout Form
          </NavLink>
          <NavLink to="/family/group/1" activeClassName="active">
            Family Chat
          </NavLink>
          {!user && (
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink to="/signup" activeClassName="active">
              Sign Up
            </NavLink>
          )}
        </Sidebar>

        <main className="main">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/upload-store" component={StoreUpload} />
            <Route path="/marketplace/feed" component={MarketplaceFeed} />
            <Route path="/marketplace/post" component={PostMarketplaceItem} />
            <Route path="/gig/feed" component={GigFeed} />
            <Route path="/gig/post" component={PostGig} />
            <Route path="/payout" component={PayoutForm} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />

            {/* Stripe Checkout Redirects */}
            <Route path="/success" component={SuccessPage} />
            <Route path="/cancel" component={CancelPage} />

            <Route
              path="/family/group/:groupId"
              render={(props) =>
                user ? (
                  <FamilyGroupChat {...props} user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
