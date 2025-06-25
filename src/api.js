const BASE_URL = "http://localhost:5000";  // Change to your live backend URL when deployed

export async function submitSupportRequest(message) {
  const res = await fetch(`${BASE_URL}/support`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return await res.json();
}
