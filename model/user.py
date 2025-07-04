from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='customer')  # 'customer', 'worker', 'business', 'admin'
    membership = db.Column(db.String(20), default='Free')  # 'Free', 'Gold', 'Platinum'
    stripe_customer_id = db.Column(db.String(100))
    settings = db.relationship('UserSettings', backref='user', uselist=False)
