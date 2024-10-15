import jwt
import os
from datetime import datetime, timedelta

# Load the secret key from environment variable (similar to process.env.JWT_SECRET)
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')

# Function to generate a JWT token for a specific user
def generate_token(user_id):
    """
    This function is used to generate a JWT token for a specific user.
    The token will expire in 10 minutes.
    """
    now = datetime.utcnow()
    payload = {
        'user_id': user_id,
        'iat': now,  # Issued at time
        'exp': now + timedelta(minutes=10)  # Expiry time (10 minutes from now)
    }
    
    # Generate the token using the secret key
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    
    return token

# Function to decode a JWT token and extract its payload
def decode_token(token):
    """
    This function decodes a JWT token and returns its payload.
    If the token is invalid or expired, it raises an exception.
    """
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return decoded_payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired!")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token!")
