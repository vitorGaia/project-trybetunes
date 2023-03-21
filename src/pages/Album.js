/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
/* import Loading from './Loading'; */
import '../styles/Album.css';

class Album extends React.Component {
  state = {
    tracks: [],
    artist: '',
    album: '',
    loading: false,
    favoriteSongs: [],
    albumImge: '',
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
      albumImge: albumInfos.artworkUrl100,
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
      albumImge,
    } = this.state;
    return (
      <div
        data-testid="page-album"
        className="page-album"
      >
        <Header />
        <div className="main-album-container">
          <div className="infos-container">
            <div>
              <img src={ albumImge } alt="album artwork" />
            </div>
            <div className="infos-album">
              <div>
                <p
                  data-testid="artist-name"
                >
                  {`Artist - ${artist}`}
                </p>
              </div>
              <div>
                <p
                  data-testid="album-name"
                >
                  {`Álbum - ${album}`}
                </p>
              </div>
            </div>
          </div>
          <div className="show-album-container">
            {
              tracks.map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  fetchFavoriteSongs={ this.fetchFavoriteSongs }
                  favoriteSongs={ favoriteSongs }
                  loading={ loading }
                />
              ))
            }
          </div>
        </div>
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
