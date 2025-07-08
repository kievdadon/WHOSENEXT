// WorkerPayoutDashboard.jsx
import React from 'react';

const payouts = [
  { date: '2025-07-01', amount: 125.0 },
  { date: '2025-07-03', amount: 900.0 },
  { date: '2025-07-05', amount: 1250.0 },
];

export default function WorkerPayoutDashboard() {
  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.heading}>💰 Payout History</h1>
      </header>

      <section aria-labelledby="payouts-table-caption">
        {payouts.length === 0 ? (
          <p role="status" style={styles.empty}>
            No payout records available.
          </p>
        ) : (
          <table style={styles.table}>
            <caption id="payouts-table-caption" style={styles.caption}>
              Your recent payout history with dates and amounts
            </caption>
            <thead>
              <tr>
                <th scope="col" style={styles.th}>
                  Date
                </th>
                <th scope="col" style={styles.th}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{payout.date}</td>
                  <td style={styles.td}>
                    {payout.amount.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 'var(--container-max)',
    margin: 'var(--space-lg) auto',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--secondary)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-soft)',
  },
  heading: {
    fontSize: '1.75rem',
    color: 'var(--primary)',
    textAlign: 'center',
    marginBottom: 'var(--space-lg)',
  },
  caption: {
    textAlign: 'left',
    fontSize: '1rem',
    marginBottom: 'var(--space-md)',
    color: 'var(--text)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    borderBottom: '2px solid var(--primary)',
    padding: 'var(--space-sm) var(--space-md)',
    color: 'var(--primary-dark)',
  },
  td: {
    padding: 'var(--space-sm) var(--space-md)',
    borderBottom: '1px solid var(--secondary)',
    color: 'var(--text)',
  },
  empty: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'var(--text)',
  },
};
