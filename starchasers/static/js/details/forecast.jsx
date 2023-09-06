import React from "react";
import ForecastTransparencyChart from "./forecastChart";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const endpoint = `/api/transparency-forecast/`; // proxy endpoint
    const parameters = window.location.search;
    /* NOTE: it is always the case that we simply append the entire query
     * string to the end of an API endpoint url, since we are sending the
     * request to our proxy, which forwards the request to the data server,
     * thus the integrity of the request should be preserved.
     */
    const url = `${endpoint}${parameters}`;

    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((fetchedData) => {
        console.log(fetchedData.timezone);
        this.setState({
          data: fetchedData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;
    return data === null ? (
      <p>Getting forecasts...</p>
    ) : (
      <ForecastTransparencyChart fetchedData={data} />
    );
  }
}

export default Forecast;
