import os
import jwt
import unittest
from datetime import datetime, timedelta, timezone  # Import timezone
from controllers.create_token import generate_token, decode_token  # Adjust the import according to your file structure

# Set the environment variable for testing
os.environ['JWT_SECRET'] = 'test_secret_key'

class TestJWTFunctions(unittest.TestCase):
    
    def setUp(self):
        # This method will run before each test
        self.username = 'test_user'
        self.token = generate_token(self.username)
    
    def test_generate_token(self):
        # Ensure the token is generated and not None
        self.assertIsNotNone(self.token)
        
        # Decode the token to check if the payload is correct
        payload = decode_token(self.token)
        self.assertEqual(payload['user_id'], self.username)
        self.assertIn('iat', payload)
        self.assertIn('exp', payload)
        self.assertGreater(payload['exp'], payload['iat'])

    def test_decode_valid_token(self):
        # Test decoding a valid token
        payload = decode_token(self.token)
        self.assertEqual(payload['user_id'], self.username)

    def test_decode_expired_token(self):
        # Simulate an expired token
        expired_payload = {
            'user_id': self.username,
            'iat': datetime.now(tz=timezone.utc) - timedelta(minutes=200),  # Issued a long time ago
            'exp': datetime.now(tz=timezone.utc) - timedelta(minutes=100)   # Expired a long time ago
        }
        expired_token = jwt.encode(expired_payload, os.getenv('JWT_SECRET'), algorithm='HS256')

        # Assert that an exception is raised and check the message
        with self.assertRaises(Exception) as context:
            decode_token(expired_token)
        
        # Verify that the exception message is correct
        self.assertEqual(str(context.exception), 'Invalid token!')

    def test_decode_invalid_token(self):
        # Test decoding an invalid token
        with self.assertRaises(Exception) as context:
            decode_token("invalid_token")
        
        self.assertEqual(str(context.exception), "Invalid token!")

# if __name__ == '__main__':
#     unittest.main()
