import React from 'react';
import PropTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
    } = this.props;
    return (
      <div>
        <img alt="" src={ artworkUrl100 } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default CardAlbum;
