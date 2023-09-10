"""Development configuration."""
import json
import pathlib
import logging
from logging.handlers import TimedRotatingFileHandler
from psycopg2 import pool
print("CONFIGURING...")
APPLICATION_ROOT = "/"
STARCHASERS_ROOT = pathlib.Path(__file__).resolve().parent.parent
CITIES_DATABASE_NAME = "cities"
PARKS_DATABASE_NAME = "parks"
DATASERVER_URL = "https://starchasers-data.com/api"
with open("credentials/api_token.txt", encoding="utf-8") as file:
    API_TOKEN = file.readline().strip()
# TODO: adjust in production.
DATABASE_USER = "ec2-user"


def setup_logger(log_file_name):
    """Initialize a logger that writes to log_file_name."""
    logger_instance = logging.getLogger(__name__)
    logger_instance.setLevel(logging.DEBUG)

    handler = TimedRotatingFileHandler(
        filename=log_file_name, when="D", interval=1, backupCount=14
    )
    handler.setLevel(logging.DEBUG)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger_instance.addHandler(handler)
    logger_instance.addHandler(console_handler)

    return logger_instance


logger = setup_logger("starchasers.log")


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
