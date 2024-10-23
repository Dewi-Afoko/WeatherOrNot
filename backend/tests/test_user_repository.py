import pytest
from lib.user_repository import UserRepository
from lib.user import User
import bcrypt

def test_empty_db_is_empty(db_connection):
    db_connection.seed("seeds/users.sql")
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    assert repository.all() == []


def test_find_user_on_empty_db(db_connection):
    repository = UserRepository(db_connection)
    user = repository.find_by_username('NonExistingUser')
    assert user is None


def test_create_user_on_empty_db(db_connection):
    repository = UserRepository(db_connection)
    new_user = User(None, 'Test', 'password')
    response = repository.create_user(new_user)
    assert response == 'User added'
    user = repository.find_by_username('Test')
    assert user.username == 'Test'
    password_bytes = 'password'.encode('utf-8')
    assert bcrypt.checkpw(password_bytes, user.password.encode('utf-8'))



def test_add_details_after_user_creation_empty_db(db_connection):
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    new_user = User(None, 'Username_Test', 'password')
    repository.create_user(new_user)
    response = repository.add_details('Username_Test', 'FirstName_Test', 'LastName_Test', '1988_04_11', "201cm", "90") 
    assert response == "Details Updated"
    updated_user = repository.find_by_username('Username_Test')
    assert updated_user.username == 'Username_Test'
    assert updated_user.first_name == 'FirstName_Test'
    assert updated_user.last_name == 'LastName_Test'
    assert updated_user.dob == '1988_04_11'
    assert updated_user.height == "201cm"
    assert updated_user.weight == [90]


def test_find_user_by_username(db_connection):
    repository = UserRepository(db_connection)
    new_user = User(None, 'Test', 'password')
    repository.create_user(new_user)
    user = repository.find_by_username('Test')
    assert user.username == 'Test'



def test_get_all_users_details(db_connection):
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    new_user = User(None, 'Username_Test', 'password')
    repository.create_user(new_user)
    response = repository.add_details('Username_Test', 'FirstName_Test', 'LastName_Test', '1988_04_11', "201cm", "90") 
    assert response == "Details Updated"
    updated_user = repository.find_by_username('Username_Test')
    assert updated_user.username == 'Username_Test'
    assert updated_user.first_name == 'FirstName_Test'
    assert updated_user.last_name == 'LastName_Test'
    assert updated_user.dob == '1988_04_11'
    assert updated_user.height == "201cm"
    assert updated_user.weight == [90]
    details = repository.user_details('Username_Test')
    assert details[0] == 'FirstName_Test'
    assert details[1] == 'LastName_Test'
    assert details[2] == '1988_04_11'
    assert details[3] == '201cm'


def test_gets_one_favourite_exercise(db_connection):
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    new_user = User(None, 'Username_Test', 'password')
    repository.create_user(new_user)
    exercise = 'Exercise_Test'
    repository.add_exercise('Username_Test',exercise)
    exercise_list = repository.find_favourite_exercises('Username_Test')
    assert exercise_list[0] == 'Exercise_Test'
    
    
def test_gets_multiple_favourite_exercises(db_connection):
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    new_user = User(None, 'Username_Test', 'password')
    repository.create_user(new_user)
    exercise_1 = 'Exercise_Test_1'
    repository.add_exercise('Username_Test',exercise_1)
    exercise_2 = 'Exercise_Test_2'
    repository.add_exercise('Username_Test',exercise_2)
    exercise_3 = 'Exercise_Test_3'
    repository.add_exercise('Username_Test',exercise_3)
    exercise_list = repository.find_favourite_exercises('Username_Test')
    assert exercise_list[0] == 'Exercise_Test_1'
    assert exercise_list[1] == 'Exercise_Test_2'
    assert exercise_list[2] == 'Exercise_Test_3'


def test_delete_exercise_from_list(db_connection):
    repository = UserRepository(db_connection)
    repository.delete_all_users()
    new_user = User(None, 'Username_Test', 'password')
    repository.create_user(new_user)
    exercise_1 = 'Exercise_Test_1'
    repository.add_exercise('Username_Test',exercise_1)
    exercise_2 = 'Exercise_Test_2'
    repository.add_exercise('Username_Test',exercise_2)
    exercise_3 = 'Exercise_Test_3'
    repository.add_exercise('Username_Test',exercise_3)
    exercise_list = repository.find_favourite_exercises('Username_Test')
    assert exercise_list[0] == 'Exercise_Test_1'
    assert exercise_list[1] == 'Exercise_Test_2'
    assert exercise_list[2] == 'Exercise_Test_3'
    repository.delete_exercise('Username_Test', 'Exercise_Test_2')
    exercise_list = repository.find_favourite_exercises('Username_Test')
    assert exercise_list[0] == 'Exercise_Test_1'
    assert exercise_list[1] == 'Exercise_Test_3'




