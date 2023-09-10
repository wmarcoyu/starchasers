"""Helper functions that compute the Bortle class for a given location.

An SQM(sky quality meter) is first obtained from a map and then converted
to the corresponding Bortle class.
Light pollution map:
http://doi.org/10.5880/GFZ.1.4.2016.001
http://dx.doi.org/10.1126/sciadv.1600377
"""
import numpy as np
import rasterio
from dataserver.model import get_light_pollution_db
from dataserver.logger import logger


def get_transform():
    """Get the transform matrix that transforms (lng, lat) to (row, col)."""
    with rasterio.open(FILENAME) as source:
        transform = source.transform
    return transform


def lng_lat_to_row_col(lng, lat):
    """Apply the affine transformation on (lng, lat).

    Parameters:
    lng - longitude, ranging from [-180, 180]
    lat - latitude, ranging from (-60, 85), open intervals.
    """
    # Check for lat range. NOTE: An assert is sufficient for now
    # since this code is not for public use.
    assert lat > -60 and lat < 85
    transform = get_transform()
    row, col = rasterio.transform.rowcol(transform, lng, lat)
    return (row, col)


def get_brightness(lng, lat):
    """Read the brightness value at location (lng, lat) from the map."""
    connection = get_light_pollution_db()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT ST_Value(rast, ST_SetSRID(ST_Point(%s, %s), 4326)) "
        "FROM public.light_pollution "
        "WHERE ST_Intersects(rast, ST_SetSRID(ST_Point(%s, %s), 4326));",
        (lng, lat, lng, lat, )
    )

    try:
        data = cursor.fetchone()
    except TypeError as _:
        logger.error(
            "Non-unique light pollution results found for coordinates "
            "(lat=%s, lng=%s)", lat, lng
        )

    return data[0]


def get_sqm(lng, lat):
    """Return the Sky Quality Meter(SQM) at location (lng, lat)."""
    art_brightness = get_brightness(lng, lat)
    total_brightness = art_brightness + 0.171168465
    sqm = np.log10(total_brightness / 108000000) / (-0.4)
    return sqm


# pylint: disable=R1716,R0911
def get_bortle(lng, lat):
    """Compute the Bortle class for a given location.

    SQM to Bortle conversion table: https://www.handprint.com/ASTRO/bortle.html
    """
    lng, lat = float(lng), float(lat)  # allows string inputs
    sqm = get_sqm(lng, lat)
    if sqm >= 21.99:
        return 1
    if sqm >= 21.89:
        return 2
    if sqm >= 21.69:
        return 3
    if sqm >= 20.49:
        return 4
    if sqm >= 19.50:
        return 5
    if sqm >= 18.94:
        return 6
    if sqm >= 18.38:
        return 7
    return 8
    # NOTE: there is also Bortle class 9. We do not need it since it has
    # practically the same effect on stargazing as class 8 - way too bright.
