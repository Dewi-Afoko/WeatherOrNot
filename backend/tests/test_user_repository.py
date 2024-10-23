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
    repository.delete_user('Username_Test')
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


