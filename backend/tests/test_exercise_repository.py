from lib.user_repository import UserRepository
from lib.user import User


"""
When I call # all
I get all the Users
"""
def test_all(db_connection):
    db_connection.seed("seeds/test_users.sql")
    repository = UserRepository(db_connection)
    assert repository.all() == [
    User(1, 'Dewi','password'),
    User(2, 'Edgar' ,'Password'),
    User(3, 'Chris','Passwordd'),
       ]    