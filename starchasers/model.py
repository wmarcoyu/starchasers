"""Database API."""
import flask
import starchasers
from starchasers.config import cities_connection_pool, \
    parks_connection_pool


def get_cities_db():
    """Get a database connnection from the cities pool.

    Database source: https://simplemaps.com/data/world-cities
    """
    if "cities_db" not in flask.g:
        flask.g.cities_db = cities_connection_pool.getconn()
    return flask.g.cities_db


@starchasers.app.teardown_appcontext
def close_cities_db(error=None):
    """Release the database connection back to pool."""
    assert error or not error  # avoid unused parameter error
    database_connection = flask.g.pop("cities_db", None)
    if database_connection is not None:
        database_connection.commit()
        cities_connection_pool.putconn(database_connection)


def get_parks_db():
    """Get a database connection from the parks pool.

    Do not confuse it with `get_parks_db` in the data server.

    Similarity: they both use the same database `parks`, containing a table
    also named `parks` that contains information about listed parks. Code to
    open and close connections is also identical.

    Difference: this function is used by front-end for searching purposes,
    while the other one is used by back-end to get forecasts and scores.

    Main reason to have the same function here is to off-load the data server
    a bit. Searching is done on the app server instead of the data server.
    """
    if "parks_db" not in flask.g:
        flask.g.parks_db = parks_connection_pool.getconn()
    return flask.g.parks_db  # returns a connection


@starchasers.app.teardown_appcontext
def close_parks_db(error=None):
    """Release the database connection back to pool."""
    assert error or not error  # avoid unused parameter error
    database_connection = flask.g.pop("parks_db", None)
    if database_connection is not None:
        database_connection.commit()
        parks_connection_pool.putconn(database_connection)
