"""Add the cities in worldcities.csv to database `cities`."""
import csv
import starchasers
from starchasers.model import get_cities_db


# With this context, there is no need to manually commit and close connection
# since they are automatically handled by `close_cities_db` in model.py.
with starchasers.app.app_context():
    connection = get_cities_db()
    cursor = connection.cursor()

    indices = {
        "city": 0,
        "lat": 2,
        "lng": 3,
        "country": 4,
        "admin_name": 7,
        "id": 10
    }

    known_ids = []

    with open("world_cities/worldcities.csv", encoding="utf-8") as file:
        csv_reader = csv.reader(file)
        next(csv_reader)

        for row in csv_reader:
            cursor.execute(
                "INSERT INTO cities(city, lat, lng, country, admin_name, id) "
                "VALUES(%s, %s, %s, %s, %s, %s)",
                (row[indices["city"]], row[indices["lat"]], row[indices["lng"]],
                 row[indices["country"]], row[indices["admin_name"]],
                 row[indices["id"]], )
            )
