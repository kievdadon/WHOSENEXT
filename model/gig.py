# gig.py

from datetime import datetime
from enum import Enum
from app import db

class GigType(Enum):
    STANDARD = "standard"
    QUICK = "quick"

class GigStatus(Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELED = "canceled"

class Gig(db.Model):
    __tablename__ = 'gigs'

    id = db.Column(db.Integer, primary_key=True)

    # Core Details
    title = db.Column(db.String(100), nullable=False, index=True)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(
        db.Enum(GigType, name='gig_type'),
        nullable=False,
        default=GigType.STANDARD
    )
    status = db.Column(
        db.Enum(GigStatus, name='gig_status'),
        nullable=False,
        default=GigStatus.PENDING
    )
    location = db.Column(db.String(200), nullable=True)
    price = db.Column(db.Numeric(10,2), nullable=True, doc="Customer-offered price")

    # Relationships
    customer_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='SET NULL'),
        nullable=True,
        index=True
    )
    worker_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='SET NULL'),
        nullable=True,
        index=True
    )

    # Flags
    priority = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.text('false'),
        doc="True if customer marked as high-priority"
    )

    # Auditing
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

    # Backrefs (set these in your User model)
    customer = db.relationship(
        'User',
        foreign_keys=[customer_id],
        back_populates='customer_gigs'
    )
    worker = db.relationship(
        'User',
        foreign_keys=[worker_id],
        back_populates='worker_gigs'
    )

    def __repr__(self):
        return (
            f"<Gig id={self.id!r} title={self.title!r} "
            f"status={self.status.value!r}>"
        )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type.value,
            'status': self.status.value,
            'location': self.location,
            'price': float(self.price) if self.price is not None else None,
            'priority': self.priority,
            'customer_id': self.customer_id,
            'worker_id': self.worker_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
