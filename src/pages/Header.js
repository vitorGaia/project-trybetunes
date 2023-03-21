import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../images/logo.png';
/* import searchIcon from '../images/searchIcon.png';
import favoritesIcon from '../images/favoritesIcon.png';
import profileIcon from '../images/profileIcon.png'; */

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
      <header className="header-container" data-testid="header-component">

        <div className="logo-container">
          <img src={ logo } alt="logo trybe tunes" />
        </div>

        <div className="links-container">

          <div className="nav-links-container">
            {/* <img alt="icone de busca" src={ searchIcon } /> */}
            <Link
              className="nav-links"
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisar
            </Link>
          </div>

          <div className="nav-links-container">
            {/* <img alt="icone de favoritos" src={ favoritesIcon } /> */}
            <Link
              className="nav-links"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritas
            </Link>
          </div>

          <div className="nav-links-container">
            {/* <img alt="icone de perfil" src={ profileIcon } /> */}
            <Link
              className="nav-links"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>

        </div>

        <div className="user-name-container">
          <p data-testid="header-user-name">
            { name }
          </p>
        </div>

      </header>
    );
  }
}

export default Header;
