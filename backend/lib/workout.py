from datetime import datetime

class Workout:
    def __init__(self, username): # Datetime string and User object passed in
        self.date = datetime.now().strftime('Y%/m%/d%')
        self.exercise_list = []
        self.complete = False
        self.user_username = username

    def add_exercise(self, exercise):
        if self.exercise_list[-1]['complete'] == True or len(self.exercise_list) == 0:
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
        self.complete = True

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
    
    def __repr__(self):
        return f'Workout({self.date}, {self.exercise_list}, {self.complete}, {self.user_username})'
