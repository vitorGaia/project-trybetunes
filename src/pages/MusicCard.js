import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      fetchFavoriteSongs,
      favoriteSongs,
      track,
    } = this.props;
    return (
      <div className="album-card">
        <p>{ track.trackName }</p>
        <audio
          data-testid="audio-component"
          src={ track.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
        </audio>
        <label>
          Favorita
          <input
            data-testid={ `checkbox-music-${track.trackId}` }
            type="checkbox"
            onChange={ async (event) => fetchFavoriteSongs(track, event) }
            checked={ favoriteSongs
              .some((song) => song.trackId === track.trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  fetchFavoriteSongs: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default MusicCard;
