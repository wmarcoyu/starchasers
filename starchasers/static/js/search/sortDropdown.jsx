import React from "react";
import PropTypes from "prop-types";

class SortDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(inputOption) {
    const { sortByOption } = this.props;
    this.setState(
      () => ({
        selectedOption: inputOption,
      }),
      () => {
        sortByOption(inputOption);
      }
    );
  }

  render() {
    const { selectedOption } = this.state;
    const options = ["Name", "Bortle Class"];

    return (
      <div className="col dropdown justify-content-md-end">
        <button
          className="btn btn-outline-secondary dropdown-toggle btn-sm"
          data-bs-toggle="dropdown"
          type="button"
          aria-expanded="false"
        >
          Sort By: {selectedOption || ""}
        </button>
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              className="dropdown-item"
              key={`sort-option-${option}`}
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

SortDropdown.propTypes = {
  sortByOption: PropTypes.func.isRequired,
};

export default SortDropdown;
