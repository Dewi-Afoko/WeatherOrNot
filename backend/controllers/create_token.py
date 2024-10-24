import jwt
import os
from datetime import datetime, timedelta, timezone  # Import timezone

# Load the secret key from environment variable 
SECRET_KEY = os.getenv('JWT_SECRET', 'your_default_secret_key')


def generate_token(username):
    now = datetime.now(tz=timezone.utc)  # Use timezone-aware UTC
    payload = {
        'user_id': username,
        'iat': now,  # Issued at time
        'exp': now + timedelta(minutes=100)
    }
    # Generate the token using the secret key
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    
    return token

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
