from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os, io, json, csv
import jwt

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = 'whosenxt-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///whosenxt.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['STATIC_FOLDER'] = 'static'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['STATIC_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# ======================== MODELS ========================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120))
    name = db.Column(db.String(120))
    is_driver = db.Column(db.Boolean, default=False)

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    logo = db.Column(db.String(300))
    menu = db.Column(db.Text)  # JSON string

class DriverApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    verified = db.Column(db.Boolean, default=False)

class FamilyMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.String(100))
    sender = db.Column(db.String(100))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# ======================== HELPERS ========================

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def decode_token(token):
    try:
        return jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return None

# ======================== ROUTES ========================

@app.route("/")
def home():
    return "WHOSENXT backend is running with full features!"

# ---------- Auth ----------
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    new_user = User(email=data['email'], password=data['password'], name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registered successfully', 'token': generate_token(new_user.id)})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401
    return jsonify({'message': 'Login successful', 'token': generate_token(user.id)})

# ---------- Store Upload ----------
@app.route("/api/upload-store", methods=["POST"])
def upload_store():
    store_name = request.form.get("store_name")
    logo = request.files.get("logo")
    csv_file = request.files.get("csv")
    if not store_name or not csv_file:
        return jsonify({"error": "Missing required fields"}), 400

    logo_url = None
    if logo:
        logo_path = os.path.join(app.config['STATIC_FOLDER'], f"{store_name}_logo.png")
        logo.save(logo_path)
        logo_url = f"/static/{store_name}_logo.png"

    stream = io.StringIO(csv_file.stream.read().decode("UTF8"), newline=None)
    reader = csv.DictReader(stream)
    items = [{"name": row["item_name"], "price": float(row["price"]), "category": row.get("category", "General"), "imageUrl": row.get("image_url", "")} for row in reader]

    store = Store(name=store_name, logo=logo_url, menu=json.dumps(items))
    db.session.add(store)
    db.session.commit()

    return jsonify({"message": f"{store_name} uploaded successfully!"})

# ---------- Store Retrieval ----------
@app.route("/api/stores", methods=["GET"])
def get_stores():
    stores = Store.query.all()
    hour = datetime.now().hour
    return jsonify({
        "stores": [{
            "name": s.name,
            "logo": s.logo,
            "category": "Food",
            "isOpen": 8 <= hour <= 21
        } for s in stores]
    })

@app.route("/api/menu/<store_name>", methods=["GET"])
def get_menu(store_name):
    store = Store.query.filter_by(name=store_name).first()
    if not store:
        return jsonify({"error": "Store not found", "menu": []}), 404
    return jsonify({
        "store": store.name,
        "logo": store.logo,
        "menu": json.loads(store.menu)
    })

# ---------- Driver Apply ----------
@app.route("/api/driver/apply", methods=["POST"])
def driver_apply():
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user_data = decode_token(token)
    if not user_data:
        return jsonify({"error": "Invalid token"}), 403

    existing = DriverApplication.query.filter_by(user_id=user_data['user_id']).first()
    if existing:
        return jsonify({"message": "Already applied"})

    app_form = DriverApplication(user_id=user_data['user_id'])
    db.session.add(app_form)
    db.session.commit()
    return jsonify({"message": "Application submitted. Verification in 1-2 days."})

# ---------- Family Group Chat ----------
@app.route("/api/family/group/<group_id>", methods=["GET", "POST"])
def family_group(group_id):
    if request.method == "POST":
        data = request.json
        msg = FamilyMessage(group_id=group_id, sender=data["sender"], message=data["message"])
        db.session.add(msg)
        db.session.commit()
        return jsonify({"message": "Sent"})
    messages = FamilyMessage.query.filter_by(group_id=group_id).order_by(FamilyMessage.timestamp).all()
    return jsonify([
        {"sender": m.sender, "message": m.message, "time": m.timestamp.isoformat()}
        for m in messages
    ])

# ---------- AI Chat & Delivery ----------
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

# ---------- Run Server ----------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
