"""Light pollution package functions."""
from shapely.geometry import Polygon
from preprocessing.light_pollution import bortle
from preprocessing.utilities import polygon


THRESHOLD = 0.20
UNIT_AREA = 0.005
MIN_SAMPLES, MAX_SAMPLES = 10, 2000


def compute_dominant_bortle_class(counts, total_samples, unit_name=None):
    """Compute overall Bortle class for a park given sample Bortle classes.

    The overall Bortle class is determined by a sliding scale starting from
    the lowest class. If class 1 area occupies 30% or more, then the overall
    class is 1. If the combined area of class 1 and 2 occupies 30% or more,
    then the overall class is 2. So on and so forth.

    Parameters:
    counts - a dictionary of which keys are Bortle classes 1 - 8 and values
             are number of samples that are of each Bortle class.
    total_samples - number of total samples.
    unit_name - name of the current park, mainly for debugging purposes.
    """
    is_debug = False
    if unit_name is not None:
        is_debug = True

    for bortle_class in range(1, 8):
        if counts[bortle_class] / total_samples >= THRESHOLD:
            if is_debug:
                print(f"{unit_name} has overall Bortle class {bortle_class}")
            return bortle_class
        if (counts[bortle_class] + counts[bortle_class + 1]) / total_samples \
                >= THRESHOLD:
            if is_debug:
                print(
                    f"{unit_name} has overall Bortle class {bortle_class + 1}"
                )
            return bortle_class + 1
    # Very unlikely to happen since the Bortle classes of a given location
    # are usually clustered to 1 or 2 levels and not widely spread
    # across 8 levels.
    raise ValueError(f"{unit_name} has no proper Bortle classes.")


def get_light_pollution_score(boundary, unit_name):
    """Compute the light pollution score for a park defined by boundary.

    Parameter:
    boundary - a Polygon or a MultiPolygon that defines a park.
    unit_name - name of the park, mostly for debugging purposes.

    Return:
    light pollution level(Bortle class) of the park.
    """
    counts = {key: 0 for key in range(1, 9)}
    total_samples = 0
    approx_polys = polygon.approximate_boundary(boundary)
    for poly in approx_polys:
        # num_samples = max{MAX_SAMPLES, area/UNIT_AREA}
        poly_area = Polygon(poly).area
        assert poly_area >= 0
        num_samples = int(poly_area / UNIT_AREA)
        # Make sure num_samples is in reasonable range.
        if num_samples > MAX_SAMPLES:
            num_samples = MAX_SAMPLES
        elif num_samples < MIN_SAMPLES:
            num_samples = MIN_SAMPLES

        samples = polygon.sample_polygon(poly, num_samples)
        total_samples += len(samples)

        for sample in samples:
            lng, lat = sample[0], sample[1]
            bortle_class = bortle.get_bortle(lng, lat)
            counts[bortle_class] += 1
    return compute_dominant_bortle_class(counts, total_samples, unit_name)
