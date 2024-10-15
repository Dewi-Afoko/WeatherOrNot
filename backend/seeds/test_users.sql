DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text,
    password text
);

INSERT INTO users (username, password) VALUES ('Dewi', 'password');
INSERT INTO users (username, password) VALUES ('Edgar', 'Password');
INSERT INTO users (username, password) VALUES ('Chris', 'Passwordd');