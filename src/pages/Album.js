import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
/* import Loading from './Loading'; */

class Album extends React.Component {
  state = {
    tracks: [],
    artist: '',
    album: '',
    /* loading: false, */
  };

  async componentDidMount() {
    /* this.setState({ loading: true }); */
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    /* console.log(data); */
    this.setState({
      tracks: data,
      artist: data[0].artistName,
      album: data[0].collectionName,
      /* loading: false, */
    });
  }

  render() {
    const {
      tracks,
      artist,
      album,
      /* loading, */
    } = this.state;
    console.log(artist);
    /* if (loading) {
      return (
        <Loading />
      );
    } */
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
