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
        if not isinstance(other, Exercise):
            return NotImplemented
        return (
            self.id == other.id and
            self.name == other.name and
            self.type == other.type and
            self.muscle == other.muscle and
            self.equipment == other.equipment and
            self.difficulty == other.difficulty and
            self.instructions == other.instructions
    )
    

    def __repr__(self):
        return f"Exercise({self.id}, {self.name}, {self.type}, {self.muscle}, {self.equipment}, {self.difficulty}, {self.instructions})"

    # def __eq__(self, other):
    #     return self.__dict__ == other.__dict__

    
    