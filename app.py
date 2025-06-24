from flask import Flask, request, jsonify
import os
import stripe
import sqlite3
from datetime import datetime

app = Flask(__name__)
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# 👇 Add this homepage route right below
@app.route("/")
def home():
    return "<h1>Welcome to WHOSENXT 👋</h1><p>Your digital life assistant is live!</p>"

# Keep all your existing routes below here
@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    # Your existing code...
    pass

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# ----- DATABASE SETUP -----
def init_db():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        # Payout table
        c.execute("CREATE TABLE IF NOT EXISTS payouts (id INTEGER PRIMARY KEY, worker TEXT, amount REAL, date TEXT)")
        # Gig table
        c.execute("CREATE TABLE IF NOT EXISTS gigs (id INTEGER PRIMARY KEY, title TEXT, description TEXT, required_exp TEXT)")
        # Marketplace table
        c.execute("CREATE TABLE IF NOT EXISTS marketplace (id INTEGER PRIMARY KEY, item TEXT, price REAL, image TEXT)")
        # Family messages
        c.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, user TEXT, message TEXT, timestamp TEXT)")
        # Location sharing
        c.execute("CREATE TABLE IF NOT EXISTS locations (user TEXT PRIMARY KEY, lat REAL, lon REAL, enabled INTEGER)")
init_db()

# ----- STRIPE -----
@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    try:
        data = request.get_json()
        amount = data.get("amount")
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return jsonify({"clientSecret": intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 400

# ----- GIG SYSTEM -----
@app.route("/post-gig", methods=["POST"])
def post_gig():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO gigs (title, description, required_exp) VALUES (?, ?, ?)",
                  (data['title'], data['description'], data['required_exp']))
        conn.commit()
    return jsonify({"message": "Gig posted."})

# ----- MARKETPLACE -----
@app.route("/post-item", methods=["POST"])
def post_item():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO marketplace (item, price, image) VALUES (?, ?, ?)",
                  (data['item'], data['price'], data['image']))
        conn.commit()
    return jsonify({"message": "Item listed."})

# ----- PAYOUT HISTORY -----
@app.route("/log-payout", methods=["POST"])
def log_payout():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO payouts (worker, amount, date) VALUES (?, ?, ?)",
                  (data['worker'], data['amount'], data['date']))
        conn.commit()
    return jsonify({"message": "Payout logged."})

@app.route("/get-payouts", methods=["GET"])
def get_payouts():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM payouts ORDER BY id DESC")
        rows = c.fetchall()
        return jsonify([{"worker": r[1], "amount": r[2], "date": r[3]} for r in rows])

# ----- FAMILY CHAT -----
@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    timestamp = datetime.utcnow().isoformat()
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO messages (user, message, timestamp) VALUES (?, ?, ?)",
                  (data['user'], data['message'], timestamp))
        conn.commit()
    return jsonify({"message": "Message sent!"})

@app.route('/get-messages', methods=['GET'])
def get_messages():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT user, message, timestamp FROM messages ORDER BY id DESC LIMIT 50")
        return jsonify([{"user": r[0], "message": r[1], "timestamp": r[2]} for r in c.fetchall()])

# ----- LOCATION SHARING -----
@app.route('/update-location', methods=['POST'])
def update_location():
    data = request.json
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("""
            INSERT INTO locations (user, lat, lon, enabled)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user) DO UPDATE SET lat=excluded.lat, lon=excluded.lon, enabled=excluded.enabled
        """, (data['user'], data['lat'], data['lon'], int(data['enabled'])))
        conn.commit()
    return jsonify({"message": "Location updated"})

@app.route('/get-locations', methods=['GET'])
def get_locations():
    with sqlite3.connect("whosenxt.db") as conn:
        c = conn.cursor()
        c.execute("SELECT user, lat, lon FROM locations WHERE enabled = 1")
        return jsonify([{"user": r[0], "lat": r[1], "lon": r[2]} for r in c.fetchall()])

# ----- MAIN -----
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
