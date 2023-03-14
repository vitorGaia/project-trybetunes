import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { tracks } = this.props;
    tracks.shift();
    /* console.log(tracks); */

    return (
      <div>
        {tracks.map((track) => (
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
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default MusicCard;
