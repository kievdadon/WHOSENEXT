document.addEventListener('DOMContentLoaded', () => {
  /* Theme Toggle */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      themeBtn.setAttribute('aria-pressed', isDark);
      themeBtn.setAttribute(
        'aria-label',
        isDark ? 'Activate light mode' : 'Activate dark mode'
      );
    });
  }

  /* Gig Distance Calculator */
  const form = document.getElementById('distance-form');
  if (form) {
    const btn = document.getElementById('calculate-btn');
    const results = document.getElementById('results');
    const distEl = document.getElementById('distance_result');
    const payEl = document.getElementById('payout_result');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = 'Calculating…';

      const origin = document
        .getElementById('worker_location')
        .value.trim();
      const destination = document
        .getElementById('customer_location')
        .innerText;

      try {
        const res = await fetch(
          `/distance?origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}`
        );
        const data = await res.json();

        distEl.innerText = data.distance_text;
        payEl.innerText = `$${data.total_payment.toFixed(2)}`;
        results.hidden = false;
      } catch (err) {
        alert('Error fetching distance. Please try again.');
        console.error(err);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Calculate Distance';
      }
    });
  }
});

