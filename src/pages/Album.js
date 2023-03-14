import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    tracks: [],
    artist: '',
    album: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((r) => {
      this.setState({
        tracks: r,
        artist: r[0].artistName,
        album: r[0].collectionName,
      });
    });
  }

  render() {
    const {
      tracks,
      artist,
      album,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p
            data-testid="artist-name"
          >
            {artist}
          </p>
        </div>
        <div>
          <p
            data-testid="album-name"
          >
            {album}
          </p>
        </div>
        <MusicCard
          tracks={ tracks }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
