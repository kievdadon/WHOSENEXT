// ProductSearch.jsx
import React, { useState } from "react";
import { getMenu } from "./api";

export default function ProductSearch() {
  const [store, setStore] = useState("");
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");

  const fetchMenu = async () => {
    setError("");
    try {
      const data = await getMenu(store);
      if (data.error) {
        setMenu([]);
        setError("Store not found.");
      } else {
        setMenu(data.menu || []);
      }
    } catch {
      setMenu([]);
      setError("Error fetching menu.");
    }
  };

  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.title}>🛍️ Search Store Menu</h1>
      </header>

      <section aria-labelledby="search-heading" style={styles.section}>
        <h2 id="search-heading" className="visually-hidden">
          Search for a store’s menu
        </h2>

        {/* Search Form */}
        <div style={styles.form}>
          <label htmlFor="store-input" className="visually-hidden">
            Store name
          </label>
          <input
            id="store-input"
            type="text"
            placeholder="Enter store name…"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            style={styles.input}
          />
          <button
            type="button"
            onClick={fetchMenu}
            style={styles.button}
            aria-label="View menu for entered store"
          >
            View Menu
          </button>
        </div>

        {error && (
          <p role="alert" style={styles.error}>
            {error}
          </p>
        )}

        {/* Menu Grid */}
        {menu.length > 0 && (
          <section aria-label="Search results" style={styles.menu}>
            {menu.map((item, i) => (
              <article key={i} style={styles.card}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    style={styles.img}
                  />
                )}
                <h2 style={styles.itemName}>{item.name}</h2>
                <p style={styles.itemInfo}>
                  <span aria-label="Price">💵</span>{" "}
                  {item.price?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p style={styles.itemInfo}>
                  <span aria-label="Category">📦</span> {item.category}
                </p>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    padding: "var(--space-lg)",
    maxWidth: "var(--container-max)",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "var(--primary)",
    marginBottom: "var(--space-lg)",
    fontSize: "1.75rem",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-lg)",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-sm)",
    marginBottom: "var(--space-md)",
  },
  input: {
    flex: "1 1 200px",
    padding: "var(--space-sm)",
    borderRadius: "var(--radius)",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "var(--space-sm) var(--space-md)",
    backgroundColor: "var(--primary)",
    color: "var(--color-white)",
    border: "none",
    borderRadius: "var(--radius)",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "var(--color-primary-dark)",
    textAlign: "center",
    marginBottom: "var(--space-md)",
  },
  menu: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "var(--space-md)",
  },
  card: {
    backgroundColor: "var(--secondary-light)",
    padding: "var(--space-md)",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow-soft)",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  img: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "var(--radius)",
    marginBottom: "var(--space-sm)",
  },
  itemName: {
    fontSize: "1.1rem",
    marginBottom: "var(--space-sm)",
    color: "var(--text-light)",
  },
  itemInfo: {
    marginBottom: "var(--space-sm)",
    color: "var(--text-light)",
  },
};
