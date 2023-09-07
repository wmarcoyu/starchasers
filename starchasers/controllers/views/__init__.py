"""Importing functions makes them runnable by flask."""
from starchasers.controllers.views.index import show_index
from starchasers.controllers.views.details import render_details_page
from starchasers.controllers.views.search import get_search_results
from starchasers.controllers.views.doc import show_doc
