

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
    weight int[]
);


DROP TABLE IF EXISTS Exercise;

CREATE TABLE Exercise (
    id SERIAL PRIMARY KEY,
    name text,
    type text,
    muscle text,
    equipment text,
    difficulty text,
    instructions text
);

INSERT INTO Exercise (name, type, muscle, equipment, difficulty, instructions) VALUES ('Name_1', 'Type_1', 'Muscle_1', 'Equipment_1', 'Difficulty_1', 'Instructions_1');
INSERT INTO Exercise (name, type, muscle, equipment, difficulty, instructions) VALUES ('Name_2', 'Type_2', 'Muscle_2', 'Equipment_2', 'Difficulty_2', 'Instructions_2');
INSERT INTO Exercise (name, type, muscle, equipment, difficulty, instructions) VALUES ('Name_3', 'Type_3', 'Muscle_3', 'Equipment_3', 'Difficulty_3', 'Instructions_3');

