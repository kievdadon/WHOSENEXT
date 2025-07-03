const BASE_URL = "https://whosenext-4-fh9z.onrender.com"; // your backend

export async function getMenu(storeName) {
  try {
    const response = await fetch(`${BASE_URL}/api/menu/${storeName}`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { menu: [] };
  }
}

export async function sendCheckin(message) {
  try {
    const res = await fetch(`${BASE_URL}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    return await res.json();
  } catch (err) {
    console.error("Check-in error:", err);
    return { error: "Check-in failed" };
  }
}

export async function trackOrder(orderId) {
  try {
    const res = await fetch(`${BASE_URL}/track-order/${orderId}`);
    return await res.json();
  } catch (err) {
    console.error("Track order error:", err);
    return { error: "Tracking failed" };
  }
}

export async function rateWorker(workerId, rating, review) {
  try {
    const res = await fetch(`${BASE_URL}/rate-worker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ worker_id: workerId, rating, review })
    });
    return await res.json();
  } catch (err) {
    console.error("Rate worker error:", err);
    return { error: "Rating failed" };
  }
}

export async function cancelOrder(orderId) {
  try {
    const res = await fetch(`${BASE_URL}/cancel-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId })
    });
    return await res.json();
  } catch (err) {
    console.error("Cancel order error:", err);
    return { error: "Cancellation failed" };
  }
}

export async function completeDelivery(orderId, driverAccountId, driverPercentage, companyPercentage) {
  try {
    const res = await fetch(`${BASE_URL}/complete-delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        driver_account_id: driverAccountId,
        driver_percentage: driverPercentage,
        company_percentage: companyPercentage,
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Complete delivery error:", err);
    return { error: "Delivery completion failed" };
  }
}
