// WorkerDashboard.jsx
import React, { useEffect, useState } from "react";
import { getWorkerOrders, acceptOrder, updateOrderStatus } from "./api";

export default function WorkerDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  async function loadOrders() {
    const data = await getWorkerOrders();
    if (data.error) setError(data.error);
    else setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleAccept(id) {
    await acceptOrder(id);
    loadOrders();
  }

  async function handleUpdateStatus(id, status) {
    await updateOrderStatus(id, status);
    loadOrders();
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Worker Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td>{o.status}</td>
                <td>
                  {o.status === "pending" && (
                    <button onClick={() => handleAccept(o.order_id)}>Accept</button>
                  )}
                  {["accepted", "picked_up"].includes(o.status) && (
                    <>
                      {o.status !== "picked_up" && (
                        <button onClick={() => handleUpdateStatus(o.order_id, "picked_up")}>
                          Mark Picked Up
                        </button>
                      )}
                      {o.status !== "delivered" && (
                        <button onClick={() => handleUpdateStatus(o.order_id, "delivered")}>
                          Mark Delivered
                        </button>
                      )}
                    </>
                  )}
                </td>
                <td>{new Date(o.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
