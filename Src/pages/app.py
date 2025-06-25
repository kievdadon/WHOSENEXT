import logging
import sqlite3
import stripe
from flask import Flask, request, jsonify
import os
from datetime import datetime
from flask_cors import CORS

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all domains
CORS(app)

# Set your Stripe secret key
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


# ----- DATABASE SETUP -----
def init_db():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        # Create orders table to track orders
        c.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                status TEXT,  # "pending", "completed", etc.
                payment_intent_id TEXT,
                total_amount REAL,
                delivery_time TEXT
            )
        """)
        # Create worker_ratings table for storing ratings for workers
        c.execute("""
            CREATE TABLE IF NOT EXISTS worker_ratings (
                id INTEGER PRIMARY KEY,
                worker_id INTEGER,
                rating INTEGER,
                review TEXT,
                timestamp TEXT
            )
        """)
        # Create support_requests table for storing customer issues
        c.execute("""
            CREATE TABLE IF NOT EXISTS support_requests (
                id INTEGER PRIMARY KEY,
                message TEXT,
                timestamp TEXT
            )
        """)
        conn.commit()


# ----- Refunds and Cancellations -----
@app.route("/cancel-order", methods=["POST"])
def cancel_order():
    order_id = request.json.get("order_id")
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT payment_intent_id, status FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()

        if order and order[1] == "pending":
            # Update order status to canceled
            c.execute("UPDATE orders SET status = ? WHERE id = ?", ("canceled", order_id))
            conn.commit()

            # Issue refund through Stripe
            refund = refund_payment(order[0])  # payment_intent_id is in the first column
            return jsonify({"message": "Order canceled and refunded.", "refund": refund})

        return jsonify({"error": "Order cannot be canceled."}), 400


def refund_payment(payment_intent_id):
    try:
        refund = stripe.Refund.create(payment_intent=payment_intent_id)
        return refund
    except Exception as e:
        return {"error": str(e)}


# ----- Order Tracking -----
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


# ----- Worker Ratings -----
@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    data = request.json
    worker_id = data["worker_id"]
    rating = data["rating"]
    review = data["review"]

    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO worker_ratings (worker_id, rating, review, timestamp) VALUES (?, ?, ?, ?)",
                  (worker_id, rating, review, datetime.now()))
        conn.commit()

    return jsonify({"message": "Rating submitted successfully!"})


# ----- Customer Support -----
@app.route("/support", methods=["POST"])
def support():
    data = request.json
    user_message = data.get("message")

    # Save support request to database
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO support_requests (message, timestamp) VALUES (?, ?)",
                  (user_message, datetime.now()))
        conn.commit()

    return jsonify({"message": "Support request received!"})


# ----- Stripe Payouts -----
def payout_to_driver(driver_account_id, amount):
    try:
        # Trigger a payout to the driver’s connected account
        payout = stripe.Payout.create(
            amount=amount,  # In cents (e.g., $10 = 1000 cents)
            currency="usd",
            destination=driver_account_id,
        )
        return payout
    except stripe.error.StripeError as e:
        return {"error": str(e)}

@app.route("/complete-delivery", methods=["POST"])
def complete_delivery():
    data = request.json
    order_id = data["order_id"]
    driver_account_id = data["driver_account_id"]
    driver_percentage = data["driver_percentage"]  # e.g., 0.7 (70% for the driver)
    company_percentage = data["company_percentage"]  # e.g., 0.2 (20% for the company)

    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT total_amount, payment_intent_id FROM orders WHERE id = ?", (order_id,))
        order = c.fetchone()

        if order:
            total_amount = order[0]
            driver_cut = int(total_amount * driver_percentage)
            # Company keeps the rest (e.g., 30%)
            company_cut = int(total_amount * company_percentage)

            # Issue payment to the driver
            payout_to_driver(driver_account_id, driver_cut)

            # Optionally, handle payment to the company here
            # For example, you can transfer funds to the company's account

            return jsonify({"message": "Delivery completed and driver paid.", "driver_cut": driver_cut, "company_cut": company_cut})

        return jsonify({"error": "Order not found."}), 404


if __name__ == "__main__":
    app.logger.debug('Flask app starting')
    app.run(debug=True)
