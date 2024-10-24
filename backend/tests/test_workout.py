from lib.workout import Workout
import json


def test_construct():
    workout = Workout("test_workout", False)
    assert workout.user_username == "test_workout"
    assert workout.planning_mode == False

def test_add_exercise():
    workout = Workout("test_workout", False)
    exercise = type('Exercise', (object,), {'name': 'test_exercise'})()
    workout.add_exercise(exercise)
    assert workout.exercise_list[-1] == {
        'name': "test_exercise",
        'loading': [],
        'reps': [],
        'complete': False
    }   

def test_add_exercise_else_condition():
    workout = Workout("test_workout", False) 
    exercise1 = type('Exercise', (object,), {'name': 'first_exercise'})()
    workout.add_exercise(exercise1)
    result = workout.add_exercise(type('Exercise', (object,), {'name': 'second_exercise'})()) 
    assert result == "To add a new exercise, mark the previously added exercise to complete"
    assert len(workout.exercise_list) == 1

def test_add_loading():
    workout = Workout("test_workout", False)
    exercise = type('Exercise', (object,), {'name': 'test_exercise'})()
    workout.add_exercise(exercise) 
    workout.add_loading(50) 
    assert workout.exercise_list[-1]['loading'] == ['50kg']


def test_add_reps_under_six():
    workout = Workout("test_workout", False)
    exercise = type('Exercise', (object,), {'name': 'test_exercise'})()
    workout.add_exercise(exercise) 
    workout.add_reps(10)  
    assert workout.exercise_list[-1]['reps'] == [10]
    assert workout.exercise_list[-1]['complete'] == False


def test_add_reps_until_complete():
    workout = Workout("test_workout", False)
    exercise = type('Exercise', (object,), {'name': 'test_exercise'})()
    workout.add_exercise(exercise) 
    for _ in range(6):
        workout.add_reps(10)
    assert workout.exercise_list[-1]['reps'] == [10, 10, 10, 10, 10, 10]
    assert workout.exercise_list[-1]['complete'] == True

def test_complete_exercise():
    workout = Workout("test_workout", False)
    exercise = type('Exercise', (object,), {'name': 'test_exercise'})()
    workout.add_exercise(exercise) 
    workout.complete_exercise()  
    assert workout.exercise_list[-1]['complete'] == True    

def test_complete_workout_not_in_planning_mode():
    workout = Workout("test_workout", False)
    workout.complete = False 
    workout.complete_workout()
    assert workout.complete == True
    

def test_complete_workout_in_planning_mode():
    workout = Workout("test_workout", True)
    workout.complete = False 
    workout.complete_workout() 
    assert workout.complete == False

def test_equal_objects():
    # Setup
    workout1 = Workout("test_workout", False)
    workout2 = Workout("test_workout", False)

    # Act & Assert
    assert workout1 == workout2  # These should be equal

def test_repr():
    workout1 = Workout("test_workout", False)
    expected_repr = "Workout(Y/m/d%, [], False, test_workout)"
    assert repr(workout1) == expected_repr

def test_to_json():
    workout = Workout("test_workout", False)
    expected_json = json.dumps({
        "date": workout.date,
        "exercise_list": workout.exercise_list,
        "complete": workout.complete,
        "user_username": workout.user_username,
        "planning_mode": workout.planning_mode,
    }, default=lambda o: o.__dict__)
    assert workout.toJson() == expected_json

