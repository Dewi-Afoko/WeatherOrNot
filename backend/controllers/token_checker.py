import os
import jwt
from flask import request, jsonify

# Load the secret key from environment variable
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')

# Token checker to be used before routes that we want to have token to run 
def token_checker(f):
    def decorated_function():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Authorization header missing or invalid"}), 401
        
        token = auth_header.split(" ")[1]
        
        try:
            decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user_id = decoded_payload.get('user_id')
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401
        
        return f()  # Call the original function
    return decorated_function

