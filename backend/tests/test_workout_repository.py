import pytest
import json
from unittest.mock import MagicMock
from lib.workout_repository import WorkoutRepository
from lib.workout import Workout
from datetime import datetime


def test_my_workouts_with_entries():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    username = "test_user"
    mock_rows = [
    {
        "id": 1,  
        "user_username": "test_user",
        "date": "2024-10-24",
        "exercise_list": "[]",
        "complete": False
    },
    {
        "id": 2,  
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
    mock_workout = Workout("Testy")
    mock_workout.id = 1
    mock_workout.date = "2024-10-24"
    mock_workout.exercise_list = "[]"
    mock_workout.complete = False
    repository.my_workouts = MagicMock(return_value=[mock_workout])
    exercise = {"user_username": "Testy", "exercise": {"name": "Push-Up", "reps": 10}}
    response = repository.update_workout(exercise)
    assert response == "Workout Updated"
    db_connection.execute.assert_called_once_with(
        'UPDATE workouts SET exercise_list = exercise_list || %s::jsonb WHERE user_username = %s AND id=%s', 
        [json.dumps([exercise["exercise"]]), "Testy", 1]
    )    

def test_save_workout_when_no_workout_exists():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    workout = {
        "user_username": "test_user",
        "date": "2024/10/24",
        "complete": False
    }
    db_connection.execute = MagicMock(return_value=[])
    response = repository.save_workout(workout)
    assert response == "Workout created!"
    db_connection.execute.assert_any_call(
        "SELECT * FROM workouts WHERE date = %s AND user_username = %s",
        [datetime.now().strftime('%Y/%m/%d'), workout['user_username']]
    )
    db_connection.execute.assert_any_call(
        "INSERT INTO workouts (date, exercise_list, complete, user_username) VALUES (%s, %s, %s, %s)",
        [workout['date'], '[]', workout['complete'], workout['user_username']]
    )


def test_save_workout_when_workout_exists():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    workout = {
        "user_username": "test_user",
        "date": "2024/10/24",
        "complete": False
    }
    db_connection.execute = MagicMock(return_value=[{"id": 1, "date": "2024/10/24", "user_username": "test_user"}])
    response = repository.save_workout(workout)
    assert response == "Workout already created for today"
    db_connection.execute.assert_called_once_with(
        "SELECT * FROM workouts WHERE date = %s AND user_username = %s",
        [datetime.now().strftime('%Y/%m/%d'), workout['user_username']]
    )
    calls = db_connection.execute.mock_calls
    insert_call = (
        "INSERT INTO workouts (date, exercise_list, complete, user_username) VALUES (%s, %s, %s, %s)",
        [workout['date'], '[]', workout['complete'], workout['user_username']]
    )
    assert insert_call not in calls


def test_delete_workout_success():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    workout_id = 1
    db_connection.execute = MagicMock(side_effect=[
        [{"id": workout_id, "date": "2024/10/24", "user_username": "test_user"}],  
        None
    ])
    response = repository.delete_workout(workout_id)
    assert response == "Workout deleted successfully!"
    db_connection.execute.assert_any_call(
        "SELECT * FROM workouts WHERE id = %s", [workout_id]
    )
    db_connection.execute.assert_any_call(
        "DELETE FROM workouts WHERE id = %s", [workout_id]
    )

def test_delete_workout_not_found():
    db_connection = MagicMock()
    repository = WorkoutRepository(db_connection)
    workout_id = 1
    db_connection.execute = MagicMock(return_value=[])
    response = repository.delete_workout(workout_id)
    assert response == "Workout not found!"
    db_connection.execute.assert_called_once_with(
        "SELECT * FROM workouts WHERE id = %s", [workout_id]
    )
    calls = db_connection.execute.mock_calls
    delete_call = ("DELETE FROM workouts WHERE id = %s", [workout_id])
    assert delete_call not in calls