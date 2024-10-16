import os
from controllers.create_token import generate_token
from lib.user_repository import UserRepository
from lib.database_connection import get_flask_database_connection
from flask import Flask, jsonify
import bcrypt
app = Flask(__name__)

def check_password(username, password):

    try:
        connection = get_flask_database_connection(app)
        if not  connection:
            return jsonify({"message": "An error occurred during login"}), 500
        
        repository = UserRepository(connection)
        user = repository.find_by_username(username)
        
        if not user:
            return jsonify({"message": f"Login Failed: User not found"}), 401
        input_password = password.encode('Utf-8')
        hashed_password = user.password
        hashed = hashed_password.encode('Utf-8')
        if bcrypt.checkpw(input_password, hashed):
            # If password matches, create and return a JWT token
            token = generate_token(username)
            return jsonify({"token": token}), 200
        
        return jsonify({"message": "Login Failed: Invalid password"}), 401
        
    
    except Exception as e:
        return jsonify({"message": f"An error occurred during login {username} /// {password}"}), 500
