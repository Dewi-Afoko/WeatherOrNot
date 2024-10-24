import pytest
import json
from unittest.mock import MagicMock
from lib.workout_repository import WorkoutRepository
from lib.workout import Workout

def test_my_workouts_with_entries():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    username = "test_user"
    mock_rows = [
    {
        "id": 1,  # Add this line
        "user_username": "test_user",
        "date": "2024-10-24",
        "exercise_list": "[]",
        "complete": False
    },
    {
        "id": 2,  # Add this line
        "user_username": "test_user",
        "date": "2024-10-25",
        "exercise_list": "[]",
        "complete": True
    }
]
    db_connection.execute = MagicMock(return_value=mock_rows)
    workouts = repository.my_workouts(username)
    assert len(workouts) == 2
    assert workouts[0].user_username == "test_user"
    assert workouts[0].date == "2024-10-24"
    assert workouts[0].complete is False
    assert workouts[1].user_username == "test_user"
    assert workouts[1].date == "2024-10-25"
    assert workouts[1].complete is True


####### for this test to pass lines 32/33 was updated in workout_repo.py
def test_my_workouts_no_entries():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    username = "test_user"
    db_connection.execute = MagicMock(return_value=[])
    result = repository.my_workouts(username)
    assert result == "No workouts found!"
    



def test_update_workout_existing():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    
    # Create a mock Workout object
    mock_workout = Workout("Testy")
    mock_workout.id = 1
    mock_workout.date = "2024-10-24"
    mock_workout.exercise_list = "[]"
    mock_workout.complete = False
    
    # Mock the my_workouts method to return a list with the mock Workout object
    repository.my_workouts = MagicMock(return_value=[mock_workout])
    
    # Create the exercise dictionary as required by the update_workout method
    exercise = {"user_username": "Testy", "exercise": {"name": "Push-Up", "reps": 10}}
    
    # Call the update_workout method
    response = repository.update_workout(exercise)
    
    # Check the response
    assert response == "Workout Updated"
    
    # Ensure the execute method was called with the correct parameters
    db_connection.execute.assert_called_once_with(
        'UPDATE workouts SET exercise_list = exercise_list || %s::jsonb WHERE user_username = %s AND id=%s', 
        [json.dumps([exercise["exercise"]]), "Testy", 1]
    )    
