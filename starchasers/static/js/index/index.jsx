import React from "react";
import SelectLocation from "./location";
import SelectDistance from "./distance";
import SelectBortle from "./bortle";
import SearchButton from "./searchButton";
import MapButton from "./mapButton";
/* import Feeds from "./feeds"; */

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationID: null,
      locationName: null,
      distance: null,
      bortle: null,
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.changeDistance = this.changeDistance.bind(this);
    this.selectBortle = this.selectBortle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { locationID, locationName, distance, bortle } = this.state;
    /* Location and distance cannot be missing. */
    const missingFields = [];
    if (locationID === null) missingFields.push("location");
    if (distance === null) missingFields.push("distance");

    if (missingFields.length > 0) {
      /* eslint-disable-next-line no-alert */
      window.alert(`Missing field(s): ${missingFields.join(", ")}.`);
      event.preventDefault();
      return;
    }

    // Do not reload the page.
    event.preventDefault();
    const baseUrl = `${window.location.origin}/search`;
    let destUrl = `${baseUrl}/?location_id=${locationID}&location=${locationName}&radius=${distance}`;

    /* If bortle is not null, add it to url query. */
    if (bortle !== null) {
      destUrl += `&bortle=${bortle}`;
    }

    window.location.href = destUrl;
  }

  changeLocation(updatedLocationID, updatedLocationName) {
    this.setState({
      locationID: updatedLocationID,
      locationName: updatedLocationName,
    });
  }

  changeDistance(selectedDistance) {
    this.setState({
      distance: selectedDistance,
    });
  }

  selectBortle(selectedBortle) {
    this.setState({
      bortle: selectedBortle,
    });
  }

  render() {
    return (
      <div className="container body">
        <div className="row search-bar">
          {/* All search components. */}
          <form
            onSubmit={this.handleSubmit}
            className="col-10 idx-search d-flex"
          >
            <SelectLocation changeLocation={this.changeLocation} />
            <SelectDistance changeDistance={this.changeDistance} />
            <SelectBortle selectBortle={this.selectBortle} />
            <SearchButton handleSubmit={this.handleSubmit} />
          </form>

          {/* Open map component. */}
          <MapButton />
        </div>

        {/* TODO: include Feeds after it is implemented, i.e., after
         * obtaining shapefiles for world locations.
         */}
        {/* <Feeds /> */}
      </div>
    );
  }
}

export default Index;
