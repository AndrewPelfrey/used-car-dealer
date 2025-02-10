DROP DATABASE IF EXISTS used_car_dealer;

CREATE DATABASE used_car_dealer;

\c used_car_dealer;

CREATE TABLE car_info (
    id SERIAL PRIMARY KEY,
    engine VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    drive_train VARCHAR(50) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    fuel_eco_city INT NOT NULL,
    fuel_eco_highway INT NOT NULL
);

CREATE TABLE car (
    vin VARCHAR(17) PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    mileage INT NOT NULL,
    trim VARCHAR(50) NOT NULL,
    interior_color VARCHAR(50) NOT NULL,
    exterior_color VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    car_info_id INT REFERENCES car_info(id)
);


CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE car_features (
    car_id VARCHAR(17) REFERENCES car(vin),
    feature_id INT REFERENCES features(id)
);