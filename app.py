import logging
import sqlite3
import stripe
from flask import Flask, request, jsonify
import os
from datetime import datetime
from flask_cors import CORS

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

@app.route("/")
def home():
    return "WHOSENXT backend is running!"

# --- Menu Endpoint with Categories ---
@app.route("/api/menu/<store>", methods=["GET"])
def get_menu(store):
    categorized_menus = {
        "Walmart": {
            "Food": [
                {"name": "Frozen Pizza", "price": 5.99, "imageUrl": "https://via.placeholder.com/150?text=Frozen+Pizza"},
                {"name": "Rotisserie Chicken", "price": 6.49, "imageUrl": "https://via.placeholder.com/150?text=Chicken"}
            ],
            "Appliances": [
                {"name": "Toaster", "price": 24.99, "imageUrl": "https://via.placeholder.com/150?text=Toaster"},
                {"name": "Microwave", "price": 89.99, "imageUrl": "https://via.placeholder.com/150?text=Microwave"}
            ],
            "Drinks": [
                {"name": "Coca Cola (12-pack)", "price": 5.49, "imageUrl": "https://via.placeholder.com/150?text=Coke"}
            ]
        },
        "Popeyes": {
            "Food": [
                {"name": "Spicy Chicken Sandwich", "price": 4.99, "imageUrl": "https://via.placeholder.com/150?text=Chicken+Sandwich"},
                {"name": "Cajun Fries", "price": 2.99, "imageUrl": "https://via.placeholder.com/150?text=Fries"}
            ],
            "Drinks": [
                {"name": "Sweet Tea", "price": 1.99, "imageUrl": "https://via.placeholder.com/150?text=Tea"}
            ]
        },
        "McDonald's": {
            "Food": [
                {"name": "Big Mac", "price": 5.49, "imageUrl": "https://via.placeholder.com/150?text=Big+Mac"},
                {"name": "Fries", "price": 1.99, "imageUrl": "https://via.placeholder.com/150?text=Fries"}
            ],
            "Drinks": [
                {"name": "Coke", "price": 1.49, "imageUrl": "https://via.placeholder.com/150?text=Coke"}
            ]
        },
        "Kim's Wings": {
            "Food": [
                {"name": "Hot Wings (6pc)", "price": 7.99, "imageUrl": "https://via.placeholder.com/150?text=Hot+Wings"},
                {"name": "Fried Okra", "price": 3.49, "imageUrl": "https://via.placeholder.com/150?text=Okra"}
            ],
            "Drinks": [
                {"name": "Lemonade", "price": 2.49, "imageUrl": "https://via.placeholder.com/150?text=Lemonade"}
            ]
        }
    }

    return jsonify({
        "store": store,
        "categories": categorized_menus.get(store, {})
    })

# --- DATABASE SETUP ---
def init_db():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("""CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            status TEXT,
            payment_intent_id TEXT,
            total_amount REAL,
            delivery_time TEXT
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS worker_ratings (
            id INTEGER PRIMARY KEY,
            worker_id INTEGER,
            rating INTEGER,
            review TEXT,
            timestamp TEXT
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS support_requests (
            id INTEGER PRIMARY KEY,
            message TEXT,
            timestamp TEXT
        )""")
        conn.commit()

# --- CANCEL ORDER ---
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
        return stripe.Refund.create(payment_intent=payment_intent_id)
    except Exception as e:
        return {"error": str(e)}

# --- TRACK ORDER ---
@app.route("/track-order/<int:order_id>", methods=["GET"])
def track_order(order_id):
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT status FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()
        if order:
            return jsonify({"status": order[0]})
        return jsonify({"error": "Order not found"}), 404

# --- RATE WORKER ---
@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO worker_ratings (worker_id, rating, review, timestamp) VALUES (?, ?, ?, ?)",
                  (data["worker_id"], data["rating"], data["review"], datetime.now()))
        conn.commit()
    return jsonify({"message": "Rating submitted successfully!"})

# --- SUPPORT ---
@app.route("/support", methods=["POST"])
def support():
    user_message = request.json.get("message")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO support_requests (message, timestamp) VALUES (?, ?)",
                  (user_message, datetime.now()))
        conn.commit()
    return jsonify({"message": "Support request received!"})

# --- PAYOUTS ---
def payout_to_driver(driver_account_id, amount):
    try:
        return stripe.Payout.create(
            amount=amount,
            currency="usd",
            destination=driver_account_id,
        )
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
            total_amount = order[0]
            driver_cut = int(total_amount * data["driver_percentage"])
            company_cut = int(total_amount * data["company_percentage"])
            payout_to_driver(data["driver_account_id"], driver_cut)
            return jsonify({
                "message": "Delivery completed and driver paid.",
                "driver_cut": driver_cut,
                "company_cut": company_cut
            })
        return jsonify({"error": "Order not found."}), 404

# --- MAIN ---
if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
