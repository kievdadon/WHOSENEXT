import React, { useState } from "react";

export default function ProductSearch() {
  const [orders, setOrders] = useState([
    { id: 1, name: "Popeyes Meal", price: 14.99 },
    { id: 2, name: "Laundry Detergent", price: 9.49 },
  ]);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🧾 Your Orders</h3>

      <label style={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
        Hide orders from family group
      </label>

      {!isPrivate ? (
        <ul style={styles.orderList}>
          {orders.map((o) => (
            <li key={o.id} style={styles.orderItem}>
              {o.name} — ${o.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.privateMsg}>🔒 Orders are hidden</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    color: "#6A1B9A",
  },
  toggleLabel: {
    fontSize: 14,
    display: "block",
    marginBottom: 16,
  },
  orderList: {
    listStyle: "none",
    padding: 0,
  },
  orderItem: {
    padding: 8,
    borderBottom: "1px solid #eee",
  },
  privateMsg: {
    fontStyle: "italic",
    color: "#999",
  },
};
