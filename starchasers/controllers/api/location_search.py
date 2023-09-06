"""Fuzzy search locations."""
import flask
from rapidfuzz import process
import starchasers
from starchasers.controllers.api import city_db


@starchasers.app.route("/api/location/", methods=["POST"])
def search_locaton():
    """Fuzzy search a location and return top 5 results."""
    choices = city_db.city_names

    query = flask.request.json["query"]
    raw_results = process.extract(query, choices, limit=None)
    cities = [result[0] for result in raw_results if result[1] >= 80.0]

    results = [
        {"name": f"{key}, {value[0][0]}, {value[0][1]}", "id": f"{value[1]}"}
        for key in cities for value in city_db.city_dict[key]
    ]

    context = {}
    context["results"] = results

    return flask.jsonify(**context), 201
