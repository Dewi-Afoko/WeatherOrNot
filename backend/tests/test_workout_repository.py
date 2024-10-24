import pytest
import json
from unittest.mock import MagicMock
from lib.workout_repository import WorkoutRepository

def test_my_workouts_with_entries():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    username = "test_user"
    mock_rows = [
        {
            "user_username": "test_user",
            "date": "2024-10-24",
            "exercise_list": "[]",  
            "complete": False
        },
        {
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
    mock_workout = [
        {
            "user_username": "Testy",
            "date": "2024-10-24",
            "exercise_list": "[]",  
            "complete": False
        }
    ]
    repository.my_workouts = MagicMock(return_value=mock_workout)
    exercise = {"name": "Push-Up", "reps": 10} 
    response = repository.update_workout(exercise)
    assert response == "Workout Updated"
    db_connection.execute.assert_called_once_with(
        'UPDATE workouts SET exercise_list = exercise_list || %s::jsonb WHERE user_username = %s', 
        [json.dumps([exercise]), "Testy"]
    )
