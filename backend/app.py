from flask import Flask
import os
import requests
from dotenv import load_dotenv
from flask import request, redirect, session, jsonify,  render_template, flash
import psycopg2
from lib.user_repository import UserRepository
from lib.user import User
from lib.database_connection import get_flask_database_connection

load_dotenv()

app = Flask(__name__)

@app.route('/get_exercises', methods=['GET']) 
def get_exercises():
    payload = {
    'muscle': 'biceps'
    }
    api_url = f'https://api.api-ninjas.com/v1/exercises'
    response = requests.get(api_url, params=payload, headers={'X-Api-Key': os.getenv('API_KEY')})

    return response.json(), response.status_code

    # print(response.json())

@app.route('/get_muscle_options', methods=['GET']) 
def get_muscle_options():
    api_url = f'https://api.api-ninjas.com/v1/exercises'
    response = requests.get(api_url, headers={'X-Api-Key': os.getenv('API_KEY')})

    print("hello")
    # return response.json(), response.status_code

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