from lib.exercise import Exercise

"""
Constructs an id, name, type, muscle, equipment, difficulty, instructions
"""
def test_construct():
    exercise = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    assert exercise.id == 1
    assert exercise.name == "Name_1"
    assert exercise.type == "type_1"
    assert exercise.muscle == "muscle_1"
    assert exercise.equipment == "equipment_1"
    assert exercise.difficulty == "difficulty_1"
    assert exercise.instructions == "instructions_1"


"""
Spaces with equal contents are equal
"""
def test_compares():
    exercise_1 = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    exercise_2 = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    assert exercise_1 == exercise_2

"""
Spaces can be represented as strings
"""
def test_string():
    exercise = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    assert str(exercise) == "Exercise(1, name_1, type, muscle_1, equipment_1, difficulty_1, instructions_1)"