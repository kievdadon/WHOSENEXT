from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/menu/<store_name>")
def get_menu(store_name):
    return {
        "menu": [
            {"name": "Test Item 1", "price": 1.99, "imageUrl": "https://via.placeholder.com/150"},
            {"name": "Test Item 2", "price": 2.99, "imageUrl": "https://via.placeholder.com/150"},
        ]
    }

if __name__ == "__main__":
    app.run(debug=True)
