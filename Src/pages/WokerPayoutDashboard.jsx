import React, { useState, useMemo } from "react";

export default function WorkerPayoutDashboard() {
  const [payouts, setPayouts] = useState([
    { id: 1, orderId: "A001", amount: 95 },
    { id: 2, orderId: "A002", amount: 250.75 },
    { id: 3, orderId: "A003", amount: 1200 },
    { id: 4, orderId: "A004", amount: 87.5 },
  ]);

  const total = useMemo(
    () => payouts.reduce((sum, p) => sum + p.amount, 0),
    [payouts]
  );

  const formatMoney = (amount) =>
    amount >= 1000
      ? `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      : `$${amount.toFixed(2)}`;

  const downloadCSV = () => {
    const header = "Order ID,Amount\n";
    const rows = payouts.map(p => `${p.orderId},${p.amount}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "whosenxt_payouts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>💸 Worker Payout Dashboard</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td>{p.orderId}</td>
                <td>{formatMoney(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={styles.total}>
          <strong>Total Earned:</strong> {formatMoney(total)}
        </p>

        <button style={styles.button} onClick={downloadCSV}>
          Download Report
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 700,
    margin: "40px auto",
    fontFamily: "'Baloo 2', cursive",
    padding: "0 16px",
  },
  heading: {
    fontSize: 26,
    color: "#6A1B9A",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
  button: {
    background: "#8E24AA",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    fontSize: 16,
    cursor: "pointer",
  },
};
