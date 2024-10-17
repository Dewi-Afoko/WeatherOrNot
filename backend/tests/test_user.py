from lib.user import User

"""
Constructs an id, username, password
"""
def test_construct():
    user = User(1, "test_username", "test_password")
    assert user.id == 1
    assert user.username == "test_username"
    assert user.password == "test_password"


"""
Spaces with equal contents are equal
"""
def test_compares():
    user_1 = User(1, "test_username", "test_password")
    user_2 = User(1, "test_username", "test_password")
    assert user_1 == user_2

"""
Spaces can be represented as strings
"""


def test_string():
    user = User(1, "test_username", "test_password")
    assert str(user) == "User(1, test_username, test_password, [], , , , )"

def test_user_sets_all_properties():
    user = User(1, "Dewi", "password")
    
    assert user.id == 1
    assert user.username == "Dewi"
    assert user.password == "password"
    assert user.exercise_list == []
    assert user.first_name == ""
    assert user.last_name == ""
    assert user.dob == ""
    assert user.height == ""

def test_repr():
    user = User(1, "Dewi", "password")
    expected_repr = "User(1, Dewi, password, [], , , , )"
    
    assert repr(user) == expected_repr