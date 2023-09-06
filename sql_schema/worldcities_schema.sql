CREATE TABLE cities(
  city VARCHAR(64) NOT NULL, -- city name has max length 49
  lat DECIMAL(9, 6) NOT NULL,
  lng DECIMAL(9, 6) NOT NULL,
  country VARCHAR(64) NOT NULL,  -- country name has max length 45
  admin_name VARCHAR(64) NOT NULL, -- admin name has max length 53
  id INTEGER NOT NULL PRIMARY KEY
);
