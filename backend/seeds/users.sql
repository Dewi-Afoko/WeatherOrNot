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

