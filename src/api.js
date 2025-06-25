const BASE_URL = "http://localhost:5000"; // change to your Render URL when deploying

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
import Payment from "./pages/Payment"; // ⬅️ add this to the imports

// Add a Route:
<Route path="/payment" element={<Payment />} />
