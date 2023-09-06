import React from "react";
import PropTypes from "prop-types";
import { simplifyMonth } from "./utils";

class MilkyWaySeason extends React.Component {
  /* props:
     season: {
       "start": "MM DD",
       "end": "MM DD",
       "max_angle": "xxx",
     },
     year: "xxxx",
   */
  render() {
    const inputFormat = "MMMM DD";
    const outputFormat = "MMM DD";
    const { season, year } = this.props;
    return (
      <div className="col auxiliary milky-way-season">
        <h5 className="milky-way-season-title mb-5">{year} Milky Way season</h5>
        <p className="milky-way-season-content mb-3">
          {simplifyMonth(season.start, inputFormat, outputFormat)} —{" "}
          {simplifyMonth(season.end, inputFormat, outputFormat)}
        </p>
        <p className="max-angle">Max angle: {season.max_angle}</p>
      </div>
    );
  }
}

MilkyWaySeason.propTypes = {
  season: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    max_angle: PropTypes.string,
  }).isRequired,
  year: PropTypes.string.isRequired,
};

export default MilkyWaySeason;
