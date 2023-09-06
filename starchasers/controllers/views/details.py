"""Render the detail page of a park."""
import flask
import requests
import starchasers
from starchasers.config import logger, DATASERVER_URL, API_TOKEN


@starchasers.app.route("/details/")
def render_details_page():
    """Render the skeleton of a page that contains details of a park.

    The url contains a parameter `id` that uniquely identifies a park.
    """
    # Get parameter `id`.
    park_id = flask.request.args.get("park_id")
    if park_id is None:
        lat = float(flask.request.args.get("lat"))
        lng = float(flask.request.args.get("lng"))

        if lat is None or lng is None:
            raise ValueError("Missing location information.")
        lat, lng = round(lat, 2), round(lng, 2)

        if lat > 0:
            lat = f"{lat}\u00B0N"
        elif lat < 0:
            lat = f"{-lat}\u00B0S"
        else:
            lat = "0\u00B0"

        if lng > 0:
            lng = f"{lng}\u00B0E"
        elif lng < 0:
            lng = f"{-lng}\u00B0W"
        else:
            lng = "0\u00B0"

        location = f"({lat}, {lng})"
        context = {"location": location}
        return flask.render_template("details.html", **context)

    api_username = "admin"
    url = f"{DATASERVER_URL}/get-park-name/?park_id={park_id}"
    headers = {
        "Username": api_username,
        "Token": API_TOKEN
    }
    response = requests.get(url, headers=headers, timeout=5)
    if response.status_code != 200:
        logger.error("Cannot fetch park with park_id %s", park_id)
        raise ValueError(f"Cannot find park with park_id {park_id}")

    result = response.json()
    context = {"location": result["fullname"]}
    return flask.render_template("details.html", **context)
