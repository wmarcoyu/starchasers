import React from "react";
import PropTypes from "prop-types";
import { simplifyMonth } from "./utils";

class MilkyWay extends React.Component {
  /* props:
     milkyWayData = {
     "max_angle": xxx,
     "activity": [
       {
         "rise": xxx,
         "set": xxx,
       },
       {
         "rise": xxx,
         "set": xxx,
       },
       ...
     ]
     }
   */

  render() {
    const { milkyWayData } = this.props;
    const inputFormat = "YYYY/MM/DD HH:mm";
    const outputFormat = "MMM DD HH:mm";
    return (
      <div className="col auxiliary milkyway">
        <h5 className="milky-way-activity-title">
          Milky Way Center Rise and Set
        </h5>
        {milkyWayData.activity.map((object) => (
          <p key={`milkyway-activity-${object.rise}-${object.set}`}>
            {simplifyMonth(object.rise, inputFormat, outputFormat)} —{" "}
            {simplifyMonth(object.set, inputFormat, outputFormat)} <br /> (
            {simplifyMonth(object.transit, inputFormat, outputFormat)})
          </p>
        ))}
        {/* <p className="max-angle">Max angle: {milkyWayData.max_angle}</p> */}
      </div>
    );
  }
}

MilkyWay.propTypes = {
  milkyWayData: PropTypes.shape({
    max_angle: PropTypes.string,
    activity: PropTypes.arrayOf(
      PropTypes.shape({
        rise: PropTypes.string,
        set: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default MilkyWay;
