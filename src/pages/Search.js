/* eslint-disable max-len */
import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';
import CardAlbum from './CardAlbum';
/* import '../styles/Search.css'; */

class Search extends React.Component {
  state = {
    searchArtistInput: '',
    searchArtistButton: true,
    loading: undefined,
    albuns: [],
    fetchAlbunsIsOk: undefined,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.ableBtn);
  };

  ableBtn = () => {
    const { searchArtistInput } = this.state;
    const minLength = 2;
    if (searchArtistInput.length >= minLength) {
      this.setState({ searchArtistButton: false });
    } else {
      this.setState({ searchArtistButton: true });
    }
  };

  fetchAPI = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const { searchArtistInput } = this.state;
    const data = await searchAlbumsAPI(searchArtistInput);
    if (data.length !== 0) {
      this.setState({
        loading: false,
        albuns: data,
        fetchAlbunsIsOk: true,
      });
    } else {
      this.setState({ fetchAlbunsIsOk: false, loading: false });
    }
  };

  render() {
    const {
      searchArtistInput,
      searchArtistButton,
      loading,
      albuns,
      fetchAlbunsIsOk,
    } = this.state;
    return (
      <div
        data-testid="page-search"
        className="bg-red-400 h-screen w-full"
      >
        <Header />

        { loading === true ? <Loading />
          : (
            <div className="h-full bg-stone-300 flex-col w-5/6 ml-auto">

              <div className="fixed bg-stone-300 flex h-12 w-full space-x-5 items-center pl-80">

                <div>
                  <input
                    className="bg-black rounded-lg text-white placeholder-center h-8 shadow-lg p-2"
                    data-testid="search-artist-input"
                    type="text"
                    placeholder="Search"
                    name="searchArtistInput"
                    onChange={ this.handleChange }
                  />
                </div>

                <div>
                  <button
                    className="bg-green-400 hover:bg-green-600 rounded-lg shadow-lg h-8 p-2 flex justify-center items-center"
                    data-testid="search-artist-button"
                    disabled={ searchArtistButton }
                    onClick={ this.fetchAPI }
                  >
                    <p>Search</p>
                  </button>
                </div>

              </div>

              <div className="bg-blue-300 w-full flex-col h-full">
                {
                  albuns.length !== 0
                  && (
                    <div className="w-full h-11">
                      <p>
                        { `Resultado de álbuns de: ${searchArtistInput}` }
                      </p>
                    </div>
                  )
                }
                {
                  fetchAlbunsIsOk === false
                  && <p>Nenhum álbum foi encontrado</p>
                }
                <div className="w-full h-full">
                  {
                    albuns.map((album) => (
                      <CardAlbum
                        key={ album.collectionId }
                        artworkUrl100={ album.artworkUrl100 }
                        collectionName={ album.collectionName }
                        artistName={ album.artistName }
                        collectionId={ album.collectionId }
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          ) }
      </div>
    );
  }
}

export default Search;
