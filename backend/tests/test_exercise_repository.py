from lib.exercise_repository import ExerciseRepository
from lib.exercise import Exercise


def test_empty_db_is_empty(db_connection):
    db_connection.seed("seeds/users.sql")
    repository = ExerciseRepository(db_connection)
    assert repository.all() == []


def test_create_exercise_empty_db(db_connection):
    db_connection.seed("seeds/users.sql")
    repository = ExerciseRepository(db_connection)
    new_exercise = [{"id": None, "name": "Name_1", "type": "type_1", "muscle": "muscle_1", "equipment": "equipment_1", "difficulty": "difficulty_1", "instructions": "instructions_1"}]
    repository.save_data_to_db(new_exercise),
    assert repository.all() == [Exercise(1,"Name_1", "type_1", "muscle_1", "equipment_1", "difficulty_1", "instructions_1")]    
   


