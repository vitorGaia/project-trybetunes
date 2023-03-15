import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  render() {
    const {
      tracks,
      fetchFavoriteSongs,
      loading,
      favoriteSongs,
    } = this.props;
    return (
      <div>
        {
          loading === true ? <Loading />
            : (
              tracks.map((track, index) => (
                <div key={ track.trackId }>
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
                      name={ `ckeckbox ${index}` }
                      onChange={ async (event) => fetchFavoriteSongs(track, event) }
                      checked={ favoriteSongs
                        .some((song) => song.trackId === track.trackId) }
                    />
                  </label>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchFavoriteSongs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default MusicCard;
