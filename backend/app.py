import os
import psycopg2
import requests
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
from functools import wraps
from dotenv import load_dotenv
from flask import Flask,request, redirect, jsonify,  render_template, flash, session
from lib.user_repository import UserRepository
from lib.user import User
from lib.exercise import Exercise
from lib.exercise_repository import ExerciseRepository
from lib.workout import Workout
from lib.workout_repository import WorkoutRepository
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
    print(data)
    repository.add_details(data['username'], data['first_name'], data['last_name'], data['dob'], data['height'], data['weight'])
    return jsonify({'message':'Details added'}),201


@app.route('/users_weight', methods=['POST'])
@token_checker 
def user_weight():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    weight = repository.weight_details(data['username'])
    print(weight)
    return  jsonify(weight),201

@app.route('/users_details', methods=['POST']) 
@token_checker
def user_details():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    details = repository.user_details(data['username'])
    print(details)
    return  jsonify(details),201


# Rob's FE get exercises request
@app.route('/get_new_exercises', methods=['GET']) 
def get_new_exercises():

    muscle = request.args.get('muscle')
    difficulty = request.args.get('difficulty')
    equipment = request.args.get('equipment')
    # exercise_type = request.args.get('type')

    payload = {}
    if muscle:
        payload['muscle'] = muscle
    if difficulty:
        payload['difficulty'] = difficulty
    if equipment:
        payload['equipment'] = equipment
    # if exercise_type:
    #     payload['type'] = exercise_type

    api_url = 'https://api.api-ninjas.com/v1/exercises' 
    headers = {'X-Api-Key': os.getenv('API_KEY')} 

    response = requests.get(api_url, params=payload, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': 'Failed to fetch exercises'}), response.status_code

# GET single exercise from API
@app.route('/exercise', methods=["GET"])
def get_single_exercise():
    name = request.args.get('name')
    payload = {
        'name': name
    }
    api_url = 'https://api.api-ninjas.com/v1/exercises' 
    headers = {'X-Api-Key': os.getenv('API_KEY')} 
    response = requests.get(api_url, params=payload, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': 'Failed to fetch exercise'}), response.status_code



######### GET favourites
@app.route('/get_favourites', methods=['GET']) 
def get_favourite_exercises():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    username = request.args.get("username") # access parameter pass in request url
    favourites = repository.find_favourite_exercises(username)
    return jsonify(favourites), 200    

###### Add favourite exercise to user repo
@app.route('/add_favourite', methods=['POST'])
def add_favourite():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    username = data.get("user")
    exercise = data.get("name")
    # print("USERNAME DATA:", username)  # Log the incoming data
    # print("EXERCISE DATA:", exercise)  # Log the incoming data

    if not username or not exercise:
        return jsonify({"error": "Username and exercise name are required"}), 400

    repository.add_exercise(username, exercise)  # Call the repository with both username and exercise name
    # print(result)
    return jsonify({"message": "Favourite exercise added"}), 201


###### Delete favourite exercise to user repo
@app.route('/delete_favourite', methods=['DELETE'])
def delete_favourite():
    connection = get_flask_database_connection(app)
    repository = UserRepository(connection)
    data = request.get_json()
    username = data.get("user")
    exercise = data.get("name")
    if not username or not exercise:
        return jsonify({"error": "Username and exercise name are required"}), 400
    repository.delete_exercise(username, exercise)  # Call the repository with both username and exercise name
    # print(result)
    return jsonify({"message": "Favourite exercise deleted"}), 200


@app.route('/workouts', methods=['POST']) #TODO Add TokenChecker
def add_workout():
    connection = get_flask_database_connection(app)
    repository = WorkoutRepository(connection)
    date = datetime.now().strftime('%Y/%m/%d')
    data = request.get_json()
    data['date'] = date
    print(f'1This line:{data}')
    details = repository.save_workout(data)
    return jsonify(details),201


@app.route('/workouts', methods=['PATCH']) #TODO Add TokenChecker
def update_workout():
    connection = get_flask_database_connection(app)
    repository = WorkoutRepository(connection)
    data = request.get_json()
    details = repository.update_workout(data)
    return jsonify(details),201


######### Chris' BE API Save
# @app.route('/post_exercises', methods=['POST'])
# def post_exercises():
#     connection = get_flask_database_connection(app)
#     repository = ExerciseRepository(connection)
#     # Fetch data from the API
#     try:
#         data = repository.fetch_all_data()
#         if not data:
#             # Save the data to the database
#             return jsonify({"message": "Data fetched and stored successfully!"}), 200
#         else:
#             return jsonify({"error": "No data received from the API"}), 204  # No Content
#     except Exception as e:
#         # Log the exception or handle it as necessary
#         print(f"An error occurred: {e}")
#         return jsonify({"error": "Failed to fetch data from the API"}), 500

@app.route('/get_workouts', methods=['POST'])
def return_workouts():
    connection = get_flask_database_connection(app)
    repository = WorkoutRepository(connection)
    data = request.get_json()
    details = repository.my_workouts(data['username'])
    details2=[]
    for workout in details: 
        details2.append(workout.to_dict())
    
    print(details2)
    return jsonify(details2),201

@app.route('/workouts-delete', methods=['DELETE'])
def delete_workout():
    connection = get_flask_database_connection(app)
    repository = WorkoutRepository(connection)
    data = request.get_json()
    print(data)
    details = repository.delete_workout(data['id'])
    return jsonify(details),204



@app.route('/post_exercises', methods=['POST'])
def post_exercises():
    connection = get_flask_database_connection(app)
    repository = ExerciseRepository(connection)
    try:
        # Fetch data from the API
        data = repository.fetch_all_data()

        if data:  # If data is received, process it and store it in the database
            repository.store_data(data) 
            return jsonify({"message": "Data fetched and stored successfully!"}), 200
        else:  # No data was received from the API
            return jsonify({"error": "No data received from the API"}), 400  # Bad Request
    except Exception as e:
        # Log the exception
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to fetch data from the API"}), 500  # Internal Server Error


######### Chris' BE API Fetch
# @app.route('/get_exercises', methods=['GET'])
# def get_exercises():
#     connection = get_flask_database_connection(app)
#     repository = ExerciseRepository(connection)
#     exercises = repository.all()
#     exercise_dicts = [exercise.to_dict() for exercise in exercises]
#     return jsonify(exercise_dicts), 200

@app.route('/get_exercises', methods=['GET'])
def get_exercises():
    connection = get_flask_database_connection(app)
    repository = ExerciseRepository(connection)
    try:
        exercises = repository.all()
        # Check if any exercises are found
        if not exercises:
            return jsonify({"message": "No exercises found"}), 404
        # Convert exercises to dictionaries for JSON response
        exercise_dicts = [exercise.to_dict() for exercise in exercises]
        return jsonify(exercise_dicts), 200
    except Exception as e:
        # Log the error and return an error response
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to retrieve exercises"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
