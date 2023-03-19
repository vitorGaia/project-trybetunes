/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';
import searchIcon from '../images/searchIcon.png';
import favoritesIcon from '../images/favoritesIcon.png';
import profileIcon from '../images/profileIcon.png';

class Header extends React.Component {
  state = {
    name: 'Carregando...',
  };

  componentDidMount() {
    this.getUserInformations();
  }

  getUserInformations = async () => {
    const { name } = await getUser();
    this.setState({ name });
  };

  render() {
    const {
      name,
    } = this.state;
    return (
      <header
        className="bg-black h-screen w-1/6 fixed top-0 left-0 overflow-y-auto flex-col justify-center items-center space-y-20 shadow-lg text-stone-50"
        data-testid="header-component"
      >

        <div className="p-5">
          <img
            src={ logo }
            alt="logo trybe tunes"
            className="w-full"
          />
        </div>

        <nav>

          <div
            className="flex justify-center p-5 space-x-3"
          >
            <img alt="icone de busca" src={ searchIcon } />
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
          </div>

          <div
            className="flex justify-center p-5 space-x-3"
          >
            <img alt="icone de favoritos" src={ favoritesIcon } />
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
          </div>

          <div
            className="flex justify-center p-5 w-full space-x-4"
          >
            <img alt="icone de perfil" src={ profileIcon } />
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
          </div>

        </nav>

        <div className="h-10 flex justify-center items-center">
          <p data-testid="header-user-name">
            { name }
          </p>
        </div>

      </header>
    );
  }
}

export default Header;
