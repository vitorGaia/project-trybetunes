import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../images/logo.svg';
/* import searchIcon from '../images/Vector.svg';
import favoritesIcon from '../images/🦆 icon _star empty_.svg';
import profileIcon from '../images/🦆 icon _profile_.png';
 */
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
          <Link
            to="/search"
          >
            <img src={ logo } alt="logo trybe tunes" />
          </Link>
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
