from unittest.mock import patch, Mock
import json
import pytest
from flask import jsonify



# GET /get_exercises 
def test_api_call_response_200_get_exercises(web_client):
    response = web_client.get("/get_new_exercises")
    assert response.status_code == 200

# GET /get_exercises mock data
def test_api_call_gets_data(web_client):
    # Mock the data that we want
    mock_response_data = [
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "equipment": "dumbbell"
  },
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "equipment": "barbell"
    },
  {
    "muscle": "biceps",
    "difficulty": "intermediate",
    "equipment": "barbell"
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
        assert response_data[1]['equipment'] == "barbell"

# GET/ get_new_exercises API
@patch('app.os.getenv')
@patch('app.requests.get')
def test_get_new_exercises_success(mock_get, mock_getenv, web_client):
    # Set up the mock for os.getenv to return the expected API key
    mock_getenv.return_value = 'mock_api_key'
    # Mock API response data
    mock_response_data = [
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "equipment": "dumbbell"
  },
  {
    "muscle": "biceps",
    "difficulty": "beginner",
    "equipment": "barbell"
    },
  {
    "muscle": "biceps",
    "difficulty": "intermediate",
    "equipment": "barbell"
  }]
    # Create a mock response object with status_code and json method
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = mock_response_data
    # Set the return value of requests.get to this mock response
    mock_get.return_value = mock_response
    # Make the GET request to the route with query params
    response = web_client.get('/get_new_exercises?muscle=biceps&difficulty=beginner&equipment=barbell')
    # Check if the correct response is returned
    assert response.status_code == 200
    assert response.json == mock_response_data
    # Ensure the mock API was called with the correct parameters
    mock_get.assert_called_once_with(
        'https://api.api-ninjas.com/v1/exercises',
        params={'muscle': 'biceps', 'difficulty': 'beginner', 'equipment': 'barbell'},
        headers={'X-Api-Key': 'mock_api_key'}
    )

# GET/ get_new_exercises API
# Failure
@patch('app.requests.get')
def test_get_new_exercises_failure(mock_get, web_client):
    # Simulate an API failure (e.g., 500 server error)
    mock_get.return_value.status_code = 500
    # Make the GET request to the route
    response = web_client.get('/get_new_exercises?muscle=chest')
    # Check if the error response is returned correctly
    assert response.status_code == 500
    assert response.json == {'error': 'Failed to fetch exercises'}

# GET /exercise
@patch('app.os.getenv')
@patch('app.requests.get')
def test_get_single_exercises_success(mock_get, mock_getenv, web_client):
    # Set up mock for os.getenv to return the expected API key
    mock_getenv.return_value = 'mock_api_key'
    # Mock API response data
    mock_response_data = [
        {
            "name": "landmine_twist",
            "muscle": "abdominals",
            "difficulty": "intermediate",
            "equipment": "other"
        }
    ]
    # Create mock response object with status_code and json method
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = mock_response_data
    # Set return value of requests.get to mock response
    mock_get.return_value = mock_response
    # Make GET request to route with query params
    response = web_client.get('/exercise?name=landmine_twist')  # Change the URL here to /exercise
    # Check if correct response returned
    assert response.status_code == 200
    assert response.json == mock_response_data
    # mock API called with the params
    mock_get.assert_called_once_with(
        'https://api.api-ninjas.com/v1/exercises',
        params={'name': 'landmine_twist'},
        headers={'X-Api-Key': 'mock_api_key'}
    )

# GET /exercise
# Failure
@patch('app.requests.get')
def test_get_single_exercise_failure(mock_get, web_client):
    # Simulate an API failure
    mock_get.return_value.status_code = 500
    response = web_client.get('/exercise?name=elbow_plank') 
    # Check if the error response is returned correctly
    assert response.status_code == 500
    assert response.json == {'error': 'Failed to fetch exercise'}


# GET /get_favourites
@patch('app.UserRepository')  # Mock the UserRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_get_favourite_exercises_success(mock_get_db_conn, mock_user_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repos behavior
    mock_repo_instance = mock_user_repo.return_value
    mock_repo_instance.find_favourite_exercises.return_value = [
        {
            "name": "Push Up",
            "muscle": "chest",
            "difficulty": "medium",
            "equipment": "none"
        },
        {
            "name": "Squat",
            "muscle": "legs",
            "difficulty": "hard",
            "equipment": "barbell"
        }
    ]
    # Make the GET request to the route with a username parameter
    response = web_client.get('/get_favourites?username=test_user')
    # Check if the correct response is returned
    assert response.status_code == 200
    assert response.json == [
        {
            "name": "Push Up",
            "muscle": "chest",
            "difficulty": "medium",
            "equipment": "none"
        },
        {
            "name": "Squat",
            "muscle": "legs",
            "difficulty": "hard",
            "equipment": "barbell"
        }
    ]
    # Ensure the repository method was called with the correct parameter
    mock_repo_instance.find_favourite_exercises.assert_called_once_with("test_user")
    
