from flask import Flask, jsonify, request
from flask_cors import CORS
import csv, io, os, json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "WHOSENXT backend is running!"

# Upload store inventory CSV and logo
@app.route("/api/upload-store", methods=["POST"])
def upload_store():
    store_name = request.form.get("store_name")
    logo = request.files.get("logo")
    csv_file = request.files.get("csv")

    if not store_name or not csv_file:
        return jsonify({"error": "Missing required fields"}), 400

    logo_url = None
    if logo:
        logo_path = os.path.join(UPLOAD_FOLDER, f"{store_name}_logo.png")
        logo.save(logo_path)
        logo_url = f"/static/{store_name}_logo.png"

    stream = io.StringIO(csv_file.stream.read().decode("UTF8"), newline=None)
    reader = csv.DictReader(stream)

    items = []
    for row in reader:
        items.append({
            "name": row.get("item_name"),
            "price": float(row.get("price", 0)),
            "category": row.get("category", "General"),
            "imageUrl": row.get("image_url", "")
        })

    data = {
        "store": store_name,
        "logo": logo_url,
        "menu": items
    }

    with open(f"{UPLOAD_FOLDER}/{store_name}.json", "w") as f:
        json.dump(data, f)

    return jsonify({"message": f"{store_name} uploaded successfully!"})

# Retrieve menu for a given store
@app.route("/api/menu/<store>", methods=["GET"])
def get_menu(store):
    try:
        with open(f"{UPLOAD_FOLDER}/{store}.json", "r") as f:
            return jsonify(json.load(f))
    except FileNotFoundError:
        return jsonify({"menu": [], "error": "Store not found"}), 404

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.get_json()
    return jsonify({"reply": f"Thanks for checking in! You said: {data.get('message')}"})

@app.route("/track-order/<order_id>", methods=["GET"])
def track_order(order_id):
    return jsonify({"order_id": order_id, "status": "In Transit", "estimated_time": "30 minutes"})

@app.route("/rate-worker", methods=["POST"])
def rate_worker():
    return jsonify({"message": "Rating submitted successfully."})

@app.route("/cancel-order", methods=["POST"])
def cancel_order():
    data = request.get_json()
    return jsonify({"message": f"Order {data.get('order_id')} cancelled successfully."})

@app.route("/complete-delivery", methods=["POST"])
def complete_delivery():
    return jsonify({"message": "Delivery completed and payout processed."})

if __name__ == "__main__":
    app.run(debug=True)
