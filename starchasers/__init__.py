"""starchasers package initializer."""
import flask
from flask_cors import CORS  # TODO: disable in production.
app = flask.Flask(__name__)
app.config.from_object("starchasers.config")
import starchasers.model  # noqa: E402  pylint: disable=wrong-import-position
import starchasers.controllers.api  # noqa: E402  pylint: disable=wrong-import-position
import starchasers.controllers.views  # noqa: E402  pylint: disable=wrong-import-position
