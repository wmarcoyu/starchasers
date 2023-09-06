import React from "react";

class Feeds extends React.Component {
  render() {
    return (
      <div className="row row-cols-4 recommendations">
        {[...Array(64)].map((_, i) => (
          <div className="col mb-5" key={`item${i + 1}`}>
            <div className="card w-100 mr-3">
              <div className="image-container">
                <img
                  src="static/images/yellowstone.jpg"
                  className="card-img-top square-image"
                  alt="Recommendation 1"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Yellowstone National Park</h5>
                <p className="card-text">Bortle class: 1</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Feeds;
