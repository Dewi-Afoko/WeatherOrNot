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
Exercises can be represented as strings
"""
def test_string():
    exercise = Exercise(1, "name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    assert str(exercise) == "Exercise(1, name_1, type_1, muscle_1, equipment_1, difficulty_1, instructions_1)"

    
"""
Test the to_dict method of Exercise
"""
def test_to_dict():
    exercise = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    expected_dict = {
        "id": 1,
        "name": "Name_1",
        "type": "type_1",
        "muscle": "muscle_1",
        "equipment": "equipment_1",
        "difficulty": "difficulty_1",
        "instructions": "instructions_1",
    }
    assert exercise.to_dict() == expected_dict


"""
Test the equality comparison of Exercise instances
"""
def test_exercise_equality():
    exercise_1 = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    exercise_2 = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")
    exercise_3 = Exercise(2, "Name_2", "type_2", "muscle_2", "equipment_2", "difficulty_2", "instructions_2")
    exercise_4 = Exercise(1, "Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "different_instructions")

    # Test equality of identical instances
    assert exercise_1 == exercise_2  # Should be equal

    # Test equality of different instances
    assert exercise_1 != exercise_3  # Different id and attributes
    assert exercise_1 != exercise_4  # Same id and attributes, but different instructions

    # Test comparison with an unrelated object
    assert exercise_1 == exercise_1  # Same instance should be equal
    assert exercise_1 != "not_an_exercise"  # Comparing with a non-Exercise object should return NotImplemented