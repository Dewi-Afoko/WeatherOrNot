from lib.exercise import Exercise
from flask import jsonify
import requests
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ExerciseRepository:
    def __init__(self, connection):
        self._connection = connection


    def fetch_data_from_api(self):
        url = "https://api.api-ninjas.com/v1/exercises?muscle=biceps"
        headers = {"Authorization": "Bearer Zt9ZBBcWOof0SqF9CldvBg==E5U6G0d3XwOWmfCl"}
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return response.json()  # Return data as a Python dictionary
        else:
            print("Failed to fetch data from API:", response.status_code)
            return None

    def save_data_to_db(self, data):
        for item in data:
            # Extract fields based on API response structure
            name = item.get("name")
            type = item.get("type")
            muscle = item.get("muscle")
            equipment = item.get("equipment")
            difficulty = item.get("difficulty")
            instructions = item.get("instructions")
# db connect SQL

            # Create a new Exercise object
            exercise = Exercise(
                name=name, type=type, muscle=muscle,
                equipment=equipment, difficulty=difficulty,
                instructions=instructions
            )

            # Add to the session
            db.session.add(exercise)

        # Commit the session to save data in the database
        db.session.commit()


    def all(self):
        rows = self._connection.execute("SELECT * from exercise")
        exercises = []
        for row in rows:
            item = Exercise(
                row["id"], row["name"], row["type"],
                row["muscle"], row["equipment"], row["difficulty"],
                row["instructions"]
            )
            exercises.append(item)
        return exercises
