import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <div>
          <p data-testid="header-user-name">
            { name }
          </p>
        </div>
        <div>
          <Link
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </Link>
        </div>
        <div>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
        </div>
        <div>
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
