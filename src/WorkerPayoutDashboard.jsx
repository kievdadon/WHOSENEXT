import React from "react";

export default function WorkerPayoutDashboard() {
  const payouts = [
    { date: "2025-07-01", amount: 125.0 },
    { date: "2025-07-03", amount: 900.0 },
    { date: "2025-07-05", amount: 1_250.0 },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💰 Payout History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((p, i) => (
            <tr key={i}>
              <td style={styles.td}>{p.date}</td>
              <td style={styles.td}>
                {p.amount >= 1000
                  ? `$${p.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}`
                  : `$${p.amount.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
  },
  title: {
    color: "#4A148C",
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    borderBottom: "2px solid #ccc",
    padding: 10,
    color: "#6A1B9A",
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #eee",
  },
};
