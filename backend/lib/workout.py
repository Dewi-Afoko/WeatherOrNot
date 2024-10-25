from datetime import datetime
import json
class Workout:
    def __init__(self, username, planning=False): # Datetime string and User object passed in
        self.date = datetime.now().strftime('Y%/m%/d%')
        self.exercise_list = []
        self.complete = False
        self.user_username = username
        self.planning_mode = planning #TODO: Implement planning mode, means no need to complete exercises and "template" created in DB.

    def add_exercise(self, exercise):
        if len(self.exercise_list) == 0 or self.exercise_list[-1]['complete'] == True or self.planning_mode == True:
            self.exercise_list.append(
            {
            'name' : exercise.name,
            'loading' : [],
            'reps' : [],
            'complete' : False
            }
            )
        else:
            return "To add a new exercise, mark the previously added exercise to complete"

    def add_loading(self, loading):
        if self.exercise_list[-1]['complete'] == False:
            self.exercise_list[-1]['loading'].append(f'{loading}kg')


    def add_reps(self, reps):
        if len(self.exercise_list[-1]['reps']) <= 6:
            self.exercise_list[-1]['reps'].append(reps)
        if len(self.exercise_list[-1]['reps']) == 6:
            self.exercise_list[-1]['complete'] = True
        
    def complete_exercise(self):
        self.exercise_list[-1]['complete'] = True

    def complete_workout(self):
        if self.planning_mode == False:
            self.complete = True

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.user_username,
            "exercise_list": self.exercise_list,
            "date":self.date,
            "complete":self.complete
            }
    
    def __eq__(self, other):
        return self.__dict__ == other.__dict__
    
    def __repr__(self):
        return f'Workout({self.date}, {self.exercise_list}, {self.complete}, {self.user_username})'
