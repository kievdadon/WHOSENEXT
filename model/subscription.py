from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
import stripe

stripe.api_key = 'your_secret_key_here'

STRIPE_PRICING_IDS = {
    'Gold': 'price_gold_id_here',
    'Platinum': 'price_platinum_id_here'
}

subscription_bp = Blueprint('subscription_bp', __name__)

@subscription_bp.route('/create-subscription', methods=['POST'])
@jwt_required()
def create_subscription():
    user_id = get_jwt_identity()
    plan = request.json.get('plan')
    user = User.query.get(user_id)

    if not user.stripe_customer_id:
        customer = stripe.Customer.create(email=user.email)
        user.stripe_customer_id = customer.id
        db.session.commit()

    session = stripe.checkout.Session.create(
        customer=user.stripe_customer_id,
        line_items=[{
            'price': STRIPE_PRICING_IDS[plan],
            'quantity': 1
        }],
        mode='subscription',
        success_url='https://yourdomain.com/success',
        cancel_url='https://yourdomain.com/cancel',
    )

    return jsonify({'checkout_url': session.url})
