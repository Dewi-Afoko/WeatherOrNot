from flask import Flask
import os
from flask import request, redirect, jsonify,  render_template, flash
import psycopg2
from lib.user_repository import UserRepository
from lib.user import User
from lib.database_connection import get_flask_database_connection
from controllers.authentiphication import check_password
from controllers.token_checker import token_checker
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login',methods=['POST'])
def login():
    #request.get_json it would get us the data that we send from the front end in the body part of the request 
    data = request.get_json() 
    username = data.get('username')
    password = data.get('password')
    # then we check the password and send a token if its correct or an error message if its not 
    return check_password(username, password)



@app.route('/users', methods=['GET'])
@token_checker  #it makes sure there is a token sent in the get request from front end to activate all_user 
#headers: {'Authorization': `Bearer ${token}`, ... 
def all_users():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    users = repository.all()
    user_dict = [user.to_dict() for user in users] 
    return jsonify(user_dict),200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)