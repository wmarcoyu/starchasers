"""Helper functions that sample points(locations) from a park.

The park could be a Polygon, having one enclosed area, or a MultiPolygon,
having multiple isolated areas. Sampled points could be used to compute
various scores, such as light pollution, cloud transparency, etc.
"""
import random
import numpy as np
import geopandas as gpd
from scipy.spatial import ConvexHull  # pylint: disable=E0611
from shapely.geometry import Point, Polygon


def approximate_polygon(polygon):
    """Approximate a polygon with convex hull.

    Parameter:
    polygon - a Polygon (single polygon) that defines a boundary.

    Return:
    A list of coords (lng, lat) that define the approximated polygon.
    """
    # Obtain a list of coords (lng, lat).
    vertices = list(polygon.exterior.coords)
    # Apply the convex hull algorithm and obtain a shortened list of coords.
    points = np.array(vertices)
    hull = ConvexHull(points)
    hull_indices = hull.vertices
    convex_hull_points = points[hull_indices]
    return convex_hull_points


def approximate_boundary(boundary):
    """Approximate the boundary of a park with simple polygons.

    Parameter:
    boundary - either a Polygon or a MultiPolygon, which defines the boundary
    of a park. If it is a MultiPolygon, each polygon will be approximated
    by approximate_polygon

    SciPy docs:
    https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.ConvexHull.html
    """
    res_polygons = []
    if boundary.geom_type == "Polygon":
        res_polygons.append(approximate_polygon(boundary))
    else:
        assert boundary.geom_type == "MultiPolygon"
        for polygon in list(boundary.geoms):
            res_polygons.append(approximate_polygon(polygon))
    # [[poly1], [poly2], ..., [polyn]]
    return res_polygons


def sample_polygon(approx_poly, num_samples):
    """Sample uniformly in approx_poly with rejection sampling.

    Parameters:
    approx_poly - a LIST of coords that form a simple polygon(Polygon).
    num_samples - number of coords to return.

    Return:
    A list of samples(coords) inside approx_poly.
    """
    # Construct a Polygon out of a list of coordinates. NOTE: It is important
    # to not confuse a list of coordinates with a Polygon type.
    polygon = Polygon(approx_poly)
    min_x, min_y, max_x, max_y = polygon.bounds
    points = []
    while len(points) < num_samples:
        random_point = Point(
            [random.uniform(min_x, max_x), random.uniform(min_y, max_y)]
        )
        # Rejection sampling: add random point to list if it is in polygon.
        if random_point.within(polygon):
            points.append((random_point.x, random_point.y))

    return points


def get_boundary_centroid(boundary):
    """Return the centroid coordinates given a boundary.

    `boundary` could either be of Polygon or MultiPolygon type.
    """
    # Convert `boundary` to a GeoDataFrame to unify its type.
    boundary = gpd.GeoDataFrame(geometry=[boundary])
    # Return a single centorid even if the park has multiple boundaries.
    centroid = boundary["geometry"].unary_union.centroid
    # (longitude, latitude)
    return (centroid.x, centroid.y)
