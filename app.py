from flask import Flask, jsonify, request
from flask_cors import CORS
import csv, io, os, json
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from datetime import datetime, timedelta, time

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# === Configuration ===
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///whosenxt.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this for production!

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# === Models ===

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_worker = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80), nullable=False)  # e.g., Food, Clothing
    is_open = db.Column(db.Boolean, default=True)
    open_time = db.Column(db.Time, nullable=True)
    close_time = db.Column(db.Time, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    store = db.relationship('Store', backref=db.backref('products', lazy=True))

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    status = db.Column(db.String(30), default='pending')  # pending, accepted, picked_up, delivered, canceled
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = db.relationship('Product')
    user = db.relationship('User', foreign_keys=[user_id])
    worker = db.relationship('User', foreign_keys=[worker_id])

# === Existing Routes ===

@app.route("/")
def home():
    return "WHOSENXT backend is running!"

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

# === Authentication Routes ===

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password required"}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already taken"}), 409

    user = User(username=data['username'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password required"}), 400

    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=1))
        return jsonify(access_token=access_token, username=user.username, is_worker=user.is_worker, is_admin=user.is_admin)
    else:
        return jsonify({"msg": "Invalid credentials"}), 401

# === New API Endpoints ===

@app.route('/products', methods=['GET'])
def get_products():
    """Search and filter products by category and name."""
    category = request.args.get('category')
    search = request.args.get('search')

    query = Product.query.filter_by(available=True)
    if category:
        query = query.filter(Product.category.ilike(f'%{category}%'))
    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))

    products = query.all()
    results = []
    for p in products:
        results.append({
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "price": p.price,
            "description": p.description,
            "store": p.store.name,
            "store_id": p.store.id
        })
    return jsonify(results)

@app.route('/stores/<int:store_id>/availability', methods=['GET'])
def store_availability(store_id):
    store = Store.query.get_or_404(store_id)

    # Option 1: Use the is_open boolean directly
    is_open = store.is_open

    # Option 2 (optional): Check current time vs open/close times
    # now = datetime.utcnow().time()
    # if store.open_time and store.close_time:
    #     is_open = store.open_time <= now <= store.close_time
    # else:
    #     is_open = store.is_open

    return jsonify({"store_id": store.id, "name": store.name, "is_open": is_open})

# === Worker Dashboard Routes ===

@app.route('/worker/orders', methods=['GET'])
@jwt_required()
def get_worker_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_worker:
        return jsonify({"msg": "Unauthorized"}), 403

    orders = Order.query.filter_by(worker_id=user.id).order_by(Order.created_at.desc()).all()
    results = []
    for o in orders:
        results.append({
            "order_id": o.id,
            "product": o.product.name,
            "quantity": o.quantity,
            "status": o.status,
            "created_at": o.created_at.isoformat(),
            "updated_at": o.updated_at.isoformat()
        })
    return jsonify(results)

@app.route('/worker/orders/<int:order_id>/accept', methods=['POST'])
@jwt_required()
def accept_order(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_worker:
        return jsonify({"msg": "Unauthorized"}), 403

    order = Order.query.get_or_404(order_id)
    if order.status != 'pending':
        return jsonify({"msg": "Order cannot be accepted"}), 400
    order.worker_id = user.id
    order.status = 'accepted'
    db.session.commit()
    return jsonify({"msg": "Order accepted", "order_id": order.id})

@app.route('/worker/orders/<int:order_id>/update_status', methods=['POST'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_worker:
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.json
    new_status = data.get('status')
    if new_status not in ['accepted', 'picked_up', 'delivered', 'canceled']:
        return jsonify({"msg": "Invalid status"}), 400

    order = Order.query.get_or_404(order_id)
    if order.worker_id != user.id:
        return jsonify({"msg": "You are not assigned to this order"}), 403

    order.status = new_status
    db.session.commit()
    return jsonify({"msg": f"Order status updated to {new_status}", "order_id": order.id})

# === Admin Dashboard Routes ===

@app.route('/admin/users', methods=['GET'])
@jwt_required()
def admin_get_users():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_admin:
        return jsonify({"msg": "Unauthorized"}), 403

    users = User.query.order_by(User.created_at.desc()).all()
    results = []
    for u in users:
        results.append({
            "id": u.id,
            "username": u.username,
            "is_worker": u.is_worker,
            "is_admin": u.is_admin,
            "created_at": u.created_at.isoformat()
        })
    return jsonify(results)

@app.route('/admin/orders', methods=['GET'])
@jwt_required()
def admin_get_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_admin:
        return jsonify({"msg": "Unauthorized"}), 403

    orders = Order.query.order_by(Order.created_at.desc()).all()
    results = []
    for o in orders:
        results.append({
            "order_id": o.id,
            "product": o.product.name,
            "quantity": o.quantity,
            "status": o.status,
            "user": o.user.username,
            "worker": o.worker.username if o.worker else None,
            "created_at": o.created_at.isoformat(),
            "updated_at": o.updated_at.isoformat()
        })
    return jsonify(results)

# === Run App ===

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