# GET /get_favourites
# Empty list
@patch('app.UserRepository')
@patch('app.get_flask_database_connection')
def test_get_favourite_exercises_no_favourites(mock_get_db_conn, mock_user_repo, web_client):
    # Mock connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    mock_repo_instance = mock_user_repo.return_value
    # Return an empty list of favorite exercises
    mock_repo_instance.find_favourite_exercises.return_value = []
    # Make the GET request with a username
    response = web_client.get('/get_favourites?username=test_user')
    # Check for empty list response
    assert response.status_code == 200
    assert response.json == []
    # Ensure repository method was called
    mock_repo_instance.find_favourite_exercises.assert_called_once_with("test_user")


# POST /add_favourite
@patch('app.UserRepository')  # Mock the UserRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_add_favourite_success(mock_get_db_conn, mock_user_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior
    mock_repo_instance = mock_user_repo.return_value
    mock_repo_instance.add_exercise.return_value = None  # The function returns None on success
    # Define the POST data (JSON body)
    post_data = {
        "user": "test_user",
        "name": "Push Up"
    }
    # Make the POST request to the route
    response = web_client.post('/add_favourite', json=post_data)
    # Check if the correct response is returned
    assert response.status_code == 201
    assert response.json == {"message": "Favourite exercise added"}
    # Ensure the repository method was called with the correct arguments
    mock_repo_instance.add_exercise.assert_called_once_with("test_user", "Push Up")

# POST /add_favourite
# failure
@patch('app.UserRepository')
@patch('app.get_flask_database_connection')
def test_add_favourite_missing_data(mock_get_db_conn, mock_user_repo, web_client):
    # Mock connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    mock_repo_instance = mock_user_repo.return_value
    # Define the POST data with missing exercise name
    post_data = {
        "user": "test_user"
    }
    # Make the POST request
    response = web_client.post('/add_favourite', json=post_data)
    # Check if the response status code is 400 (Bad Request)
    assert response.status_code == 400
    assert "error" in response.json
    # Ensure repository method was not called since data is missing
    mock_repo_instance.add_exercise.assert_not_called()


# DELETE /delete_favourite
@patch('app.UserRepository')  # Mock the UserRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_delete_favourite_success(mock_get_db_conn, mock_user_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior
    mock_repo_instance = mock_user_repo.return_value
    mock_repo_instance.delete_exercise.return_value = None  # Assume the function returns None on success
    # Define the DELETE data (JSON body)
    delete_data = {
        "user": "test_user",
        "name": "Push Up"
    }
    # Make the DELETE request to the route
    response = web_client.delete('/delete_favourite', json=delete_data)
    # Check if the correct response is returned
    assert response.status_code == 200
    assert response.json == {"message": "Favourite exercise deleted"}
    # Ensure the repository method was called with the correct arguments
    mock_repo_instance.delete_exercise.assert_called_once_with("test_user", "Push Up")

# DELETE /delete_favourite
# failure
@patch('app.UserRepository')
@patch('app.get_flask_database_connection')
def test_delete_favourite_missing_data(mock_get_db_conn, mock_user_repo, web_client):
    # Mock connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    mock_repo_instance = mock_user_repo.return_value
    # Define the DELETE data with missing exercise name
    delete_data = {
        "user": "test_user"
    }
    # Make the DELETE request with missing data
    response = web_client.delete('/delete_favourite', json=delete_data)
    # Check for 400 Bad Request response
    assert response.status_code == 400
    assert response.json == {"error": "Username and exercise name are required"}
    # Ensure repository method was not called
    mock_repo_instance.delete_exercise.assert_not_called()


# POST /workouts
@patch('app.WorkoutRepository')  # Mock the WorkoutRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_add_workout_success(mock_get_db_conn, mock_workout_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior
    mock_repo_instance = mock_workout_repo.return_value
    mock_repo_instance.save_workout.return_value = {
        "user": "test_user",
        "workout": "Chest Day",
        "date": "2024/10/24"
    }
    # Define the POST data (JSON body)
    post_data = {
        "user": "test_user",
        "workout": "Chest Day"
    }
    # Make the POST request to the route
    response = web_client.post('/workouts', json=post_data)
    # Check if the correct response is returned
    assert response.status_code == 201
    assert response.json == {
        "user": "test_user",
        "workout": "Chest Day",
        "date": "2024/10/24"
    }
    # Ensure the repository method was called with the correct data
    mock_repo_instance.save_workout.assert_called_once()
    saved_data = mock_repo_instance.save_workout.call_args[0][0]  # Get the argument passed to save_workout
    assert saved_data['user'] == "test_user"
    assert saved_data['workout'] == "Chest Day"
    assert 'date' in saved_data  # Ensure the date was added

