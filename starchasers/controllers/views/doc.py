"""Show documentations to users."""
import flask
import starchasers


@starchasers.app.route("/documentation/")
def show_doc():
    """Render documentation."""
    return flask.render_template("documentation.html")
