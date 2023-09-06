import React from "react";
import PropTypes from "prop-types";

class SearchButton extends React.Component {
  /* props: function handleSubmit. */
  render() {
    const { handleSubmit } = this.props;

    /* One single col that contains two sub-cols. */
    return (
      <div className="col search-button-wrapper m-0">
        <button
          type="button"
          onClick={handleSubmit}
          className="col-12 idx-submit"
        >
          {/* Magnifying glass icon. */}
          {"\u{1F50D}"}
        </button>
      </div>
    );
  }
}

SearchButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchButton;
