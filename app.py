
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = os.getenv('SECRET_KEY', 'supersecretkey')
bcrypt = Bcrypt(app)

# In-memory user store for demo (replace with real DB)
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if email in users:
        return jsonify({'message': 'User already exists'}), 400
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    users[email] = {'password': hashed_pw, 'schedule': [], 'store_list': []}
    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = users.get(email)
    if user and bcrypt.check_password_hash(user['password'], password):
        session['user'] = email
        return jsonify({'message': 'Login successful'})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out'})

@app.route('/checkin', methods=['POST'])
def checkin():
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.json
    message = data.get('message')
    # For demo: just echo back
    return jsonify({'reply': f"Thanks for sharing: {message}"})

@app.route('/store/add', methods=['POST'])
def add_store_item():
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.json
    item = data.get('item')
    user = users[session['user']]
    user['store_list'].append(item)
    return jsonify({'message': f'Added {item} to your store list', 'store_list': user['store_list']})

@app.route('/store/list', methods=['GET'])
def get_store_list():
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    user = users[session['user']]
    return jsonify({'store_list': user['store_list']})

if __name__ == '__main__':
    app.run(debug=True)
