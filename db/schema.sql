DROP DATABASE IF EXISTS obt_library;
CREATE DATABASE obt_library;

\c obt_library;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    engagement TEXT UNIQUE NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT[] NOT NULL,
    categories TEXT[] NOT NULL,
    description TEXT,
    isbn TEXT NOT NULL,
    pageCount INT NOT NULL,
    images TEXT
);

CREATE TABLE checkout (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users (engagement) ON DELETE CASCADE,
    book_id INT REFERENCES books (id) ON DELETE CASCADE,
    checkout_time TEXT NOT NULL,
    return_time TEXT DEFAULT NULL,
    checked_out BOOLEAN DEFAULT FALSE
);
