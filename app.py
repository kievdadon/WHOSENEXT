```python
# === app.py ===
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Home route for basic health check
@app.route("/")
def home():
    return "WHOSENXT backend is running!"

# Menu endpoint with support for multiple store types
@app.route("/api/menu/<store>", methods=["GET"])
def get_menu(store):
    mock_menus = {
        "Walmart": [
            {"name": "Bananas", "price": 1.49, "imageUrl": "https://via.placeholder.com/150?text=Bananas", "category": "Food"},
            {"name": "Air Fryer", "price": 79.99, "imageUrl": "https://via.placeholder.com/150?text=Air+Fryer", "category": "Appliances"},
            {"name": "T-Shirt", "price": 12.99, "imageUrl": "https://via.placeholder.com/150?text=T-Shirt", "category": "Clothing"},
        ],
        "McDonald's": [
            {"name": "Big Mac", "price": 5.99, "imageUrl": "https://via.placeholder.com/150?text=Big+Mac", "category": "Food"},
            {"name": "Fries", "price": 2.49, "imageUrl": "https://via.placeholder.com/150?text=Fries", "category": "Food"},
        ],
        "Sonic": [
            {"name": "Cherry Limeade", "price": 2.99, "imageUrl": "https://via.placeholder.com/150?text=Limeade", "category": "Food"},
            {"name": "Hot Dog", "price": 3.49, "imageUrl": "https://via.placeholder.com/150?text=Hot+Dog", "category": "Food"},
        ],
        "Hollister": [
            {"name": "Slim Jeans", "price": 39.99, "imageUrl": "https://via.placeholder.com/150?text=Slim+Jeans", "category": "Clothing"},
            {"name": "Graphic Tee", "price": 19.99, "imageUrl": "https://via.placeholder.com/150?text=Graphic+Tee", "category": "Clothing"},
        ],
    }
    return jsonify({"menu": mock_menus.get(store, [])})

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.get_json()
    message = data.get("message")
    return jsonify({"reply": f"Thanks for checking in! You said: {message}"})

@app.route("/track-order/<order_id>", methods=["GET"])
def track_order(order_id):
    return jsonify({"order_id": order_id, "status": "In Transit", "estimated_time": "30 minutes"})

@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    data = request.get_json()
    return jsonify({"message": "Rating submitted successfully."})

@app.route("/cancel-order", methods=["POST"])
def cancel_order():
    data = request.get_json()
    return jsonify({"message": f"Order {data.get('order_id')} cancelled successfully."})

@app.route("/complete-delivery", methods=["POST"])
def complete_delivery():
    data = request.get_json()
    return jsonify({"message": "Delivery completed and payout processed."})

if __name__ == "__main__":
    app.run(debug=True)
```

```javascript
// === api.js ===
const BASE_URL = "https://whosenext-4-fh9z.onrender.com";

export async function getMenu(storeName) {
    try {
        const response = await fetch(BASE_URL + "/api/menu/" + storeName);
        if (!response.ok) throw new Error("Failed to fetch menu");
        return await response.json();
    } catch (error) {
        console.error("Error fetching menu:", error);
        return { menu: [] };
    }
}

export async function sendCheckin(message) {
    try {
        const res = await fetch(BASE_URL + "/checkin", {
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
        const res = await fetch(BASE_URL + "/track-order/" + orderId);
        return await res.json();
    } catch (err) {
        console.error("Track order error:", err);
        return { error: "Tracking failed" };
    }
}

export async function rateWorker(workerId, rating, review) {
    try {
        const res = await fetch(BASE_URL + "/rate-worker", {
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
        const res = await fetch(BASE_URL + "/cancel-order", {
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
        const res = await fetch(BASE_URL + "/complete-delivery", {
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
```
