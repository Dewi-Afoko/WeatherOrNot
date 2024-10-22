import os
import jwt
from flask import request, jsonify
from functools import wraps
from dotenv import load_dotenv
# Load the secret key from environment variable
load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')

# Token checker to be used before routes that we want to have token to run 
def token_checker(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Authorization header missing or invalid"}), 401
        
        token = auth_header.split(" ")[1]
        
        try:
            decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            print("REQUEST 1: ", request)
            request.user_id = decoded_payload.get('user_id') #asssigns user_id to the request??
            print("REQUEST 2: ", request)
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401
        
        return f(*args, **kwargs)  # Call the original function
    return decorated_function

