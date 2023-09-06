import React from "react";
import PropTypes from "prop-types";

class NewMoonDates extends React.Component {
  /* props:
     allDates: [Jan xx, Feb xx, ..., Dec xx],
     year: xxxx,
   */
  render() {
    const { allDates, year } = this.props;
    return (
      <div className="col auxiliary new-moon-dates">
        <h5 className="new-moon-dates-title mb-5">{year} New Moon dates</h5>

        <div className="new-moon-dates-container">
          {allDates.map((date) => (
            <p key={`date-entry ${date}`}>{date}</p>
          ))}
        </div>
      </div>
    );
  }
}

NewMoonDates.propTypes = {
  year: PropTypes.string.isRequired,
  allDates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewMoonDates;
