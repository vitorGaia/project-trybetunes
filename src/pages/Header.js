import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsSearch,
  BsStar,
  BsPersonCircle,
} from 'react-icons/bs';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../images/logo.svg';

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
            <Link
              className="nav-links"
              data-testid="link-to-search"
              to="/search"
            >
              <BsSearch className="header-icons" />
              <span className="header-link-span">Pesquisar</span>
            </Link>
          </div>

          <div className="nav-links-container">
            <Link
              className="nav-links"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              <BsStar className="header-icons" />
              <span className="header-link-span">Favoritas</span>
            </Link>
          </div>

          <div className="nav-links-container">
            <Link
              className="nav-links"
              data-testid="link-to-profile"
              to="/profile"
            >
              <BsPersonCircle className="header-icons" />
              <span className="header-link-span">Perfil</span>
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
