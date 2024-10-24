import os
import jwt
import pytest
from flask import Flask, request, jsonify
from functools import wraps
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone  # Import necessary components

# Load the environment variables
load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')

# Define the token_checker decorator as in your original file
def token_checker(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        # Check for missing or invalid authorization header
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Authorization header missing or invalid"}), 401
        
        token = auth_header.split(" ")[1]
        
        try:
            # Decode the token and extract user_id
            decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user_id = decoded_payload.get('user_id')
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401
        
        return f(*args, **kwargs)
    return decorated_function

# Create a simple Flask app for testing
app = Flask(__name__)

@app.route('/protected', methods=['GET'])
@token_checker
def protected_route():
    return jsonify({"message": f"Hello, user {request.user_id}!"})

# Define the test cases
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def generate_token(user_id, expires_in=100):
    now = datetime.now(tz=timezone.utc)
    payload = {
        'user_id': user_id,
        'iat': now,
        'exp': now + timedelta(minutes=expires_in)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def test_protected_route_with_valid_token(client):
    token = generate_token('test_user')
    response = client.get('/protected', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert response.get_json() == {"message": "Hello, user test_user!"}

def test_protected_route_with_expired_token(client):
    expired_token = generate_token('test_user', expires_in=-1)
    response = client.get('/protected', headers={'Authorization': f'Bearer {expired_token}'})
    assert response.status_code == 401
    assert response.get_json() == {"message": "Token has expired!"}

def test_protected_route_with_invalid_token(client):
    response = client.get('/protected', headers={'Authorization': 'Bearer invalid_token'})
    assert response.status_code == 401
    assert response.get_json() == {"message": "Invalid token!"}

def test_protected_route_without_token(client):
    response = client.get('/protected')
    assert response.status_code == 401
    assert response.get_json() == {"message": "Authorization header missing or invalid"}

def test_protected_route_with_incorrectly_formatted_token(client):
    response = client.get('/protected', headers={'Authorization': 'InvalidTokenFormat'})
    assert response.status_code == 401
    assert response.get_json() == {"message": "Authorization header missing or invalid"}

# Additional tests for complete coverage
def test_protected_route_with_missing_bearer_token(client):
    response = client.get('/protected', headers={'Authorization': 'Bearer '})
    assert response.status_code == 401
    assert response.get_json() == {"message": "Invalid token!"}

def test_protected_route_with_no_auth_header(client):
    response = client.get('/protected', headers={})
    assert response.status_code == 401
    assert response.get_json() == {"message": "Authorization header missing or invalid"}

# if __name__ == '__main__':
#     pytest.main()
