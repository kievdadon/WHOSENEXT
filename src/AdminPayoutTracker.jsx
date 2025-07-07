import React from "react";

export default function AdminPayoutTracker() {
  const payouts = [
    { worker: "Jane D.", amount: 220.0, date: "2025-07-01", status: "Paid" },
    { worker: "Chris M.", amount: 1100.0, date: "2025-07-03", status: "Pending" },
    { worker: "Sam T.", amount: 980.0, date: "2025-07-05", status: "Paid" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Admin Payout Tracker</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Worker</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((p, i) => (
            <tr key={i}>
              <td style={styles.td}>{p.worker}</td>
              <td style={styles.td}>
                {p.amount >= 1000
                  ? `$${p.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`
                  : `$${p.amount.toFixed(2)}`}
              </td>
              <td style={styles.td}>{p.date}</td>
              <td style={styles.td}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    color: "#6A1B9A",
    marginBottom: 24,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: 12,
    borderBottom: "2px solid #ccc",
    color: "#4A148C",
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #eee",
  },
};
