const BASE_URL = "http://localhost:5000"; // Change to your backend URL when deployed

export async function postGig(gigData) {
  const res = await fetch(`${BASE_URL}/post-gig`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gigData),
  });
  return await res.json();
}

export async function createPayment(amount) {
  const res = await fetch(`${BASE_URL}/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return await res.json();
}

// Add more functions as needed (post/store/list, check-in, etc.)

