from flask import Flask
import os
from flask import request, redirect, session, jsonify,  render_template, flash
import psycopg2
from lib.user_repository import UserRepository
from lib.user import User
from lib.database_connection import get_flask_database_connection

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/users', methods=['GET'])
def all_users():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    users = repository.all()
    user_dict = [user.to_dict() for user in users] 
    return jsonify(user_dict),200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)