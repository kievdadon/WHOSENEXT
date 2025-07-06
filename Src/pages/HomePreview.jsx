import React from "react";
import VoiceAssistant from "./VoiceAssistant";
import ProductSearch from "./ProductSearch";
import FamilyGroup from "./FamilyGroup";
import MarketplaceBoard from "./MarketplaceBoard";

export default function HomePreview() {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>WHOSENXT</h1>
        <p style={styles.tagline}>Your Voice-Activated Life Assistant 💬</p>
      </header>

      <div style={styles.section}>
        <VoiceAssistant />
      </div>

      <div style={styles.section}>
        <ProductSearch />
      </div>

      <div style={styles.section}>
        <FamilyGroup />
      </div>

      <div style={styles.section}>
        <MarketplaceBoard />
      </div>

      <footer style={styles.footer}>
        <p>Made with 💜 for families, friends, and future.</p>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#F3E5F5",
    fontFamily: "'Baloo 2', cursive",
    minHeight: "100vh",
    paddingBottom: 40,
  },
  header: {
    textAlign: "center",
    padding: "40px 16px 20px",
    background: "#8E24AA",
    color: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 36,
    margin: 0,
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 16,
    marginTop: 8,
    color: "#F3E5F5",
  },
  section: {
    margin: "30px auto",
    maxWidth: 800,
    padding: "0 16px",
  },
  footer: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 14,
    color: "#555",
  },
};
