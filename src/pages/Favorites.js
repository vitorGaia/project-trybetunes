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
        <div>
          { loading === true && <Loading /> }
        </div>
        <div className="show-favorites">
          {
            favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                favoriteSongs={ favoriteSongs }
                track={ song }
                fetchFavoriteSongs={ () => this.removeFavorites(song) }
                albumImge="https://scontent.fbel5-1.fna.fbcdn.net/v/t39.30808-6/271530178_581156813234795_944851720090249034_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mAeWh8L7wawAX9buHXT&_nc_ht=scontent.fbel5-1.fna&oh=00_AfDf2Ct6lUMsCcnv32XB_9acwJg8DvnASiypdXlDo0g3Pw&oe=641E1F80"
              />))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
