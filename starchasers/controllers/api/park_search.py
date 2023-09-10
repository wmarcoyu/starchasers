"""Search for parks that satisfy user query conditions."""
import flask
import starchasers
from starchasers.logger import logger


@starchasers.app.route("/api/search-parks/")
def search_parks():
    """Return a list of parks that satisfy query conditions.

    All query conditions:
    location - search center location e.g. San Diego, California, United States
    location_id - id for the location in database
    radius - search radius
    bortle(optional) - max Bortle class.
    """
    context = {"parks": []}

    location = flask.request.args.get("location")
    location_id = flask.request.args.get("location_id")
    radius = flask.request.args.get("radius")
    try:
        # get_coordinates throws ValueError on error.
        lat, lng = get_coordinates(location, location_id)
        # int throws TypeError if radius is None.
        radius = int(radius)
    except (ValueError, TypeError) as error:
        logger.error(error)
        return flask.jsonify(**context), 400  # bad request

    # Establish a connection to the database.
    connection = starchasers.model.get_parks_db()
    cursor = connection.cursor()

    # Search for parks in the database that are within the radius range.
    cursor.execute(
        "SELECT id, park_name, admin_name, country, light_pollution FROM parks"
        " WHERE "
        "ST_DWithin(ST_GeographyFromText("
        "'SRID=4326;POINT(%s %s)'), geography(geom), %s) "
        "AND light_pollution <= 6",
        (lng, lat, radius)  # NOTE that lng should precede lat
    )
    data = cursor.fetchall()

    # Return the result as JSON, each park as a JSON object.
    max_bortle = flask.request.args.get("bortle")
    if max_bortle is not None:
        max_bortle = int(max_bortle)
    base_url = flask.request.url_root.rstrip("/")
    for each_park in data:
        # Skip this park if max_bortle is provided and this bortle exceeds it.
        if max_bortle is not None and int(each_park[4]) > max_bortle:
            continue
        park_info = {
            "park_id": each_park[0],
            "name": f"{each_park[1]}, {each_park[2]}, {each_park[3]}",
            "bortle": each_park[4],
            "url": f"{base_url}/details/?park_id={each_park[0]}"
        }
        context["parks"].append(park_info)

    return flask.jsonify(**context), 200


def get_coordinates(location, location_id):
    """Return the coordinates of `location` in (lat, lng) format."""
    if location is None or location_id is None:
        raise ValueError("Location information cannot be None.")

    # Establish a connection to the cities database and search by location_id.
    connection = starchasers.model.get_cities_db()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT lat, lng, city, admin_name, country FROM cities WHERE "
        "id = %s", (location_id, )
    )
    results = cursor.fetchall()

    # Check the validity of results.
    if len(results) == 0:
        raise ValueError(f"No results matching location_id {location_id}.")

    if len(results) > 1:
        raise ValueError(f"More than 1 result for location_id {location_id}.")

    # Check if the resulting location name mathces its location_id.
    location_full_name = f"{results[0][2]}, {results[0][3]}, {results[0][4]}"
    if location_full_name != location:
        raise ValueError(
            "Input location does not match search result. "
            f"location_id: {location_id}. Input: {location}. "
            f"Result: {location_full_name}"
        )

    # Return coordinates.
    lat, lng = results[0][0], results[0][1]
    return (lat, lng)
