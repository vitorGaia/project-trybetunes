import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/* import '../styles/CardAlbum.css'; */

class CardAlbum extends React.Component {
  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId,
    } = this.props;
    return (
      <div className=" w-52 bg-slate-500">
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img
            alt=""
            src={ artworkUrl100 }
            className=""
          />
        </Link>
        <div className="texts-container">
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </div>
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
