import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    searchArtistInput: '',
    searchArtistButton: true,
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

  render() {
    const { searchArtistButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
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
              >
                Pesquisar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
