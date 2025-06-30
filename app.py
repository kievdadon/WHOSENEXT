import logging
import sqlite3
import stripe
from flask import Flask, request, jsonify
import os
from datetime import datetime
from flask_cors import CORS

# Logging setup
logging.basicConfig(level=logging.DEBUG)

# Flask app initialization
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Stripe setup
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# Sample menu data per store (replace with real DB logic if needed)
store_menus = {
    "Walmart": [
        {"name": "Apple", "price": 0.99, "imageUrl": "https://via.placeholder.com/150?text=Apple"},
        {"name": "Microwave", "price": 89.99, "imageUrl": "https://via.placeholder.com/150?text=Microwave"},
    ],
    "Popeyes": [
        {"name": "Chicken Sandwich", "price": 5.49, "imageUrl": "https://via.placeholder.com/150?text=Chicken+Sandwich"},
        {"name": "Fries", "price": 2.99, "imageUrl": "https://via.placeholder.com/150?text=Fries"},
    ],
    "McDonald's": [
        {"name": "Big Mac", "price": 4.99, "imageUrl": "https://via.placeholder.com/150?text=Big+Mac"},
        {"name": "McFlurry", "price": 3.49, "imageUrl": "https://via.placeholder.com/150?text=McFlurry"},
    ],
    "Sonic": [
        {"name": "Hot Dog", "price": 3.25, "imageUrl": "https://via.placeholder.com/150?text=Hot+Dog"},
        {"name": "Slushie", "price": 2.75, "imageUrl": "https://via.placeholder.com/150?text=Slushie"},
    ],
    "Kim's Wings": [
        {"name": "10pc Wings", "price": 9.99, "imageUrl": "https://via.placeholder.com/150?text=10pc+Wings"},
        {"name": "Fries", "price": 2.99, "imageUrl": "https://via.placeholder.com/150?text=Fries"},
    ],
}

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/menu/<store_name>")
def get_menu(store_name):
    store = store_name.strip().title()
    if store in store_menus:
        return jsonify({"menu": store_menus[store]})
    else:
        return jsonify({"error": "Store not found"}), 404

@app.route("/cancel-order", methods=["POST"])
def cancel_order():
    order_id = request.json.get("order_id")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT payment_intent_id, status FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()
        if order and order[1] == "pending":
            c.execute("UPDATE orders SET status = ? WHERE id = ?", ("canceled", order_id))
            conn.commit()
            refund = refund_payment(order[0])
            return jsonify({"message": "Order canceled and refunded.", "refund": refund})
        return jsonify({"error": "Order cannot be canceled."}), 400

def refund_payment(payment_intent_id):
    try:
        refund = stripe.Refund.create(payment_intent=payment_intent_id)
        return refund
    except Exception as e:
        return {"error": str(e)}

@app.route("/track-order/<int:order_id>", methods=["GET"])
def track_order(order_id):
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT status FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()
        if order:
            return jsonify({"status": order[0]})
        else:
            return jsonify({"error": "Order not found"}), 404

@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO worker_ratings (worker_id, rating, review, timestamp) VALUES (?, ?, ?, ?)",
                  (data["worker_id"], data["rating"], data["review"], datetime.now()))
        conn.commit()
    return jsonify({"message": "Rating submitted successfully!"})

@app.route("/support", methods=["POST"])
def support():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO support_requests (message, timestamp) VALUES (?, ?)",
                  (data.get("message"), datetime.now()))
        conn.commit()
    return jsonify({"message": "Support request received!"})

def payout_to_driver(driver_account_id, amount):
    try:
        payout = stripe.Payout.create(
            amount=amount,
            currency="usd",
            destination=driver_account_id,
        )
        return payout
    except stripe.error.StripeError as e:
        return {"error": str(e)}

@app.route("/complete-delivery", methods=["POST"])
def complete_delivery():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT total_amount, payment_intent_id FROM orders WHERE id = ?", (data["order_id"],))
        order = c.fetchone()
        if order:
            total = order[0]
            driver_cut = int(total * data["driver_percentage"])
            company_cut = int(total * data["company_percentage"])
            payout_to_driver(data["driver_account_id"], driver_cut)
            return jsonify({"message": "Delivery complete and driver paid.", "driver_cut": driver_cut, "company_cut": company_cut})
        return jsonify({"error": "Order not found."}), 404

if __name__ == "__main__":
    app.run(debug=True)
