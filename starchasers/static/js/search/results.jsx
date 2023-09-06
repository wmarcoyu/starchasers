import React from "react";
import SortDropdown from "./sortDropdown";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchIsComplete: false,
    };

    this.sortByOption = this.sortByOption.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByBortle = this.sortByBortle.bind(this);
  }

  componentDidMount() {
    /* Extract query parameters in current url. */
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const paramsStr = params.toString();

    /* Append parameters to the end of api url. */
    const apiUrl = "/api/search-parks";
    const queryUrl = `${apiUrl}/?${paramsStr}`;

    fetch(queryUrl, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          results: data.parks,
          searchIsComplete: true,
        });
      })
      .catch((error) => console.log(error));
  }

  sortByOption(inputOption) {
    if (inputOption === "Name") {
      this.sortByName();
    } else {
      this.sortByBortle();
    }
  }

  sortByName() {
    this.setState((prevState) => ({
      results: prevState.results.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }

  sortByBortle() {
    this.setState((prevState) => ({
      results: prevState.results.sort((a, b) => {
        if (a.bortle !== b.bortle) {
          return a.bortle - b.bortle;
        }
        return a.name.localeCompare(b.name);
      }),
    }));
  }

  render() {
    const { results, searchIsComplete } = this.state;
    /* TODO: prettify placeholders. */
    if (!searchIsComplete) {
      return <p>Searching...</p>;
    }
    if (results.length === 0) {
      return <p>No results found.</p>;
    }
    return (
      <div className="row results-wrapper">
        <div className="row utilities">
          <p className="col number-of-results mt-1">
            {results.length} results found
          </p>
          <SortDropdown sortByOption={this.sortByOption} />
        </div>

        <table className="col all-results mb-5">
          <thead className="row table-head">
            <tr className="row table-head-row">
              <th className="col name-heading mb-3">Location</th>
              <th className="col bortle-heading mb-3">Bortle Class</th>
            </tr>
          </thead>

          <tbody className="row table-body">
            {results.map((park) => (
              <tr className="row park-result" key={`result-${park.name}`}>
                <td className="col name">
                  <a href={park.url}>{park.name}</a>
                </td>
                <td className="col bortle">{park.bortle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Results;
