import React from "react";
import PropTypes from "prop-types";

class SelectBortle extends React.Component {
  // props: selectBortle
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(option) {
    const { selectBortle } = this.props;

    this.setState(
      () => ({
        selectedOption: option,
      }),
      () => {
        selectBortle(option);
      }
    );
  }

  render() {
    const { selectedOption } = this.state;
    const options = ["1", "2", "3", "4", "5", "6"];

    return (
      <div className="col dropdown select-bortle">
        <button
          className="btn btn-outline-secondary dropdown-toggle no-caret"
          data-bs-toggle="dropdown"
          type="button"
          aria-expanded="false"
        >
          <div>
            {selectedOption === null ? (
              <span>Maximum Bortle Class (Optional)</span>
            ) : (
              <span>Maximum Bortle Class: {selectedOption}</span>
            )}
          </div>
        </button>
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              className="dropdown-item"
              key={`bortle-${option}`}
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

SelectBortle.propTypes = {
  selectBortle: PropTypes.func.isRequired,
};

export default SelectBortle;
