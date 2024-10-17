from flask import Flask
import os
import requests
from flask_sqlalchemy import SQLAlchemy
from flask import request, redirect, session, jsonify,  render_template, flash
import psycopg2
from lib.user_repository import UserRepository
from lib.user import User
from lib.exercise import Exercise
from lib.exercise_repository import ExerciseRepository
from lib.database_connection import get_flask_database_connection

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://127.0.01/exercise'
db = SQLAlchemy(app)


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


@app.route('/get_exercises', methods=['GET'])
def get_exercises():
    connection = get_flask_database_connection(app)
    repository = ExerciseRepository(connection)
    exercises = repository.all()
    exercise_dicts = [exercise.to_dict() for exercise in exercises]
    return jsonify(exercise_dicts), 200


@app.route('/post_exercises', methods=['POST'])
def post_exercises():
    repository = ExerciseRepository(app)
    # Fetch data from the API
    try:
        data = repository.fetch_data_from_api()
        if data:
            # Save the data to the database
            repository.save_data_to_db(data)
            return jsonify({"message": "Data fetched and stored successfully!"}), 200
        else:
            return jsonify({"error": "No data received from the API"}), 204  # No Content
    except Exception as e:
        # Log the exception or handle it as necessary
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to fetch data from the API"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





# @app.route('/get_exercises', methods=['GET']) 
# def get_exercises():
#     payload = {
#     'muscle': 'biceps'
#     }
#     api_url = f'https://api.api-ninjas.com/v1/exercises'
#     response = requests.get(api_url, params=payload, headers={'X-Api-Key': os.getenv('API_KEY')})

#     return response.json(), response.status_code

# @app.route('/get_exercises', methods=['GET']) 
# def get_exercises():
#     muscle = request.args.get('muscle')
#     api_url = 'https://api.api-ninjas.com/v1/exercises' 
#     headers = {'X-Api-Key': os.getenv('API_KEY')} 

#     response = requests.get(api_url, params={'muscle': muscle}, headers=headers)
#     return response.json(), response.status_code

# @app.route('/get_muscle_options', methods=['GET']) 
# def get_muscle_options():
#     api_url = f'https://api.api-ninjas.com/v1/exercises'
#     response = requests.get(api_url, headers={'X-Api-Key': os.getenv('API_KEY')})

    # print("hello")
    # return response.json(), response.status_code