import os
import psycopg2
import requests
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask import Flask,request, redirect, jsonify,  render_template, flash, session
from lib.user_repository import UserRepository
from lib.user import User
from lib.exercise import Exercise
from lib.exercise_repository import ExerciseRepository
from lib.database_connection import get_flask_database_connection
from controllers.authentification import check_password
from controllers.token_checker import token_checker
from flask_cors import CORS  # Import flask_cors

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://127.0.01/exercise'
db = SQLAlchemy(app)

load_dotenv()

# Enable CORS for all routes, allowing requests from http://localhost:5173
CORS(app, origins=["http://localhost:5173"])

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

@app.route('/signup', methods=['POST'])
def signup():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json() 
    username = data.get('username')
    password = data.get('password')
    print(username)
    print(password)
    # Username and password backend validation
    if len(password) < 8:
        return jsonify({ "message": "Password too short min. 8 characters"}), 400
    new_user = User(1, username, password)
    user = repository.find_by_username(username)
    print(user)
    if user:
        return jsonify({ "message": "Username already exists"}), 400
    repository.create_user(new_user)
    return jsonify({'message':'User added'}),201


@app.route('/users', methods=['PATCH'])
@token_checker  #it makes sure there is a token sent in the get request from front end to activate all_user 
#headers: {'Authorization': `Bearer ${token}`, ... 
def update_user():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    repository.add_details(data['username'], data['first_name'], data['last_name'], data['dob'], data['height'], data['weight'])
    return jsonify({'message':'Details added'}),201


@app.route('/users', methods=['POST']) #TODO Add TokenChecker
def user_weight():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    weight = repository.weight_details(data['username'])
    print(weight)
    return  jsonify(weight),201


# robs FE get exercise request
@app.route('/get_new_exercises', methods=['GET']) 
def get_new_exercises():

    payload = {
        'muscle': request.args.get('muscle'),
    }
    api_url = 'https://api.api-ninjas.com/v1/exercises' 
    headers = {'X-Api-Key': os.getenv('API_KEY')} 
    response = requests.get(api_url, params=payload, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': 'Failed to fetch exercises'}), response.status_code


@app.route('/post_exercises', methods=['POST'])
def post_exercises():
    connection = get_flask_database_connection(app)
    repository = ExerciseRepository(connection)
    # Fetch data from the API
    try:
        data = repository.fetch_all_data()
        if not data:
            # Save the data to the database
            return jsonify({"message": "Data fetched and stored successfully!"}), 200
        else:
            return jsonify({"error": "No data received from the API"}), 204  # No Content
    except Exception as e:
        # Log the exception or handle it as necessary
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to fetch data from the API"}), 500


@app.route('/get_exercises', methods=['GET'])
def get_exercises():
    connection = get_flask_database_connection(app)
    repository = ExerciseRepository(connection)
    exercises = repository.all()
    exercise_dicts = [exercise.to_dict() for exercise in exercises]
    return jsonify(exercise_dicts), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
