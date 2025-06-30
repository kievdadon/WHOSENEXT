// api.js

const BASE_URL = "https://whosenext-4-fh9z.onrender.com";

export async function sendCheckin(message) {
    try {
        const response = await fetch(`${BASE_URL}/checkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            throw new Error("Failed to send check-in");
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error('Error during check-in:', error);
        return { error: 'Check-in failed.' };
    }
}

export async function trackOrder(orderId) {
    try {
        const response = await fetch(`${BASE_URL}/track-order/${orderId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch order status");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order status:', error);
        return { error: 'Failed to fetch order status.' };
    }
}

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

        if (!response.ok) {
            throw new Error("Failed to submit rating");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting rating:', error);
        return { error: 'Rating submission failed.' };
    }
}

export async function cancelOrder(orderId) {
    try {
        const response = await fetch(`${BASE_URL}/cancel-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id: orderId }),
        });

        if (!response.ok) {
            throw new Error("Failed to cancel order");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error canceling order:', error);
        return { error: 'Cancellation failed.' };
    }
}

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

        if (!response.ok) {
            throw new Error("Failed to complete delivery");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error completing delivery:', error);
        return { error: 'Delivery completion failed.' };
    }
}

export async function fetchMenu(storeName) {
    try {
        const response = await fetch(`${BASE_URL}/menu/${storeName}`);
        if (!response.ok) {
            throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        return data.menu;
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return [];
    }
}
