import React, { useState, useMemo } from "react";

export default function AdminPayoutTracker() {
  const [filter, setFilter] = useState("");
  const [records, setRecords] = useState([
    { id: 1, orderId: "A001", driver: "Jordan", amount: 95 },
    { id: 2, orderId: "A002", driver: "Taylor", amount: 250.75 },
    { id: 3, orderId: "A003", driver: "Jordan", amount: 1200 },
    { id: 4, orderId: "A004", driver: "Casey", amount: 87.5 },
    { id: 5, orderId: "A005", driver: "Taylor", amount: 150 },
  ]);

  const filtered = useMemo(() => {
    return records.filter(
      (r) =>
        r.driver.toLowerCase().includes(filter.toLowerCase()) ||
        r.orderId.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, records]);

  const totals = useMemo(() => {
    const map = {};
    records.forEach((r) => {
      map[r.driver] = (map[r.driver] || 0) + r.amount;
    });
    return map;
  }, [records]);

  const formatMoney = (amount) =>
    amount >= 1000
      ? `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      : `$${amount.toFixed(2)}`;

  const downloadCSV = () => {
    const header = "Order ID,Driver,Amount\n";
    const rows = records.map((r) => `${r.orderId},${r.driver},${r.amount}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_payout_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🧾 Admin Payout Tracker</h2>

      <input
        type="text"
        placeholder="Search by driver or order ID..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={styles.input}
      />

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Driver</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.orderId}</td>
                <td>{r.driver}</td>
                <td>{formatMoney(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.totalSection}>
          <h4>Total by Driver:</h4>
          <ul>
            {Object.entries(totals).map(([name, amt]) => (
              <li key={name}>
                {name}: <strong>{formatMoney(amt)}</strong>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={downloadCSV} style={styles.button}>
          Download Full Report
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 800,
    margin: "40px auto",
    fontFamily: "'Baloo 2', cursive",
    padding: "0 16px",
  },
  heading: {
    color: "#6A1B9A",
    fontSize: 26,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderRadius: 12,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  totalSection: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    background: "#8E24AA",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    fontSize: 16,
    cursor: "pointer",
  },
};
