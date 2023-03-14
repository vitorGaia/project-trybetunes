import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId,
    } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img alt="" src={ artworkUrl100 } />
        </Link>
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
  collectionId: PropTypes.number.isRequired,
};

export default CardAlbum;
