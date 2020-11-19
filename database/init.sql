CREATE DATABASE reviews;

CREATE TABLE people (
    person_id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE reviews (
    reviewID serial PRIMARY KEY,
    person_id serial REFERENCES people(person_id),
    reviewStars integer,
    review varchar(500),
    pros varchar(500),
    cons varchar(500),
    unit_id text
);

INSERT INTO people (name) VALUES ('Aviery'),('Brandon'),('Caden'),('Dameon');

INSERT INTO reviews (person_id, reviewStars, pros, cons, unit_id)
    VALUES (1, 3, 'popcorn', 'everything', '726'),
           (2, 5, 'everything', 'no dr.pepper', '603'),
           (3, 1, 'i get to tdy', 'i have to work', '460');