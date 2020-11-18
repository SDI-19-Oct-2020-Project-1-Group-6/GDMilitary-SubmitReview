CREATE TABLE users (
    id serial PRIMARY KEY,
    user text
)

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    user text REFERENCES users(user),
    rating integer,
    pro text,
    con text,
    unit text
)