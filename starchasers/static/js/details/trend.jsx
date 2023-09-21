import React from "react";
import HistoryTransparencyChart from "./historyChart";

class Trend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const endpoint = "/api/historical-transparency/";
    const parameters = window.location.search;
    const url = `${endpoint}${parameters}`;
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((fetchedData) => {
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
      <p>Getting trends...</p>
    ) : (
      <HistoryTransparencyChart fetchedData={data} />
    );
  }
}

export default Trend;
