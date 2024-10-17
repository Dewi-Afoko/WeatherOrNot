from lib.exercise import Exercise
from flask import jsonify
import requests
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
import os
MY_API_KEY = os.getenv("API_KEY")


class ExerciseRepository:
    def __init__(self, connection):
        self._connection = connection


    def fetch_data_from_api(self):
        muscles =[
            "abdominals",
            'abductors',
            'adductors',
            'biceps',
            'calves',
            'chest',
            'forearms',
            'glutes',
            'hamstrings',
            'lats',
            'lower_back',
            'middle_back',
            'neck',
            'quadriceps',
            'traps',
            'triceps',
            'shoulders'
            ]
        for muscle in muscles:
            url = f"https://api.api-ninjas.com/v1/exercises?muscle={muscle}"
            headers = {"X-Api-Key": MY_API_KEY}
            response = requests.get(url, headers=headers)
            # print(response.json())
            if response.status_code == 200:
                exercises = response.json()
                self.save_data_to_db(exercises)
                # print(exercises)
            # return None
            else:
                print("Failed to fetch data from API:", response.status_code)


    def save_data_to_db(self, exercises):
       for exercise in exercises:
            # print(exercise)
            self._connection.execute(
            "INSERT INTO Exercise (name, type, muscle, equipment, difficulty, instructions) VALUES (%s, %s, %s, %s, %s, %s) ON CONFLICT (name) DO NOTHING",
            [exercise['name'], exercise['type'], exercise['muscle'], exercise['equipment'], exercise['difficulty'], exercise['instructions']])
       


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
