# business.py

from datetime import datetime
from app import db

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    owner_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    # Basic info
    name = db.Column(
        db.String(100),
        nullable=False,
        index=True
    )
    slug = db.Column(
        db.String(120),
        unique=True,
        nullable=False,
        doc="URL‐friendly identifier, e.g. 'acme-corp'"
    )
    category = db.Column(
        db.String(100),
        nullable=True,
        index=True
    )
    description = db.Column(
        db.Text,
        nullable=True,
        doc="Optional long description of services"
    )

    # Approval & commission
    approved = db.Column(
        db.Boolean,
        nullable=False,
        server_default=db.text('false'),
        doc="Has the admin approved this business?"
    )
    commission_rate = db.Column(
        db.Float,
        nullable=False,
        server_default="0.10",
        doc="Fraction (0–1) of each transaction retained as commission"
    )

    # Contact / location (optional extras)
    address = db.Column(db.String(200), nullable=True)
    phone = db.Column(db.String(30), nullable=True)

    # Timestamps
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

    # Relationships
    owner = db.relationship(
        'User',
        back_populates='businesses'
    )

    def __repr__(self):
        return (
            f"<Business id={self.id!r} name={self.name!r} "
            f"owner_id={self.owner_id!r} approved={self.approved!r}>"
        )

    def to_dict(self):
        """Return JSON‐serializable representation of this business."""
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'slug': self.slug,
            'category': self.category,
            'description': self.description,
            'approved': self.approved,
            'commission_rate': self.commission_rate,
            'address': self.address,
            'phone': self.phone,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
