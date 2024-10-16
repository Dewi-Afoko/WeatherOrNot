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
            print(user)
        if user : 
            return user[0]
        else : 
            return None
    
    def create_user(self, user):
        password_bytes = user.password.encode('Utf-8')
        hashed = bcrypt.hashpw(password_bytes,bcrypt.gensalt(14))
        print(hashed)
        passw = hashed.decode('utf-8')
        print(passw)
        self._connection.execute(
            "INSERT INTO users (username, password, exercise_list, first_name, last_name, dob) VALUES (%s, %s,%s, %s,%s, %s)",
            [user.username, passw, user.exercise_list, user.first_name, user.last_name, user.dob]
        )
        return 'User added'
    


    def add_details(self, username, first_name, last_name, dob): #TODO Set default values in frontend
        current_user = self.find_by_username(username)
        if len(first_name) > 1:
            self._connection.execute("UPDATE users SET first_name = %s WHERE username = %s", [first_name, current_user.username])
        if len(last_name) > 1:
            self._connection.execute("UPDATE users SET last_name = %s WHERE username = %s", [last_name, current_user.username])
        if len(dob) > 1:
            self._connection.execute("UPDATE users SET dob = %s WHERE username = %s", [dob, current_user.username])
        return "Details Updated"
    