import React from "react";
import Forecast from "./forecast";
import Trend from "./trend";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: "Forecast",
    };
    this.selectMode = this.selectMode.bind(this);
  }

  selectMode(inputMode) {
    this.setState({
      selectedMode: inputMode,
    });
  }

  render() {
    const { selectedMode } = this.state;
    return (
      <div className="container info">
        <div className="row mode m-0">
          <button
            type="button"
            className="col-md-auto btn btn-outline-secondary btn-sm"
            disabled={selectedMode === "Forecast"}
            onClick={() => this.selectMode("Forecast")}
          >
            Forecast
          </button>

          <button
            type="button"
            className="col-md-auto btn btn-outline-secondary btn-sm"
            disabled={selectedMode === "Trend"}
            onClick={() => this.selectMode("Trend")}
          >
            Trend
          </button>
        </div>

        {selectedMode === "Forecast" ? <Forecast /> : <Trend />}
      </div>
    );
  }
}

export default Info;
