from lib.exercise_repository import ExerciseRepository
from lib.exercise import Exercise
from unittest.mock import patch
import json

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
   

def test_fetch_data_from_api(web_client):
    # Mock the data that we want
    mock_response_data = [
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "type": "strength"
  },
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "type": "cardio"
    },
  {
    "muscle": "biceps",
    "difficulty": "intermediate",
    "type": "strongman"
  }]
    # Patch function replaces requests.get with a mock, it makes a fake HTTP request
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200 # Sets the status code to 200
        mock_get.return_value.json.return_value = mock_response_data 
        # Defines the JSON data that the mock should return when response.json is called in the route
        #  Conftest.py file
        response = web_client.get("/get_new_exercises")
        assert response.status_code == 200
        # json.loads converts json data into a python dictionary
        response_data = json.loads(response.data)
        assert response_data[1]['muscle'] == "biceps"
        assert response_data[1]['difficulty'] == "beginner"
        assert response_data[1]['type'] == "cardio"

