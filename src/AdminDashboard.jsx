// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAdminUsers, getAdminOrders } from "./api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      const u = await getAdminUsers();
      const o = await getAdminOrders();
      if (u.error || o.error) setError(u.error || o.error);
      else {
        setUsers(u);
        setOrders(o);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Users</h3>
      <ul>
        {users.length === 0 && <li>No users found.</li>}
        {users.map((u) => (
          <li key={u.id}>
            {u.username} {u.is_admin ? "(Admin)" : u.is_worker ? "(Worker)" : ""}
          </li>
        ))}
      </ul>

      <h3>Orders</h3>
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>User</th>
            <th>Worker</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          )}
          {orders.map((o) => (
            <tr key={o.order_id}>
              <td>{o.order_id}</td>
              <td>{o.product}</td>
              <td>{o.quantity}</td>
              <td>{o.status}</td>
              <td>{o.user}</td>
              <td>{o.worker || "-"}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
