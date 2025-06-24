# WHOSENXT – Life Assistant App (Backend)

## About
WHOSENXT is a tech-wellness hybrid platform that includes:
- 💬 Wellness AI chat + emotional check-ins
- 📦 **WHOSENXT DELIVERY** — delivery system with voice confirmation
- 🧰 **WHOSENXT JOB** — worker dashboard + payouts
- 🛍️ **WHOSENXT MARKETPLACE** — buy/sell furniture, clothes, etc.
- 🛠️ **WHOSENXT GIG** — post or apply for help gigs
- 👨‍👩‍👧 **Family Group Chat** — with real-time location sharing

## Getting Started
1. Clone this repository:
   ```bash
   git clone https://github.com/your_username/whosenxt.git
   ```

2. **Install Dependencies**:
   In your project directory, run:
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Variables**:
   - Create a `.env` file or set these variables on your deployment platform (e.g., Render):
     - `STRIPE_SECRET_KEY`: Your secret key from Stripe
     - `STRIPE_PUBLIC_KEY`: Your public key from Stripe

4. **Start the App Locally**:
   Run the following command:
   ```bash
   python app.py
   ```

5. **Access the App**:
   Open your browser and go to:
   ```bash
   http://localhost:5000
   ```

## Available Routes (API)
- **POST `/create-payment-intent`** — Creates a Stripe payment intent
- **POST `/post-item`** — Allows posting an item on WHOSENXT MARKETPLACE
- **POST `/post-gig`** — Post a gig on WHOSENXT GIG
- **POST `/send-message`** — Send a message in the family group chat
- **POST `/update-location`** — Update a user’s location (with toggle on/off)

## Deploy to Render.com
1. [Create a free account on Render.com](https://render.com)
2. Create a new **Web Service** and connect this repository
3. Set the **Start Command** to `python app.py`
4. Add **Environment Variables** for your **Stripe Keys** in the Render settings:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLIC_KEY`

## License
- MIT License

## Example Usage
Example payloads for the routes would look like this:

#### POST `/create-payment-intent`
```json
{
  "amount": 1000
}
```

#### POST `/update-location`
```json
{
  "user": "JohnDoe",
  "lat": 40.730610,
  "lon": -73.935242,
  "enabled": 1
}
```