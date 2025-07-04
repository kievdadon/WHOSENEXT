from app import db

class UserSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    share_location = db.Column(db.Boolean, default=False)
    show_orders_to_family = db.Column(db.Boolean, default=True)
