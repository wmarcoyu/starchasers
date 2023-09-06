import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class MapButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.mapRef = React.createRef();

    this.openMap = this.openMap.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleCloseMap = this.handleCloseMap.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleMapClick(e) {
    const { lat, lng } = e.latlng;
    console.log(`lat: ${lat.toFixed(2)} lng: ${lng.toFixed(2)}`);

    const mapInstance = this.mapRef.current;
    const destUrl = `/details/?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}`;
    if (mapInstance) {
      L.popup()
        .setLatLng([lat, lng])
        .setContent(
          `
<a href=${destUrl}>
<button>
Get Details
</button>
</a>
	`
        )
        .openOn(mapInstance);
    }
  }

  handleCloseMap() {
    this.setState({
      showModal: false,
    });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.handleCloseMap();
    }
  }

  openMap() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    const { showModal } = this.state;

    return (
      <>
        <div className="col map-button-wrapper p-0">
          <button
            type="button"
            onClick={this.openMap}
            className="col-12 open-map"
          >
            {/* Book icon. */}
            Open Map {"\u{1F4D6}"}
          </button>
        </div>

        {showModal && (
          <div className="map-wrapper">
            <div className="map-content">
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={this.handleCloseMap}
                onKeyDown={this.handleKeyDown}
              >
                &times;
              </span>

              <MapContainer
                center={[51.505, -0.09]}
                zoom={5}
                maxZoom={12}
                className="map-container"
                whenReady={(mapInstance) => {
                  const { target } = mapInstance;
                  target.on("click", this.handleMapClick);
                }}
                ref={this.mapRef}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </MapContainer>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MapButton;
