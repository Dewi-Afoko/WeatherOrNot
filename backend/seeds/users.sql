DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text,
    password text,
    exercise_list text[],
    first_name text,
    last_name text,
    dob text,
    height text,
    weight int[],
    weight_date text[],
    user_level text
);

INSERT INTO users (username, password)
VALUES
    ('johndoe', 'P@ssword1324%6'),
    ('janedoe', 'P@55word1324%6');



DROP TABLE IF EXISTS Exercise;

CREATE TABLE Exercise (
    id SERIAL PRIMARY KEY,
    name text UNIQUE,
    type text,
    muscle text,
    equipment text,
    difficulty text,
    instructions text
);

