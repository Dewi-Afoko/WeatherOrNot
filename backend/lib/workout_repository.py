from lib.workout import Workout
from flask import jsonify
import json
from datetime import datetime

class WorkoutRepository:
    def __init__(self, connection):
        self._connection = connection


    def save_workout(self, workout):
        #TODO: Check if workout for today exists for user, if it does, do nothing.
        date = datetime.now().strftime('%Y/%m/%d')
        date_check = self._connection.execute("SELECT * FROM workouts WHERE date = %s AND user_username = %s", [date, workout['user_username']])
        if not date_check:
            self._connection.execute("INSERT INTO workouts (date, exercise_list, complete, user_username) VALUES (%s, %s, %s, %s)", [workout['date'], '[]', workout['complete'], workout['user_username']])
            return "Workout created!"
        else:
            return "Workout already created for today"


    def my_workouts(self, username):
        rows = self._connection.execute("SELECT * from workouts WHERE user_username = %s",[username])
        workouts = []
        for row in rows:
            item = Workout(row["user_username"])
            item.date = row['date']
            item.id = row['id']
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

        workout = self.my_workouts(exercise['user_username'])
        id = workout[-1].id
        user = str(workout[-1].user_username)
        exercise = json.dumps([exercise['exercise']])
        self._connection.execute('UPDATE workouts SET exercise_list = exercise_list || %s::jsonb WHERE user_username = %s AND id=%s', [exercise, user,id])
        return "Workout Updated"
    

#TODO: Implement fronted and routing
    def delete_workout(self, id):
        rows = self._connection.execute("SELECT * FROM workouts WHERE id = %s", [id])
        if len(rows) == 0:
            return "Workout not found!"
        self._connection.execute("DELETE FROM workouts WHERE id = %s", [id])
        
        return "Workout deleted successfully!"



#TODO If we want to create partial objects in the database, we need update methods that encapsulate Workout class functions; current idea is to only send instance to DB upon marking complete -- unsure if this is actually possible.