# POST /workouts
# failure
# @patch('app.WorkoutRepository')
# @patch('app.get_flask_database_connection')
# def test_add_workout_missing_user(mock_get_db_conn, mock_workout_repo, web_client):
#     # Mock database connection and repository
#     mock_connection = Mock()
#     mock_get_db_conn.return_value = mock_connection
#     # Mock the repository's behavior to return valid data
#     mock_repo_instance = mock_workout_repo.return_value
#     mock_repo_instance.save_workout.return_value = {
#         "user": "test_user",
#         "workout": "Chest Day",
#         "date": "2024/10/24"
#     }
#     # Define the POST data with missing 'user'
#     post_data = {
#         "workout": "Chest Day"
#     }
#     # Make the POST request
#     response = web_client.post('/workouts', json=post_data)
#     # Check for 400 Bad Request response
#     assert response.status_code == 400
#     assert "error" in response.json
#     # Ensure repository method was not called
#     mock_repo_instance.save_workout.assert_not_called()


# POST /post_exercises
@patch('app.ExerciseRepository')  # Mock the ExerciseRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_post_exercises_success(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.fetch_all_data.return_value = [{"exercise": "Push Up", "difficulty": "Medium"}]
    mock_repo_instance.store_data.return_value = None  # Assume storing returns None
    # Make the POST request to the route
    response = web_client.post('/post_exercises')
    # Check if the correct response is returned
    assert response.status_code == 200
    assert response.json == {"message": "Data fetched and stored successfully!"}
    # Ensure the repository methods were called
    mock_repo_instance.fetch_all_data.assert_called_once()
    mock_repo_instance.store_data.assert_called_once_with([{"exercise": "Push Up", "difficulty": "Medium"}])

# POST /post_exercise
# Failure - no data 
@patch('app.ExerciseRepository')
@patch('app.get_flask_database_connection')
def test_post_exercises_no_data(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior (no data returned)
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.fetch_all_data.return_value = None
    # Make the POST request
    response = web_client.post('/post_exercises')
    # Check for 400 Bad Request response
    assert response.status_code == 400
    assert response.json == {"error": "No data received from the API"}
    # Ensure the repository method was called but no data was stored
    mock_repo_instance.fetch_all_data.assert_called_once()
    mock_repo_instance.store_data.assert_not_called()

# POST /post_exercise
# API failure 
@patch('app.ExerciseRepository')
@patch('app.get_flask_database_connection')
def test_post_exercises_api_failure(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository to raise an exception
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.fetch_all_data.side_effect = Exception("API failure")
    # Make the POST request
    response = web_client.post('/post_exercises')
    # Check for 500 Internal Server Error response
    assert response.status_code == 500
    assert response.json == {"error": "Failed to fetch data from the API"}
    # Ensure the repository method was called and an exception was raised
    mock_repo_instance.fetch_all_data.assert_called_once()


# GET /get_exercises
@patch('app.ExerciseRepository')  # Mock the ExerciseRepository
@patch('app.get_flask_database_connection')  # Mock the database connection function
def test_get_exercises_success(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.all.return_value = [
        Mock(to_dict=Mock(return_value={"name": "Push Up", "difficulty": "Medium"})),
        Mock(to_dict=Mock(return_value={"name": "Squat", "difficulty": "Hard"}))
    ]
    # Make the GET request to the route
    response = web_client.get('/get_exercises')
    # Check if the correct response is returned
    assert response.status_code == 200
    assert response.json == [
        {"name": "Push Up", "difficulty": "Medium"},
        {"name": "Squat", "difficulty": "Hard"}
    ]
    # Ensure the repository method was called
    mock_repo_instance.all.assert_called_once()

# GET /get_exercises
# Failure - no data
@patch('app.ExerciseRepository')
@patch('app.get_flask_database_connection')
def test_get_exercises_no_data(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository's behavior (return no exercises)
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.all.return_value = []
    # Make the GET request
    response = web_client.get('/get_exercises')
    # Check for 404 Not Found response
    assert response.status_code == 404
    assert response.json == {"message": "No exercises found"}
    # Ensure the repository method was called
    mock_repo_instance.all.assert_called_once()

# GET /get_exercises
# Repo failure
@patch('app.ExerciseRepository')
@patch('app.get_flask_database_connection')
def test_get_exercises_repository_failure(mock_get_db_conn, mock_exercise_repo, web_client):
    # Mock database connection and repository
    mock_connection = Mock()
    mock_get_db_conn.return_value = mock_connection
    # Mock the repository to raise an exception
    mock_repo_instance = mock_exercise_repo.return_value
    mock_repo_instance.all.side_effect = Exception("Database failure")
    # Make the GET request
    response = web_client.get('/get_exercises')
    # Check for 500 Internal Server Error response
    assert response.status_code == 500
    assert response.json == {"error": "Failed to retrieve exercises"}
    # Ensure the repository method was called and an exception was raised
    mock_repo_instance.all.assert_called_once()
