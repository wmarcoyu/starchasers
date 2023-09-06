import React from "react";
import PropTypes from "prop-types";

class Bortle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translation: {
        1: "Excellent dark sky",
        2: "Typical truly dark sky",
        3: "Rural sky",
        4: "Brighter rural sky",
        5: "Suburban sky",
        6: "Bright suburban sky",
        7: "Suburban/urban transition sky",
        8: "City sky",
      },
    };
  }

  render() {
    const { bortle } = this.props;
    const { translation } = this.state;
    return (
      <div className="col auxiliary bortle-class">
        <h5 className="bortle-class-title mb-5">Bortle Class</h5>
        <div className="bortle-class-container">
          <h3 className="bortle-scale">{bortle}</h3>
          <p className="bortle-scale-annotations">{translation[bortle]}</p>
        </div>
      </div>
    );
  }
}

Bortle.propTypes = {
  bortle: PropTypes.number.isRequired,
};

export default Bortle;
