# subscription.py

import os
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
from models.subscription import Subscription, SubscriptionStatus
import stripe

# Load Stripe key from env/config
stripe.api_key = current_app.config.get('STRIPE_API_KEY') or os.getenv('STRIPE_API_KEY')

# Map friendly plan names to Stripe Price IDs
STRIPE_PRICE_IDS = {
    'Gold': current_app.config.get('STRIPE_PRICE_GOLD'),
    'Platinum': current_app.config.get('STRIPE_PRICE_PLATINUM')
}

subscription_bp = Blueprint('subscription_bp', __name__, url_prefix='/api/subscription')


@subscription_bp.route('/create', methods=['POST'])
@jwt_required()
def create_subscription():
    """
    Create a new Stripe Checkout Session for a subscription plan.
    Request JSON must include "plan": one of the keys in STRIPE_PRICE_IDS.
    """
    user_id = get_jwt_identity()
    plan_name = request.json.get('plan')
    if plan_name not in STRIPE_PRICE_IDS:
        return jsonify({"msg": "Invalid plan"}), 400

    user = User.query.get_or_404(user_id)

    # Create Stripe customer if needed
    if not user.stripe_customer_id:
        customer = stripe.Customer.create(email=user.email)
        user.stripe_customer_id = customer.id
        db.session.commit()

    try:
        checkout = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': STRIPE_PRICE_IDS[plan_name],
                'quantity': 1,
            }],
            mode='subscription',
            success_url=url_for('subscription_bp.success', _external=True),
            cancel_url=url_for('subscription_bp.cancel', _external=True),
        )
    except stripe.error.StripeError as e:
        current_app.logger.error(f"Stripe error: {e.user_message}")
        return jsonify({"msg": "Payment initialization failed"}), 502

    # Optionally, you could store a pending subscription in your DB here

    return jsonify({"checkoutUrl": checkout.url}), 201


@subscription_bp.route('/success', methods=['GET'])
def success():
    return jsonify({"msg": "Subscription successful. Thank you!"})


@subscription_bp.route('/cancel', methods=['GET'])
def cancel():
    return jsonify({"msg": "Subscription canceled. You can retry anytime."}), 200


@subscription_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    """
    Webhook endpoint to handle Stripe subscription events:
    invoice.paid, customer.subscription.updated, customer.subscription.deleted, etc.
    """
    payload = request.data
    sig_header = request.headers.get('stripe-signature')
    webhook_secret = current_app.config.get('STRIPE_WEBHOOK_SECRET')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        current_app.logger.error(f"Stripe webhook error: {e}")
        return jsonify({"msg": "Invalid webhook"}), 400

    # Handle the event
    obj = event['data']['object']
    customer_id = obj.get('customer')
    sub_id = obj.get('id')

    # Find the user by stripe_customer_id
    user = User.query.filter_by(stripe_customer_id=customer_id).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Process based on event type
    if event['type'] in ('customer.subscription.created', 'customer.subscription.updated'):
        status = obj.get('status')
        # Find or create our local Subscription row
        sub = Subscription.query.filter_by(stripe_id=sub_id).first()
        if not sub:
            sub = Subscription(user_id=user.id, stripe_id=sub_id)
            db.session.add(sub)

        # Update statuses and dates
        sub.status = SubscriptionStatus(status)
        sub.start_date = datetime.fromtimestamp(obj['current_period_start'])
        sub.end_date = datetime.fromtimestamp(obj['current_period_end'])
        sub.auto_renew = not obj.get('cancel_at_period_end', False)
        sub.updated_at = datetime.utcnow()
        db.session.commit()

    elif event['type'] == 'customer.subscription.deleted':
        sub = Subscription.query.filter_by(stripe_id=sub_id).first()
        if sub:
            sub.status = SubscriptionStatus.CANCELED
            sub.updated_at = datetime.utcnow()
            db.session.commit()

    # You can handle more event types here...

    return jsonify({"received": True}), 200
