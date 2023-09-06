/* eslint-disable max-classes-per-file */
import React from "react";
import PropTypes from "prop-types";
import { simplifyMonth } from "./utils";

const inputFormat = "YYYY/MM/DD HH:mm";
const outputFormat = "MMM DD HH:mm";

class DarkHours extends React.Component {
  /* props:
       darkHours = [
         {
           "sunrise": xx,
           "sunset": xx
         },
         {
           "sunrise": xx,
           "sunset": xx,
         },
         ...
       ]
     */

  render() {
    const { darkHours } = this.props;
    return (
      <div className="col auxiliary dark-hours">
        <h5 className="dark-hours-title">Dark Hours</h5>
        {darkHours.map((object) => (
          <p key={`dark-hour-${object.set}-${object.rise}`}>
            {simplifyMonth(object.set, inputFormat, outputFormat)} —{" "}
            {simplifyMonth(object.rise, inputFormat, outputFormat)}
          </p>
        ))}
      </div>
    );
  }
}

DarkHours.propTypes = {
  darkHours: PropTypes.arrayOf(
    PropTypes.shape({
      sunrise: PropTypes.string,
      sunset: PropTypes.string,
    })
  ).isRequired,
};

class MoonPhase extends React.Component {
  // props: moonPhase, same formatting as above.

  render() {
    const { moonPhase } = this.props;
    return (
      <div className="col auxiliary moon-phase">
        <h5 className="moon-title">Moon Set and Rise</h5>
        {moonPhase.map((object) => (
          <p key={`moon-phase-${object.set}-${object.rise}`}>
            {simplifyMonth(object.set, inputFormat, outputFormat)} —{" "}
            {simplifyMonth(object.rise, inputFormat, outputFormat)}
          </p>
        ))}
      </div>
    );
  }
}

MoonPhase.propTypes = {
  moonPhase: PropTypes.arrayOf(
    PropTypes.shape({
      moonrise: PropTypes.string,
      moonset: PropTypes.string,
    })
  ).isRequired,
};

class Score extends React.Component {
  constructor(props) {
    super(props);
    /* props:
       score - a string that is either the computed score or
               "No available score"
     */
    this.state = {
      scoreTable: {
        S: "Excellent: Minimal light and clear skies.",
        A: "Good: Minor light and mostly clear skies.",
        B: "Fair: Moderate light and/or partially obscured skies.",
        C: "Poor: Significant light and/or obscured skies.",
      },
    };
  }

  render() {
    const { score } = this.props;
    const { scoreTable } = this.state;
    return (
      <div className="col auxiliary score">
        <h5 className="score-title">Overall Rating</h5>
        <br />
        <h3 className="score">{score}</h3>

        <p className="score-annotations-title">
          {scoreTable[score].split(":")[0]}
        </p>
        <p className="score-annotations-content">
          {scoreTable[score].split(":")[1]}
        </p>
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.string.isRequired,
};

export { DarkHours, MoonPhase, Score };
