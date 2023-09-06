import React from "react";
import PropTypes from "prop-types";

class SelectDistance extends React.Component {
  // props: changeDistance
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      distanceTable: {
        /* Convert distances to meters. */
        "<= 50 mi/80 km": "80000",
        "<= 100 mi/160 km": "160000",
        "<= 200 mi/320 km": "320000",
        "<= 300 mi/480 km": "480000",
        "<= 500 mi/800 km": "800000",
      },
    };
    this.selectOption = this.selectOption.bind(this);
    this.distanceInMeters = this.distanceInMeters.bind(this);
  }

  distanceInMeters(inputDistance) {
    const { distanceTable } = this.state;
    return distanceTable[inputDistance];
  }

  selectOption(option) {
    const { changeDistance } = this.props;
    this.setState(
      () => ({
        selectedOption: option,
      }),
      () => {
        const distance = this.distanceInMeters(option);
        changeDistance(distance);
      }
    );
  }

  render() {
    const { selectedOption } = this.state;
    const options = [
      "<= 50 mi/80 km",
      "<= 100 mi/160 km",
      "<= 200 mi/320 km",
      "<= 300 mi/480 km",
      "<= 500 mi/800 km",
    ];
    return (
      <div className="col-3 dropdown idx-distance">
        <button
          className="btn btn-outline-secondary dropdown-toggle no-caret"
          data-bs-toggle="dropdown"
          type="button"
          aria-expanded="false"
        >
          {selectedOption || "Distance"}
        </button>
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              className="dropdown-item"
              key={`distance-${option}`}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  this.selectOption(option);
                }
              }}
              onClick={() => this.selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SelectDistance.propTypes = {
  changeDistance: PropTypes.func.isRequired,
};

export default SelectDistance;
