import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    tracks: [],
    artist: '',
    album: '',
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const [albumInfos, ...tracks] = data;
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      tracks,
      artist: albumInfos.artistName,
      album: albumInfos.collectionName,
      favoriteSongs,
    });
  }

  fetchFavoriteSongs = async (track, { target }) => {
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(track);
      this.setState((prevState) => ({
        favoriteSongs: [track, ...prevState.favoriteSongs],
        loading: false,
      }));
    }
    if (!target.checked) {
      this.setState({ loading: true });
      await removeSong(track);
      this.setState(({
        favoriteSongs: JSON.parse(localStorage.getItem('favorite_songs')),
        loading: false,
      }));
    }
  };

  render() {
    const {
      tracks,
      artist,
      album,
      loading,
      favoriteSongs,
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
        {
          loading === true ? <Loading />
            : (
              tracks.map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  fetchFavoriteSongs={ this.fetchFavoriteSongs }
                  favoriteSongs={ favoriteSongs }
                />
              ))
            )
        }
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
