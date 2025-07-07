import React from "react";

export default function HomeScreen() {
  return (
    <div style={styles.container}>
      <h1>Welcome to WHOSENXT 👋</h1>
      <p>Your voice-powered assistant for deliveries, gigs, family, and more!</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
  },
};
