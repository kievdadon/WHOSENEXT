# user_settings.py

from datetime import datetime
from app import db

class UserSettings(db.Model):
    __tablename__ = 'user_settings'

    id = db.Column(db.Integer, primary_key=True)
    
    # One settings row per user
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id', ondelete='CASCADE'),
        unique=True,
        nullable=False
    )

    # Existing preferences
    share_location = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.false()
    )
    show_orders_to_family = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.true()
    )

    # Example additional preferences
    dark_mode = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.false()
    )
    notifications_enabled = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.true()
    )

    # Timestamps for auditing
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationship back to User
    user = db.relationship(
        'User',
        back_populates='settings',
        uselist=False
    )

    def __repr__(self):
        return (
            f'<UserSettings user_id={self.user_id} '
            f'share_location={self.share_location} '
            f'dark_mode={self.dark_mode}>'
        )

    def to_dict(self):
        """Serialize preferences to a JSON‐friendly dict."""
        return {
            'user_id': self.user_id,
            'share_location': self.share_location,
            'show_orders_to_family': self.show_orders_to_family,
            'dark_mode': self.dark_mode,
            'notifications_enabled': self.notifications_enabled,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
