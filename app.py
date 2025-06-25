import logging
from flask import Flask, request, jsonify
import os
import stripe
from flask_cors import CORS

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Set your Stripe secret key
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

@app.route('/')
def home():
    app.logger.debug('Home route accessed')
    return "Hello, World!"

# Sample route for creating a payment intent
@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    app.logger.debug('Creating payment intent')
    try:
        data = request.get_json()
        amount = data.get("amount")
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        app.logger.debug('Payment intent created successfully')
        return jsonify({"clientSecret": intent.client_secret})
    except Exception as e:
        app.logger.error(f"Error creating payment intent: {e}")
        return jsonify(error=str(e)), 400

if __name__ == "__main__":
    app.logger.debug('Flask app starting')
    app.run(debug=True)
