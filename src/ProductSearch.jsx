import React, { useState } from "react";
import { getMenu } from "./api";

export default function ProductSearch() {
  const [store, setStore] = useState("");
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");

  const fetchMenu = async () => {
    setError("");
    const data = await getMenu(store);
    if (data.error) setError("Store not found.");
    else setMenu(data.menu || []);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛍️ Search Store Menu</h2>

      <input
        placeholder="Enter store name..."
        value={store}
        onChange={(e) => setStore(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchMenu} style={styles.button}>
        View Menu
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.menu}>
        {menu.map((item, index) => (
          <div key={index} style={styles.card}>
            <h4>{item.name}</h4>
            <p>💵 ${item.price?.toFixed(2)}</p>
            <p>📦 {item.category}</p>
            {item.imageUrl && (
              <img src={item.imageUrl} alt="item" style={styles.img} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "auto",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#6A1B9A",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 10,
  },
  button: {
    padding: 12,
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  menu: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  img: {
    width: "100%",
    maxHeight: 120,
    objectFit: "cover",
    borderRadius: 8,
    marginTop: 10,
  },
};
