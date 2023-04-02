import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.fetchFavorites();
  }

  fetchFavorites = async () => {
    this.setState({ loading: true });
    const data = await getFavoriteSongs();
    if (data) this.setState({ loading: false, favoriteSongs: data });
  };

  removeFavorites = async (track) => {
    this.setState({ loading: true });
    await removeSong(track);
    this.setState(({
      favoriteSongs: JSON.parse(localStorage.getItem('favorite_songs')),
      loading: false,
    }));
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />

        <div className="show-favorites">
          {
            favoriteSongs.length === 0 && <h3>Sem músicas favoritadas</h3>
          }
          {
            favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                favoriteSongs={ favoriteSongs }
                track={ song }
                fetchFavoriteSongs={ () => this.removeFavorites(song) }
                albumImge="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMqzAiSPX76b04lnt0ziecKRHnFJokxZvhzHofyIcgK5kGCqJv2oso1Alm5tejbQEsmY&usqp=CAU"
              />))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
