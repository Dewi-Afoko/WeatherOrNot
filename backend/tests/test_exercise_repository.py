import pytest
from unittest.mock import patch, MagicMock
from lib.exercise_repository import ExerciseRepository

def test_empty_db_is_empty(db_connection):
    repository = ExerciseRepository(db_connection)
    exercises = repository.all()
    assert len(exercises) == 0

@patch('requests.get')
def test_fetch_data_from_api_success(mock_get, db_connection):
    repository = ExerciseRepository(db_connection)
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = [
        {
            "name": "Jumping Jacks",
            "type": "cardio",
            "muscle": "legs",
            "equipment": "none",
            "difficulty": "beginner",
            "instructions": "Stand with your feet together and your hands at your sides..."
        }
    ]
    mock_get.return_value = mock_response

    repository.fetch_data_from_api("type", ["cardio"])
    
    exercises = repository.all()
    assert len(exercises) == 1
    assert exercises[0].name == "Jumping Jacks"
    assert exercises[0].type == "cardio"
    assert exercises[0].muscle == "legs"

@patch('requests.get')
def test_fetch_data_from_api_failure(mock_get, db_connection):
    repository = ExerciseRepository(db_connection)
    
    # Clear any existing data in the database
    repository.delete_all_exercises()  # Ensure this method exists

    mock_response = MagicMock()
    mock_response.status_code = 404
    mock_get.return_value = mock_response

    # Fetching data from the API should not raise an error, but also not save any data
    repository.fetch_data_from_api("type", ["cardio"])
    
    exercises = repository.all()
    assert len(exercises) == 0

@patch('lib.exercise_repository.ExerciseRepository.fetch_data_from_api')
def test_fetch_all_data(mock_fetch, db_connection):
    repository = ExerciseRepository(db_connection)
    repository.fetch_all_data()
    # Expected calls: 1x type, 1x muscle, 1x difficulty
    expected_calls = 3  
    assert mock_fetch.call_count == expected_calls


# Test for `save_data_to_db`
def test_save_data_to_db(db_connection):
    repository = ExerciseRepository(db_connection)
    repository.delete_all_exercises()  # Assuming there's a method to clear the database for tests
    exercises = [
        {
            "name": "Push Up",
            "type": "strength",
            "muscle": "chest",
            "equipment": "none",
            "difficulty": "beginner",
            "instructions": "Start push ups by having hand "
            }]


