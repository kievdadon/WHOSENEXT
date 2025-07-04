from app import db

class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100))
    approved = db.Column(db.Boolean, default=False)
    commission_rate = db.Column(db.Float, default=0.1)
