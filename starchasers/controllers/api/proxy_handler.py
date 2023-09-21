"""Proxy API requests made by front-end ReactJS code."""
import flask
import requests
import starchasers
from starchasers.config import DATASERVER_URL, API_TOKEN


@starchasers.app.route("/api/<endpoint>/")
def proxy_request(endpoint):
    """Proxy a request sent to `endpoint`.

    It receives the request, obtains credentials stored on the server, sends
    the same request to the data server, and returns the response to front end.
    """
    # Requests sent by front-end ReactJS code are assumed to have correct
    # `endpoint` value. Requests sent with incorrect `endpoint` values
    # will get 404 not found, as expected.
    # Thus, there is no need to verify the validity of `endpoint`.
    query_string = flask.request.query_string.decode("utf-8")

    api_username = "admin"
    headers = {
        "Username": api_username,
        "Token": API_TOKEN
    }

    # NOTE: only for debugging purposes.
    # print(f"{DATASERVER_URL}/{endpoint}/?{query_string}")
    url = f"{DATASERVER_URL}/{endpoint}/?{query_string}"

    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code == 200:
        data = response.json()
        return flask.jsonify(data), 200

    return flask.abort(404)
