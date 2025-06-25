// api.js

// Replace with your live backend URL
const BASE_URL = "https://whosenxt-backend.onrender.com";  // Live backend URL

// Example function to send check-in message
export async function sendCheckin(message) {
  try {
    const response = await fetch(`${BASE_URL}/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    return data.reply;  // Assuming backend sends a reply
  } catch (error) {
    console.error('Error during check-in:', error);
    return { error: 'Check-in failed.' };
  }
}

// Example function to track an order
export async function trackOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/track-order/${orderId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    return { error: 'Failed to fetch order status.' };
  }
}

// Example function to rate a worker
export async function rateWorker(workerId, rating, review) {
  try {
    const response = await fetch(`${BASE_URL}/rate-worker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        worker_id: workerId,
        rating: rating,
        review: review,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { error: 'Rating submission failed.' };
  }
}

// Example function to cancel an order
export async function cancelOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/cancel-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_id: orderId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling order:', error);
    return { error: 'Cancellation failed.' };
  }
}

// Example function to complete the delivery and payout the driver
export async function completeDelivery(orderId, driverAccountId, driverPercentage, companyPercentage) {
  try {
    const response = await fetch(`${BASE_URL}/complete-delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        driver_account_id: driverAccountId,
        driver_percentage: driverPercentage,
        company_percentage: companyPercentage,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error completing delivery:', error);
    return { error: 'Delivery completion failed.' };
  }
}
