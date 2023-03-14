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

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const [albumInfos, ...tracks] = data;
    this.setState({
      tracks,
      artist: albumInfos.artistName,
      album: albumInfos.collectionName,
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
            {artist || 'Artist Name'}
          </p>
        </div>
        <div>
          <p
            data-testid="album-name"
          >
            {album || 'Collection Name'}
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
