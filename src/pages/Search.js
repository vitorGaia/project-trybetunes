import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';
import CardAlbum from './CardAlbum';
import '../styles/Search.css';

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
      <div data-testid="page-search" className="page-search">
        <Header />
        { loading === true ? <Loading />
          : (
            <div className="search-container">
              <div className="inputs-container">
                <form>
                  <div>
                    <input
                      data-testid="search-artist-input"
                      type="text"
                      placeholder="Pesquisar"
                      name="searchArtistInput"
                      onChange={ this.handleChange }
                    />
                  </div>
                  <div>
                    <button
                      data-testid="search-artist-button"
                      disabled={ searchArtistButton }
                      onClick={ this.fetchAPI }
                    >
                      Pesquisar
                    </button>
                  </div>
                </form>
              </div>
              <div className="show-search">
                {
                  fetchAlbunsIsOk === false
                  && <p>Nenhum álbum foi encontrado</p>
                }
                {
                  albuns.length !== 0
                  && (
                    <div className="albuns-result">
                      <p>
                        { `Resultado de álbuns de: ${searchArtistInput}` }
                      </p>
                    </div>
                  )
                }
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
          ) }
      </div>
    );
  }
}

export default Search;
