import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const { favoriteSongs, track: { trackId } } = this.props;
    favoriteSongs
      .forEach((song) => (song.trackId === trackId && this
        .setState({ isFavorite: true })));
  };

  handleChange = async ({ target }) => {
    const { track, fetchFavoriteSongs } = this.props;
    this.setState({
      isFavorite: target.type === 'checkbox' ? target.checked : target.value,
    }, await fetchFavoriteSongs(track, target));
  };

  render() {
    const {
      track,
      albumImge,
    } = this.props;

    const { isFavorite } = this.state;

    return (
      <div className="music-card">

        <div className="card-music-box-image">
          <img src={ albumImge } alt="art work" />
        </div>

        <div className="track-namebox">
          <p>{ track.trackName }</p>
        </div>

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
              onChange={ this.handleChange }
              name={ track.trackId }
              checked={ isFavorite }
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
  albumImge: PropTypes.string.isRequired,
};

export default MusicCard;
