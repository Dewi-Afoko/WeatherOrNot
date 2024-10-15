class User:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
    
    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.password})"
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            'password':self.password}