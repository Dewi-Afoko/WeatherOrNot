import os
import jwt
from functools import wraps
from flask import request, jsonify

# Load the secret key from environment variable
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')

# Token checker decorator to be used on protected routes
def token_checker(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Extract the token from the 'Authorization' header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Authorization header missing or invalid"}), 401
        
        token = auth_header.split(" ")[1]  # Get the token part

        try:
            # Decode the token using the secret key
            decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            # Optionally, attach user info to request context
            request.user_id = decoded_payload.get('user_id')
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401
        
        # If token is valid, proceed to the route
        return f(*args, **kwargs)
    
    return decorated_function