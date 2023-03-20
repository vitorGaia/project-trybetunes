import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const {
      fetchFavoriteSongs,
      favoriteSongs,
      track,
    } = this.props;
    return (
      <div className="music-card">
        <p>{ track.trackName }</p>
        <div className="player-container">
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
          <label className="switch">
            <input
              data-testid={ `checkbox-music-${track.trackId}` }
              type="checkbox"
              onChange={ async (event) => fetchFavoriteSongs(track, event) }
              checked={ favoriteSongs
                .some((song) => song.trackId === track.trackId) }
            />
            <span className="slider" />
          </label>
        </div>
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
