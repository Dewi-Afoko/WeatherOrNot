from lib.exercise_repository import ExerciseRepository
from lib.exercise import Exercise
from unittest.mock import patch
import json

def test_empty_db_is_empty(db_connection):
    db_connection.seed("seeds/users.sql")
    repository = ExerciseRepository(db_connection)
    assert repository.all() == []


