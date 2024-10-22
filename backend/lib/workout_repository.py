from lib.workout import Workout
from flask import jsonify
import json

class WorkoutRepository:
    def __init__(self, connection):
        self._connection = connection

    def save_workout(self, workout):
        self._connection.execute("INSERT INTO workouts (date, exercise_list, complete, user_username) VALUES (%s, %s, %s, %s)", [workout['date'], '[]', workout['complete'], workout['user_username']])
        return "Workout created!"

    def my_workouts(self, username):
        rows = self._connection.execute("SELECT * from workouts WHERE user_username = %s",[username])
        workouts = []
        for row in rows:
            item = Workout(row["user_username"])
            item.date = row['date']
            item.exercise_list = row["exercise_list"]
            item.complete = row["complete"]
            workouts.append(item)
        if len(workouts) > 0:
            return workouts
        else:
            return "No workouts found!"
        
    # Exercise is JSON string
    # Require an empty dictionary in the SQL table exercise_list column
    def update_workout(self, exercise):
        workout = self.my_workouts('Testy')
        user = str(workout[0].user_username)
        exercise = json.dumps([exercise])
        self._connection.execute('UPDATE workouts SET exercise_list = exercise_list || %s::jsonb WHERE user_username = %s', [exercise, user])
        return "Workout Updated"
    



#TODO If we want to create partial objects in the database, we need update methods that encapsulate Workout class functions; current idea is to only send instance to DB upon marking complete -- unsure if this is actually possible.