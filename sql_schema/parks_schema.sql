CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE parks(
  id SERIAL PRIMARY KEY,
  lat DECIMAL(9, 6) NOT NULL,
  lng DECIMAL(9, 6) NOT NULL,
  park_name VARCHAR(128) NOT NULL,
  admin_name VARCHAR(128) NOT NULL,
  country VARCHAR(32) NOT NULL,  -- `Kingdom of the Netherlands` has 26 chars
  light_pollution INTEGER NOT NULL,
  geom GEOMETRY(Point, 4326)
);
