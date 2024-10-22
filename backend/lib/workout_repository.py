from lib.workout import Workout

class WorkoutRepository:
    def __init__(self, connection):
        self._connection = connection

    def save_workout(self, workout):
        self._connection.execute("INSERT INTO workouts (date, exercise_list, complete, user_username) VALUES (%s, %s, %s, %s, %s)", [workout.date, workout.exercise_list, workout.complete, workout.user_username])
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


#TODO If we want to create partial objects in the database, we need update methods that encapsulate Workout class functions; current idea is to only send instance to DB upon marking complete -- unsure if this is actually possible.