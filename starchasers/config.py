"""Development configuration."""
import json
import pathlib
from psycopg2 import pool
print("CONFIGURING...")
APPLICATION_ROOT = "/"
STARCHASERS_ROOT = pathlib.Path(__file__).resolve().parent.parent
CITIES_DATABASE_NAME = "cities"
PARKS_DATABASE_NAME = "parks"
LIGHT_POLLUTION_DATABASE_NAME = "light_pollution"
DATASERVER_URL = "https://starchasers-data.com/api"
with open("credentials/api_token.txt", encoding="utf-8") as file:
    API_TOKEN = file.readline().strip()
# TODO: adjust in production.
DATABASE_USER = "ec2-user"


with open(
        STARCHASERS_ROOT/"credentials"/"config.json", encoding="utf-8"
) as file:
    config = json.load(file)

# Create a connection pool for database `cities`.
CITIES_DATABASE = {
    "database": CITIES_DATABASE_NAME,
    "user": DATABASE_USER,
    "host": "localhost",
    "port": 5432,
    "password": config["DATABASE_PASSWORD"]
}

# TODO: adjust min and max accordingly.
cities_connection_pool = pool.ThreadedConnectionPool(1, 10, ** CITIES_DATABASE)


# Create a connection pool for database `parks`.
PARKS_DATABASE = {
    "database": PARKS_DATABASE_NAME,
    "user": DATABASE_USER,
    "host": "localhost",
    "port": 5432,
    "password": config["DATABASE_PASSWORD"]
}

# TODO: adjust min and max accordingly.
parks_connection_pool = pool.ThreadedConnectionPool(1, 10, **PARKS_DATABASE)


LIGHT_POLLUTION_DATABASE = {
    "database": LIGHT_POLLUTION_DATABASE_NAME,
    "user": DATABASE_USER,
    "password": config["DATABASE_PASSWORD"],
    "host": "localhost",
    "port": 5432,
}

light_pollution_connection_pool = pool.ThreadedConnectionPool(
    1, 10, **LIGHT_POLLUTION_DATABASE
)
