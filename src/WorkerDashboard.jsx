// WorkerDashboard.jsx
import React from 'react';

const sampleGigs = [
  { id: 'G123', title: 'Deliver groceries', status: 'In Progress' },
  { id: 'G124', title: 'Move sofa', status: 'Pending' },
];

export default function WorkerDashboard() {
  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.heading}>WHOSENXT Job Dashboard</h1>
      </header>

      <section aria-labelledby="gigs-heading">
        <h2 id="gigs-heading" className="visually-hidden">
          Your Active Gigs
        </h2>

        {sampleGigs.length === 0 ? (
          <p role="status" style={styles.empty}>
            No gigs assigned right now.
          </p>
        ) : (
          <ul style={styles.list} role="list">
            {sampleGigs.map((gig) => (
              <li key={gig.id}>
                <article style={styles.card}>
                  <h3 style={styles.title}>{gig.title}</h3>
                  <p style={styles.text}>
                    Status: <strong>{gig.status}</strong>
                  </p>
                  <p style={styles.text}>
                    Gig ID: <code style={styles.code}>{gig.id}</code>
                  </p>
                  <button type="button" style={styles.button}>
                    View Details
                  </button>
                </article>
              </li>
            ))}
          </ul>
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
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 'var(--space-md)',
  },
  card: {
    background: 'var(--secondary)',
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-soft)',
    transition: 'background 0.3s',
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: 'var(--space-sm)',
    color: 'var(--text)',
  },
  text: {
    marginBottom: 'var(--space-sm)',
    color: 'var(--text)',
  },
  code: {
    fontFamily: 'monospace',
    background: 'rgba(0,0,0,0.05)',
    padding: '0 var(--space-sm)',
    borderRadius: 'var(--radius)',
  },
  button: {
    marginTop: 'var(--space-md)',
    backgroundColor: 'var(--primary)',
    color: 'var(--color-white)',
    padding: 'var(--space-sm) var(--space-md)',
    border: 'none',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  empty: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
};
