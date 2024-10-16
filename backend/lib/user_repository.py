from lib.user import User
from flask import jsonify
import bcrypt
class UserRepository:
    def __init__(self, connection):
        self._connection = connection

    def all(self):
        rows = self._connection.execute("SELECT * from users")
        users = []
        for row in rows:
            item = User(row["id"], row["username"],row['password'])
            users.append(item)
        return users
    

    def find_by_username(self, username):
        rows = self._connection.execute("SELECT * from users WHERE username = %s",[username])
        user = []
        for row in rows:
            item = User(row["id"], row["username"],row['password'])
            user.append(item)
        return user[0]
    
    def create_user(self, username, password):
        password_bytes = password.encode('Utf-8')
        hashed = bcrypt.hashpw(password_bytes,bcrypt.gensalt(14))
        print(hashed)
        passw = hashed.decode('utf-8')
        print(passw)
        self._connection.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            [username, passw]
        )
        return 'User added'