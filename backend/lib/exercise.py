from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String, nullable=False)
    muscle = db.Column(db.String, nullable=False)
    equipment = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)

    def __init__(self, id, name, type, muscle, equipment, difficulty, instructions):
        self.id = id
        self.name = name
        self.type = type
        self.muscle = muscle
        self.equipment = equipment
        self.difficulty = difficulty
        self.instructions = instructions


    def to_dict(self):
            """Convert the Exercise instance to a dictionary."""
            return {
                "id": self.id,
                "name": self.name,
                "type": self.type,
                "muscle": self.muscle,
                "equipment": self.equipment,
                "difficulty": self.difficulty,
                "instructions": self.instructions,
            }
        

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    # def __repr__(self):
    #     return f"Exercise({self.id}, {self.name}, {self.type}, {self.muscle}, {self.equipment}, {self.difficulty}, {self.instructions})"
    