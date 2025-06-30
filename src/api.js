// api.js

// Replace this with your live backend URL
const BASE_URL = "https://whosenext-4-fh9z.onrender.com";

// --- 1. Wellness Check-in ---
export async function sendCheckin(message) {
  try {
    const response = await fetch(`${BASE_URL}/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Failed to send check-in");
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error during check-in:", error);
    return { error: "Check-in failed." };
  }
}

// --- 2. Track Order ---
export async function trackOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/track-order/${orderId}`);
    if (!response.ok) throw new Error("Failed to fetch order status");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    return { error: "Failed to fetch order status." };
  }
}

// --- 3. Rate Worker ---
export async function rateWorker(workerId, rating, review) {
  try {
    const response = await fetch(`${BASE_URL}/rate-worker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ worker_id: workerId, rating, review }),
    });

    if (!response.ok) throw new Error("Failed to submit rating");
    return await response.json();
  } catch (error) {
    console.error("Error submitting rating:", error);
    return { error: "Rating submission failed." };
  }
}

// --- 4. Cancel Order ---
export async function cancelOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/cancel-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: orderId }),
    });

    if (!response.ok) throw new Error("Failed to cancel order");
    return await response.json();
  } catch (error) {
    console.error("Error canceling order:", error);
    return { error: "Cancellation failed." };
  }
}

// --- 5. Complete Delivery + Payout ---
export async function completeDelivery(orderId, driverAccountId, driverPercentage, companyPercentage) {
  try {
    const response = await fetch(`${BASE_URL}/complete-delivery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        driver_account_id: driverAccountId,
        driver_percentage: driverPercentage,
        company_percentage: companyPercentage,
      }),
    });

    if (!response.ok) throw new Error("Failed to complete delivery");
    return await response.json();
  } catch (error) {
    console.error("Error completing delivery:", error);
    return { error: "Delivery completion failed." };
  }
}

// --- 6. Get Menu for Store ---
export async function getMenu(storeName) {
  try {
    const response = await fetch(`${BASE_URL}/menu/${encodeURIComponent(storeName)}`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { error: "Menu fetch failed." };
  }
}

// --- 7. Submit Customer Support Request ---
export async function submitSupport(message) {
  try {
    const response = await fetch(`${BASE_URL}/support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Failed to submit support request");
    return await response.json();
  } catch (error) {
    console.error("Error submitting support:", error);
    return { error: "Support submission failed." };
  }
}

// --- 8. Place Customer Order ---
export async function placeOrder(orderDetails) {
  try {
    const response = await fetch(`${BASE_URL}/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) throw new Error("Failed to place order");
    return await response.json();
  } catch (error) {
    console.error("Error placing order:", error);
    return { error: "Order placement failed." };
  }
}
