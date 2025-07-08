// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchAdminSummary, fetchRecentOrders } from './api';

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    activeDrivers: 0,
    pendingPayouts: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const sum = await fetchAdminSummary();
        const rec = await fetchRecentOrders();
        setSummary({
          totalOrders: sum.totalOrders,
          activeDrivers: sum.activeDrivers,
          pendingPayouts: sum.pendingPayouts,
        });
        setOrders(rec);
      } catch (err) {
        console.error('Admin load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.heading}>Admin Dashboard</h1>
      </header>

      {/* Summary Cards */}
      <section
        aria-label="Quick stats"
        style={styles.summaryGrid}
      >
        <div role="region" aria-labelledby="lbl-orders" style={styles.card}>
          <div id="lbl-orders" style={styles.cardTitle}>Total Orders</div>
          <div style={styles.cardValue}>
            {loading ? '—' : summary.totalOrders}
          </div>
        </div>
        <div role="region" aria-labelledby="lbl-drivers" style={styles.card}>
          <div id="lbl-drivers" style={styles.cardTitle}>Active Drivers</div>
          <div style={styles.cardValue}>
            {loading ? '—' : summary.activeDrivers}
          </div>
        </div>
        <div role="region" aria-labelledby="lbl-payouts" style={styles.card}>
          <div id="lbl-payouts" style={styles.cardTitle}>Pending Payouts</div>
          <div style={styles.cardValue}>
            {loading ? '—' : `$${summary.pendingPayouts.toFixed(2)}`}
          </div>
        </div>
      </section>

      {/* Recent Orders Table */}
      <section aria-labelledby="recent-orders-heading" style={{ marginTop: 'var(--space-lg)' }}>
        <h2 id="recent-orders-heading" style={styles.subheading}>
          Recent Orders
        </h2>

        {loading ? (
          <p role="status" style={styles.loading}>Loading…</p>
        ) : (
          <table style={styles.table}>
            <caption style={styles.caption}>
              Latest orders with status and amounts
            </caption>
            <thead>
              <tr>
                <th scope="col" style={styles.th}>Order ID</th>
                <th scope="col" style={styles.th}>Customer</th>
                <th scope="col" style={styles.th}>Driver</th>
                <th scope="col" style={styles.th}>Status</th>
                <th scope="col" style={styles.th}>Amount</th>
                <th scope="col" style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={styles.td}>{o.id}</td>
                  <td style={styles.td}>{o.customer}</td>
                  <td style={styles.td}>{o.driver || '—'}</td>
                  <td style={styles.td}>{o.status}</td>
                  <td style={styles.td}>${o.amount.toFixed(2)}</td>
                  <td style={styles.td}>{o.date}</td>
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
    marginBottom: 'var(--space-lg)',
    textAlign: 'center',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
    gap: 'var(--space-md)',
  },
  card: {
    backgroundColor: 'var(--secondary)',
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-soft)',
  },
  cardTitle: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    marginBottom: 'var(--space-sm)',
  },
  cardValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '1.5rem',
    color: 'var(--primary)',
    marginBottom: 'var(--space-md)',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
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
};
