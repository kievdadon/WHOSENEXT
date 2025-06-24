# WHOSENXT – Life Assistant App (Full Backend)

This full backend powers the WHOSENXT app, supporting:
- 💳 Stripe payment + payout
- 🛍️ Marketplace system
- 🛠️ Gig board with experience filters
- 💬 Family group chat with location sharing
- 📃 Payout history and CSV export

## Getting Started

### 🔧 Install Requirements
```
pip install -r requirements.txt
```

### 🚀 Run the App
```
python app.py
```

### 🌐 Deploy to Render.com
1. Upload this to a GitHub repo
2. Create a new Web Service on Render
3. Set Start Command: `python app.py`
4. Add Environment Variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLIC_KEY`

You're ready to launch WHOSENXT!