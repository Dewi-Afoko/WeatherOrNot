from unittest.mock import patch
import json

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

