class User:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
        self.exercise_list = []
        self.first_name = ""
        self.last_name = ""
        self.dob = ""
    
    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.password}, {self.exercise_list}, {self.first_name}, {self.last_name}, {self.dob})"
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "exercise_list": self.exercise_list,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "dob":self.dob }
    
    def add_exercise(self, exercise):
        self.exercise_list.append(exercise)