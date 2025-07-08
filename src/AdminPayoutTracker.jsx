// AdminPayoutTracker.jsx
import React, { useState, useEffect } from 'react';
import { fetchAllPayouts, updatePayoutStatus } from './api';

export default function AdminPayoutTracker() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayouts() {
      try {
        const all = await fetchAllPayouts();
        setPayouts(all);
      } catch (err) {
        console.error('Fetch payouts failed:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPayouts();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePayoutStatus(id, newStatus);
      setPayouts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error('Update payout failed:', err);
    }
  };

  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.heading}>Payout Tracker</h1>
      </header>

      <section aria-labelledby="payouts-heading">
        {loading ? (
          <p role="status" style={styles.loading}>Loading payouts…</p>
        ) : payouts.length === 0 ? (
          <p role="alert" style={styles.empty}>No payouts to display.</p>
        ) : (
          <table style={styles.table}>
            <caption id="payouts-heading" style={styles.caption}>
              All driver payouts and their statuses
            </caption>
            <thead>
              <tr>
                <th scope="col" style={styles.th}>ID</th>
                <th scope="col" style={styles.th}>Driver</th>
                <th scope="col" style={styles.th}>Amount</th>
                <th scope="col" style={styles.th}>Date</th>
                <th scope="col" style={styles.th}>Status</th>
                <th scope="col" style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.driverName}</td>
                  <td style={styles.td}>${p.amount.toFixed(2)}</td>
                  <td style={styles.td}>{p.date}</td>
                  <td style={styles.td}>{p.status}</td>
                  <td style={styles.td}>
                    {p.status !== 'Paid' && (
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => handleStatusChange(p.id, 'Paid')}
                      >
                        Mark Paid
                      </button>
                    )}
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
    padding: 'var(--space-lg)',
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    color: 'var(--primary)',
    textAlign: 'center',
    marginBottom: 'var(--space-lg)',
  },
  loading: { textAlign: 'center', fontStyle: 'italic' },
  empty: { textAlign: 'center', fontStyle: 'italic' },
  caption: {
    captionSide: 'top',
    textAlign: 'left',
    fontSize: '1rem',
    marginBottom: 'var(--space-sm)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    padding: 'var(--space-sm) var(--space-md)',
    textAlign: 'left',
  },
  td: {
    padding: 'var(--space-sm) var(--space-md)',
    borderBottom: '1px solid var(--secondary)',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    border: 'none',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};
