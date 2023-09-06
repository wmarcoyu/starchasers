"""Preprocess the city database.

Construct a dictionary. Keys: city names. Values: [(admin_name, country)]
Construct a list of city names.
"""
import starchasers


class Cities:
    """A database containing world cities."""

    def __init__(self):
        """Cities class initialization."""
        # a list of city names, having NO duplicates
        self.city_names = []
        # key: city name
        # value: [(admin_name, country, city_id)]
        self.city_dict = {}
        self.get_city_dict()
        self.get_city_names()

    def get_city_dict(self):
        """Return city_dict dictionary."""
        with starchasers.app.app_context():
            connection = starchasers.model.get_cities_db()
            cursor = connection.cursor()
            cursor.execute(
                "SELECT city, admin_name, country, id FROM cities"
            )
            data = cursor.fetchall()
            for item in data:
                if item[0] not in self.city_dict:
                    self.city_dict[item[0]] = []
                self.city_dict[item[0]].append([[item[1], item[2]], item[3]])

    def get_city_names(self):
        """Return a list of world city names without duplicates."""
        self.city_names = list(self.city_dict.keys())


# Since we only read from the database, this only needs to run once
# upon initialization.
city_db = Cities()
