from app import db

class Gig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.String(20), default='standard')  # 'standard', 'quick'
    location = db.Column(db.String(100))
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    accepted = db.Column(db.Boolean, default=False)
    priority = db.Column(db.Boolean, default=False)
