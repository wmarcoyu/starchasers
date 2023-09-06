import React from "react";
import PropTypes from "prop-types";
import { simplifyMonth } from "./utils";

class MeteorShower extends React.Component {
  /* props:
     data = {
       "max_date": xxx,
       "max_hourly_rate": xxx,
       "max_time": xxx,
       "moon": xxx,
       "name": xxx,
       "period": [xxx, xxx]
     }
   */
  render() {
    const { data } = this.props;
    const inputFormat = "YYYY/MM/DD";
    const outputFormat = "MMM DD";
    return (
      <div className="col auxiliary next-meteor-shower">
        <h5 className="next-meteor-shower-title">Next Meteor Shower</h5>

        <h5 className="next-meteor-shower-name">{data.name}</h5>

        <p className="next-meteor-shower-period">
          Active Period:{" "}
          {simplifyMonth(data.period[0], inputFormat, outputFormat)} —{" "}
          {simplifyMonth(data.period[1], inputFormat, outputFormat)}
        </p>

        <p className="next-meteor-shower-peak-date">
          Peak Date: {simplifyMonth(data.max_date, inputFormat, outputFormat)}
        </p>

        <p className="next-meteor-shower-peak-rate">
          Peak Hourly Rate: {data.max_hourly_rate}
        </p>

        <p className="moon-phase">Moon will be {data.moon}% full.</p>
      </div>
    );
  }
}

MeteorShower.propTypes = {
  data: PropTypes.shape({
    max_date: PropTypes.string.isRequired,
    max_hourly_rate: PropTypes.string.isRequired,
    max_time: PropTypes.string.isRequired,
    moon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    period: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default MeteorShower;
