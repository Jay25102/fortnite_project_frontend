\echo 'Delete and recreate fortnite_shop_compendium?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fortnite_shop_compendium;
CREATE DATABASE fortnite_shop_compendium;
\connect fortnite_shop_compendium

CREATE TABLE users(
    username VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1)
);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL
        REFERENCES users ON DELETE CASCADE,
    item TEXT NOT NULL
);

\echo 'Delete and recreate fortnite_shop_compendium_test?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fortnite_shop_compendium_test;
CREATE DATABASE fortnite_shop_compendium_test;
\connect fortnite_shop_compendium_test

CREATE TABLE users(
    username VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1)
);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL
        REFERENCES users ON DELETE CASCADE,
    item TEXT NOT NULL
);