"""Render the page that displays search results."""
import flask
import starchasers


@starchasers.app.route("/search/")
def get_search_results():
    """Render the search results page given url parameters."""
    context = {}
    location = flask.request.args.get("location")
    if location is None:
        return "Bad request. Query parameter(s) missing.", 400
    context["header"] = f"Recommended Locations near {location}"
    return flask.render_template("search.html", **context)
