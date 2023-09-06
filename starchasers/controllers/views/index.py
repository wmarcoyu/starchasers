"""Functions that render the main page of the app."""
from flask import render_template
import starchasers


@starchasers.app.route("/")
def show_index():
    """Render the index page."""
    context = {}
    context["quotes"] = \
        '"We are all in the gutter, but some of us are looking at the stars." \
         - Oscar Wilde'
    return render_template("index.html", **context)
