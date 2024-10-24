import unittest
from flask import Flask, jsonify
from unittest.mock import patch, MagicMock
from controllers.authentification import check_password  # Updated import
import bcrypt

class TestCheckPassword(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.testing = True
        self.client = self.app.test_client()

    @patch('controllers.authentification.get_flask_database_connection')
    @patch('controllers.authentification.UserRepository')
    @patch('controllers.authentification.bcrypt.checkpw')
    @patch('controllers.authentification.generate_token')
    def test_check_password_success(self, mock_generate_token, mock_checkpw, mock_UserRepository, mock_get_connection):
        # Arrange
        with self.app.app_context():
            # Mock the database connection
            mock_get_connection.return_value = MagicMock()
            # Mock user repository
            mock_user = MagicMock()
            # Simulate a hashed password
            mock_user.password = bcrypt.hashpw(b'secret', bcrypt.gensalt()).decode('utf-8')
            mock_UserRepository.return_value.find_by_username.return_value = mock_user
            mock_checkpw.return_value = True  # Simulate password match
            mock_generate_token.return_value = 'mock_token'

            # Act
            response = check_password('testuser', 'secret')

            # Assert
            self.assertIn('token', response.get_json())
            self.assertEqual(response.get_json()['token'], 'mock_token')
            self.assertEqual(response.status_code, 201)  # Check for success status code
            self.assertEqual(response.headers['X-username'], 'testuser')

    @patch('controllers.authentification.get_flask_database_connection')
    @patch('controllers.authentification.UserRepository')
    def test_user_not_found(self, mock_UserRepository, mock_get_connection):
        # Arrange
        with self.app.app_context():
            mock_get_connection.return_value = MagicMock()
            # Simulate user not found
            mock_UserRepository.return_value.find_by_username.return_value = None

            # Act
            response = check_password('unknownuser', 'secret')

            # Assert
            self.assertEqual(response[1], 400)  # Unpack status code from tuple
            self.assertEqual(response[0].get_json()['message'], 'Login Failed: User not found')  # Unpack response from tuple

    @patch('controllers.authentification.get_flask_database_connection')
    @patch('controllers.authentification.UserRepository')
    def test_invalid_password(self, mock_UserRepository, mock_get_connection):
        # Arrange
        with self.app.app_context():
            mock_get_connection.return_value = MagicMock()
            mock_user = MagicMock()
            mock_user.password = bcrypt.hashpw(b'secret', bcrypt.gensalt()).decode('utf-8')
            mock_UserRepository.return_value.find_by_username.return_value = mock_user
            
            # Act
            response = check_password('testuser', 'wrongpassword')

            # Assert
            self.assertEqual(response[1], 400)  # Unpack status code from tuple
            self.assertEqual(response[0].get_json()['message'], 'Login Failed: Invalid password')  # Unpack response from tuple

    @patch('controllers.authentification.get_flask_database_connection', return_value=None)
    def test_connection_failure(self, mock_get_connection):
        # Act
        with self.app.app_context():
            response = check_password('testuser', 'secret')

            # Assert
            self.assertEqual(response[1], 500)  # Unpack status code from tuple
            self.assertEqual(response[0].get_json()['message'], "An error occurred during login")  # Unpack response from tuple

    def test_internal_error(self):
        # This will simulate an exception being raised in the check_password function.
        with patch('controllers.authentification.get_flask_database_connection', side_effect=Exception("Database error")):
            with self.app.app_context():
                # Act
                response = check_password('testuser', 'secret')  # This should raise the exception

                # Assert
                self.assertEqual(response[1], 500)  # Unpack status code from tuple
                self.assertEqual(response[0].get_json()['message'], 'An error occurred during login')  # Unpack response from tuple

# if __name__ == '__main__':
#     unittest.main()
