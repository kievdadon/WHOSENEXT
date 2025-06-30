import logging
import sqlite3
import stripe
from flask import Flask, request, jsonify
import os
from datetime import datetime
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

# Stripe config
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# Initialize SQLite DB
def init_db():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                status TEXT,
                payment_intent_id TEXT,
                total_amount REAL,
                delivery_time TEXT
            )
        """)
        c.execute("""
            CREATE TABLE IF NOT EXISTS worker_ratings (
                id INTEGER PRIMARY KEY,
                worker_id INTEGER,
                rating INTEGER,
                review TEXT,
                timestamp TEXT
            )
        """)
        c.execute("""
            CREATE TABLE IF NOT EXISTS support_requests (
                id INTEGER PRIMARY KEY,
                message TEXT,
                timestamp TEXT
            )
        """)
        conn.commit()

init_db()

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.get_json()
    message = data.get("message")
    return jsonify({"reply": f"Check-in received: {message}"})

@app.route("/track-order/<int:order_id>", methods=["GET"])
def track_order(order_id):
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT status FROM orders WHERE id = ?", (order_id,))
        result = c.fetchone()
        if result:
            return jsonify({"status": result[0]})
        return jsonify({"error": "Order not found"}), 404

@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    data = request.get_json()
    worker_id = data.get("worker_id")
    rating = data.get("rating")
    review = data.get("review")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO worker_ratings (worker_id, rating, review, timestamp) VALUES (?, ?, ?, ?)",
                  (worker_id, rating, review, datetime.now()))
        conn.commit()
    return jsonify({"message": "Rating submitted successfully!"})

@app.route("/cancel-order", methods=["POST"])
def cancel_order():
    data = request.get_json()
    order_id = data.get("order_id")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT payment_intent_id, status FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()
        if order and order[1] == "pending":
            c.execute("UPDATE orders SET status = 'canceled' WHERE id = ?", (order_id,))
            conn.commit()
            try:
                refund = stripe.Refund.create(payment_intent=order[0])
                return jsonify({"message": "Order canceled and refunded.", "refund": refund})
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        return jsonify({"error": "Order cannot be canceled."}), 400

@app.route("/complete-delivery", methods=["POST"])
def complete_delivery():
    data = request.get_json()
    order_id = data["order_id"]
    driver_account_id = data["driver_account_id"]
    driver_percentage = data["driver_percentage"]
    company_percentage = data["company_percentage"]

    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT total_amount, payment_intent_id FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()
        if order:
            total_amount = order[0]
            driver_cut = int(total_amount * driver_percentage)
            company_cut = int(total_amount * company_percentage)
            try:
                stripe.Payout.create(amount=driver_cut, currency="usd", destination=driver_account_id)
                return jsonify({"message": "Delivery completed and driver paid.", "driver_cut": driver_cut, "company_cut": company_cut})
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        return jsonify({"error": "Order not found."}), 404

@app.route("/menu/<store_name>", methods=["GET"])
def get_menu(store_name):
    sample_menus = {
        "Walmart": [
            {"name": "Apples", "price": 1.29, "imageUrl": "https://via.placeholder.com/150?text=Apple"},
            {"name": "Shampoo", "price": 3.99, "imageUrl": "https://via.placeholder.com/150?text=Shampoo"}
        ],
        "Popeyes": [
            {"name": "Spicy Chicken Sandwich", "price": 5.99, "imageUrl": "https://via.placeholder.com/150?text=Chicken+Sandwich"},
            {"name": "Fries", "price": 2.49, "imageUrl": "https://via.placeholder.com/150?text=Fries"}
        ]
    }
    return jsonify({"menu": sample_menus.get(store_name, [])})

@app.route("/support", methods=["POST"])
def support():
    data = request.get_json()
    message = data.get("message")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO support_requests (message, timestamp) VALUES (?, ?)",
                  (message, datetime.now()))
        conn.commit()
    return jsonify({"message": "Support request received!"})

@app.route("/place-order", methods=["POST"])
def place_order():
    data = request.get_json()
    # This would contain logic to process orders, save to DB, etc.
    return jsonify({"message": "Order placed successfully.", "details": data})

if __name__ == "__main__":
    app.run(debug=True)
