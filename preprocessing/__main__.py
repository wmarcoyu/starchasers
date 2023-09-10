"""Driver for preprocessing a park.

It needs to be updated for every individual shapefile.
"""
import geopandas as gpd
from dbfread import DBF
from preprocessing.utilities.polygon import get_boundary_centroid
from preprocessing.light_pollution import get_light_pollution_score
import starchasers
from starchasers.model import get_parks_db


if __name__ == "__main__":
    SHAPE_FILE_PATH = "preprocessing/light_pollution/NPS/" \
        "NPS_-_Land_Resources_Division_Boundary_and_Tract_Data_Service.shp"
    data = gpd.read_file(SHAPE_FILE_PATH)
    # convert to EPSG: 4326 (tranditional lng and lat)
    data = data.to_crs(epsg=4326)
    num_of_entries = len(data)
    # Open connection with context manager to automatically close connection.
    with starchasers.app.app_context():
        connection = get_parks_db()
        cursor = connection.cursor()
        for idx in range(num_of_entries):
            boundary_data = data.geometry[idx]
            park_name = data.UNIT_NAME[idx]
            admin_name = data.STATE[idx]
            country = "USA"
            light_pollution_score = get_light_pollution_score(
                boundary_data, park_name
            )
            lng, lat = get_boundary_centroid(boundary_data)
            geom = f"POINT({lng} {lat})"  # longitude first
            cursor.execute(
                "INSERT INTO parks "
                "(lat, lng, park_name, admin_name, country, "
                "light_pollution, geom) "
                "VALUES (%s, %s, %s, %s, %s, %s, ST_GeomFromText(%s, 4326))",
                (lat, lng, park_name, admin_name, country,
                 light_pollution_score, geom)
            )
