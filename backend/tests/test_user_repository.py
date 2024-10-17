from lib.user_repository import UserRepository
from lib.user import User


"""
When I call # all
I get all the Users
"""
# def test_all(db_connection):
#     db_connection.seed("seeds/test_users.sql")
#     repository = UserRepository(db_connection)
#     assert repository.all() == [
#     User(1, 'Dewi','password'),
#     User(2, 'Edgar' ,'Password'),
#     User(3, 'Chris','Passwordd'),
#        ]    

"""Dewi's test suite"""

import pytest
from lib.user_repository import UserRepository
from lib.user import User
import bcrypt



def test_empty_db_is_empty(db_connection):
    repository = UserRepository(db_connection)
    assert repository.all() == []


def test_find_user_on_empty_db(db_connection):
    repository = UserRepository(db_connection)
    with pytest.raises(IndexError):  # IndexError as return is list[0]
        repository.find_by_username('NonExistingUser')


def test_create_user_empty_db(db_connection):
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
    
    new_user = User(None, 'Testo', 'password')
    repository.create_user(new_user)
    
    response = repository.add_details('Testo', 'Dewi', 'Afoko', '1988_04_11', "201cm") 
    assert response == "Details Updated"
    
    updated_user = repository.find_by_username('Testo')
    assert updated_user.username == 'Testo'
    assert updated_user.first_name == 'Dewi'
    assert updated_user.last_name == 'Afoko'
    assert updated_user.dob == '1988_04_11'
    assert updated_user.height == "201cm"


