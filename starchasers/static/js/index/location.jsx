import React from "react";
import PropTypes from "prop-types";

/**
 * Replace all spaces in location with plus sign (+).
 */
function encodeForQuery(location) {
  return location.replace(/ /g, "+");
}

class SelectLocation extends React.Component {
  // props: changeLocation
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [],
      showList: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    const { changeLocation } = this.props;
    const nonempty = value.length > 0;
    // update location for Location class
    this.setState(
      () => ({
        query: value,
        showList: nonempty,
      }),
      () => {
        // whenever input changes, clear parent locationID (only set
        // locationID after user clicks one of the prepopulated options)
        changeLocation(null, null);
        // provide users with fuzzy search options
        // NOTE: could reduce # POST requests with a "search" button that
        // issues a single POST request after user inputs the entire
        // city name. Q: better user experience or fewer requests?
        if (value.length > 1) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: value }),
          };
          fetch("/api/location/", requestOptions, {
            credentials: "same-origin",
          })
            .then((response) => {
              if (!response.ok) throw Error(response.statusText);
              return response.json();
            })
            .then((data) => {
              this.setState({
                results: data.results,
              });
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }

  selectLocation(location) {
    const { changeLocation } = this.props;
    this.setState(
      () => ({
        query: location.name,
        showList: false,
      }),
      () => {
        const formattedLocation = encodeForQuery(location.name);
        changeLocation(location.id, formattedLocation);
      }
    );
  }

  render() {
    const { query, results, showList } = this.state;
    const menu = `dropdown-menu ${showList ? "show" : ""}`;

    return (
      <div className="col-4 dropdown idx-location">
        <input
          type="text"
          placeholder="Location"
          value={query}
          onChange={this.handleChange}
          className="input_location"
          role="menu"
        />
        {/* TODO: fix keyboard navigation. */}
        {results.length > 0 && (
          <ul className={menu}>
            {results.map((city) => (
              <li
                key={city.id}
                className="dropdown-item"
                role="menuitem"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    this.selectLocation(city);
                  }
                }}
                onClick={() => {
                  this.selectLocation(city);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

SelectLocation.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};

export default SelectLocation;
